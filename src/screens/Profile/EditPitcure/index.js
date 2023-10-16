import React, { useEffect, useState } from "react";
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
import { Dimensions, TouchableOpacity, Image } from "react-native";

//Mensagem Toast
import Toast from "react-native-toast-message";

//icons
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

//Image Picker
import * as ImagePicker from "expo-image-picker";

//Fundo
import BgSvg from "../../../imgs/Profile/backPicture-g9.svg";

//Tamanho da tela
const { width, height } = Dimensions.get("screen");

export function EditPitcure({ navigation }) {
  const [image, setImage] = useState("");

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
        <Confirm>
          <ConfirmText>Confirmar Alterações</ConfirmText>
        </Confirm>
      </Bottom>
    </Container>
  );
}
