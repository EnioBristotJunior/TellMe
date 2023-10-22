import React, { useEffect, useState, useContext } from "react";
import {
  Container,
  Main,
  Header,
  Title,
  Bottom,
  Confirm,
  ConfirmText,
  UserImage,
  ChangePicture,
  DeletePicture,
  ChangePictureText,
} from "./styles";
import { Dimensions, TouchableOpacity } from "react-native";

import { Image } from "expo-image";

//Mensagem Toast
import Toast from "react-native-toast-message";

import NetInfo from "@react-native-community/netinfo";

//icons
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

//Navegação
import { useRoute } from "@react-navigation/native";
import { useUser } from "@realm/react";

import { storage } from "../../../firebase/config";

import {
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
//Image Picker
import * as ImagePicker from "expo-image-picker";

import { OneBoardingContext } from "../../../context/oneboardingContext";

//Fundo
import BgSvg from "../../../imgs/Profile/backPicture-g9.svg";

//Tamanho da tela
const { width, height } = Dimensions.get("screen");

export function EditPitcure({ navigation }) {
  const user = useUser();
  const [image, setImage] = useState(user.customData.UserImage || "");
  const { setUserCustomData } = useContext(OneBoardingContext);
  const firstImage = user.customData.UserImage || "";
  let isConnected;

  const unsubscribe = NetInfo.addEventListener((state) => {
    // console.log("Connection type", state.type);
    // console.log("Is connected?", state.isConnected);
    isConnected = state.isConnected;
    // console.log(isConnected);
  });

  console.log("image:" + image);
  //Remoção do bottom navigator
  useEffect(() => {
    navigation.getParent().setOptions({ tabBarStyle: { display: "none" } });
    return () => {
      navigation.getParent().setOptions({
        tabBarStyle: {
          display: "flex",
          backgroundColor: "#FF7F00",
          height: 70,
          position: "absolute",
          bottom: 30,
          right: 40,
          borderRadius: 20,
          left: 40,
          borderTopWidth: 0,
        },
      });
    };
  }, []);

  //Mensagens Toast

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

  function Checked() {
    Toast.show({
      type: "appChecked",
      text1: "Foto alterado com sucesso!",
    });
  }

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

  async function writeCustomUserData(newCustomData) {
    try {
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
      console.log(customUserData);
      setUserCustomData(customUserData);
      setTimeout(() => navigation.navigate("profile"), 1500);
      Checked();
    } catch (error) {
      console.log(error);
    }
  }

  async function Verification() {
    let urlImage = "";
    if (image != "") {
      //Verificação da imagem
      const extension = getURIExtension(image);
      if (extension != "Extensão desconhecida") {
        const storageRef = ref(
          storage,
          "UserPhotos/" + user.id + "." + extension
        );
        //Conversão do arquivo para blob
        const blob = await uriToBlob(image);
        //Configuração das referencias (local e nome do arquivo)
        // 'file' comes from the Blob or File API
        unsubscribe();

        if (isConnected == true) {
          if (firstImage != "") {
            const desertRef = ref(storage, firstImage);
            deleteObject(desertRef)
              .then(() => {
                console.log("foi bebe");
              })
              .catch((error) => {
                console.log("deu pau: " + error);
              });
          }

          await uploadBytes(storageRef, blob);
          urlImage = await getDownloadURL(storageRef);
        }
        writeCustomUserData({ UserImage: urlImage });
      } else {
        UnknownExtension();
      }
    } else {
      console.log("caiu aqui");

      const desertRef = ref(storage, firstImage);
      deleteObject(desertRef)
        .then(() => {
          console.log("foi bebe");
        })
        .catch((error) => {
          console.log("deu pau: " + error);
        });
      writeCustomUserData({ UserImage: urlImage });
    }
  }

  return (
    <Container>
      <BgSvg
        width={width}
        height={height}
        style={{ position: "absolute", top: 0, left: 0, zIndex: -1 }}
      />
      <Header>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={35} color={"#FF7F00"} />
        </TouchableOpacity>
        <Title>Alterar Foto</Title>
      </Header>
      <Main>
        <UserImage onPress={pickImage}>
          {image ? (
            <Image
              source={{ uri: image }}
              style={{ width: "100%", height: "100%", borderRadius: 12 }}
            />
          ) : (
            <FontAwesome5 name="user" color={"#fff"} size={120} />
          )}
        </UserImage>
        <ChangePicture onPress={pickImage}>
          <ChangePictureText>Alterar</ChangePictureText>
        </ChangePicture>
        <DeletePicture onPress={() => setImage("")}>
          <ChangePictureText>Excluir</ChangePictureText>
        </DeletePicture>
      </Main>

      <Bottom>
        {image != firstImage ? (
          <Confirm onPress={Verification}>
            <ConfirmText>Confirmar Alterações</ConfirmText>
          </Confirm>
        ) : (
          <Confirm onPress={() => navigation.goBack()}>
            <ConfirmText>Voltar</ConfirmText>
          </Confirm>
        )}
      </Bottom>
    </Container>
  );
}
