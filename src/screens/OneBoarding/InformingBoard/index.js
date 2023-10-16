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

//Icons
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

//Contexto
import { OneBoardingContext } from "../../../context/oneboardingContext";

//Image Picker
import * as ImagePicker from "expo-image-picker";
import { Image } from "react-native";

//Tamanho da tela
const { width, height } = Dimensions.get("screen");

export function InformingBoard({ navigation }) {
  const { setOneboardingVisible } = useContext(OneBoardingContext);
  //Estados
  const [username, setUsername] = useState("");
  const [image, setImage] = useState("");
  const user = useUser();

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

  //Veficar se o campo está vazio
  async function Verification(UserName) {
    if (username != "" && username != null) {
      await writeCustomUserData({ UserName });
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
    setOneboarding({ userId: user.id, nome: username });
    Checked();
    setOneboardingVisible(false);
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
