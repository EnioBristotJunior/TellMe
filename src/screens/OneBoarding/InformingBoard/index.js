import React, { useContext, useEffect, useState } from "react";
//Realm
import { useApp, useUser } from "@realm/react";
//Funções de acesso ao storage
import { getOneboarding, setOneboarding } from "../../../storage";
import {
  Bottom,
  Confirm,
  ConfirmText,
  Container,
  InformSection,
  Input,
  Main,
  OptionalAlert,
  RequiredAlert,
  Title,
  UserImage,
  UserImageContainer,
  UsernameContainer,
} from "./styles";
import { Dimensions, TouchableOpacity } from "react-native";

//Fundo
import BgSvg from "../../../imgs/Initial/backInform-g9.svg";
import ArrowRight from "../../../imgs/components/arrow-right.svg";

//Mensagem Toast
import Toast from "react-native-toast-message";

import NetInfo from "@react-native-community/netinfo";

//Icons
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

//Contexto
import { OneBoardingContext } from "../../../context/oneboardingContext";

import { storage } from "../../../firebase/config";

import {
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";

//Image Picker
import * as ImagePicker from "expo-image-picker";
import { Image } from "react-native";

//Tamanho da tela
const { width, height } = Dimensions.get("screen");

export function InformingBoard({ navigation }) {
  const { setOneboardingVisible, userPasswordPreview, setUserPasswordPreview } =
    useContext(OneBoardingContext);
  //Estados
  const [username, setUsername] = useState("");
  const [image, setImage] = useState("");
  const user = useUser();

  const UserPassword = userPasswordPreview;
  console.log(UserPassword);
  let isConnected;

  const unsubscribe = NetInfo.addEventListener((state) => {
    // console.log("Connection type", state.type);
    // console.log("Is connected?", state.isConnected);
    isConnected = state.isConnected;
    // console.log(isConnected);
  });

  //Mensagens Toast
  const NeedCamps = () => {
    Toast.show({
      type: "appError",
      text1: "Preencha as informações corretamente",
    });
  };

  const Checked = () => {
    Toast.show({
      type: "appChecked",
      text1: "Informações armazenadas com sucesso!",
    });
  };

  const CancelUpload = () => {
    Toast.show({
      type: "appError",
      text1: "Upload de imagem cancelado",
    });
  };

  const UnknownExtension = () => {
    Toast.show({
      type: "appError",
      text1: "Extensão de arquivo não suportada!",
    });
  };

  //Função para pegar imagem da galeria
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (result.assets) {
      setImage(result.assets[0].uri);
      getURIExtension(result.assets[0].uri);
    } else {
      CancelUpload();
    }
  };

  //Pegar a extensão da url
  function getURIExtension(uri) {
    // Use uma expressão regular para encontrar a extensão da URL
    const regex = /\.[A-Za-z0-9]+$/;
    const extension = uri.match(regex);

    if (extension) {
      // Retorne a extensão encontrada (sem o ponto inicial)
      console.log("extensão: " + extension[0].substring(1));
      return extension[0].substring(1);
    } else {
      // Caso a URL não tenha uma extensão válida
      return "Extensão desconhecida";
    }
  }

  async function uriToBlob(uri) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      // If successful -> return with blob
      xhr.onload = function () {
        resolve(xhr.response);
      };

      // reject on error
      xhr.onerror = function () {
        reject(new Error("uriToBlob failed"));
      };

      // Set the response type to 'blob' - this means the server's response
      // will be accessed as a binary object
      xhr.responseType = "blob";

      // Initialize the request. The third argument set to 'true' denotes
      // that the request is asynchronous
      xhr.open("GET", uri, true);

      // Send the request. The 'null' argument means that no body content is given for the request
      xhr.send(null);
    });
  }

  //Veficar se o campo está vazio
  async function Verification(UserName) {
    if (username != "" && username != null) {
      if (image == "") {
        await writeCustomUserData({ UserName, UserPassword });
      } else {
        let urlImage = "";
        const extension = getURIExtension(image);
        if (extension != "Extensão desconhecida") {
          const storageRef = ref(
            storage,
            "UserPhotos/" + user.id + "." + extension
          );
          //Conversão do arquivo para blob
          const blob = await uriToBlob(image);

          unsubscribe();

          if (isConnected == true) {
            await uploadBytes(storageRef, blob);
            urlImage = await getDownloadURL(storageRef);
          }
          await writeCustomUserData({
            UserName,
            UserPassword,
            UserImage: urlImage,
          });
        } else {
          UnknownExtension();
        }
      }

      console.log("foi");
    } else {
      NeedCamps();
    }
  }

  async function writeCustomUserData(newCustomData) {
    const customUserDataCollection = user
      .mongoClient("mongodb-atlas")
      .db("custom-user-data-database")
      .collection("custom-user-data");

    const filter = {
      userId: user.id,
    };

    const updateDoc = {
      $set: {
        userId: user.id,
        ...newCustomData,
      },
    };

    const options = { upsert: true };
    await customUserDataCollection.updateOne(filter, updateDoc, options);
    const customUserData = await user.refreshCustomData();
    setOneboarding({ userId: user.id, nome: username, senha: UserPassword });
    Checked();
    setOneboardingVisible(false);
    setUserPasswordPreview(null);
  }

  return (
    <Container>
      <BgSvg
        width={width}
        height={height}
        style={{ position: "absolute", top: 0, left: 0, zIndex: -1 }}
      />
      <Main>
        <Title>Para começar, vamos precisar definir algumas coisas!</Title>
        <InformSection>
          <UserImageContainer>
            <Title>Selecionar foto de perfil</Title>
            <OptionalAlert>(Opcional)</OptionalAlert>
            <OptionalAlert>
              A foto de usuário somente será salva se houver conexão com
              internet.
            </OptionalAlert>
            <UserImage onPress={pickImage}>
              {image ? (
                <Image
                  source={{ uri: image }}
                  style={{ width: "100%", height: "100%", borderRadius: 12 }}
                />
              ) : (
                <FontAwesome5 name="camera" size={50} color={"#091837"} />
              )}
            </UserImage>
          </UserImageContainer>
          <UsernameContainer>
            <Title>Seu nome</Title>
            <Input
              placeholder="Nome completo"
              placeholderTextColor={"#d9d9d9"}
              cursorColor={"#ff7f00"}
              value={username}
              onChangeText={setUsername}
            />
            <RequiredAlert>(obrigatório)</RequiredAlert>
          </UsernameContainer>
        </InformSection>
        <Bottom>
          <Confirm onPress={() => Verification(username.trim())}>
            <ConfirmText>Continuar</ConfirmText>
          </Confirm>
        </Bottom>
      </Main>
    </Container>
  );
}
