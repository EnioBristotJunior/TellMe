//React
import React, { useEffect, useState } from "react";

import { useRealm } from "../../../databases";
import { useUser } from "@realm/react";

//React Native
import { View, Dimensions, TouchableOpacity } from "react-native";

//uuid

import uuid from "react-native-uuid";

//Componentes
import {
  AlertView,
  Bottom,
  Confirm,
  Container,
  Form,
  Header,
  Input,
  Main,
  SelectImage,
  TextAlert,
  TextButton,
  TextImage,
  Title,
} from "./styles";

//SVG
import BgSvg from "../../../imgs/Areas/backArea-g9.svg";

//Icons
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

//Mensagem Toast
import Toast from "react-native-toast-message";

//Dimensão da tela
const { width, height } = Dimensions.get("screen");

//Image Picker
import * as ImagePicker from "expo-image-picker";
import { Image } from "react-native";
import { storage } from "../../../firebase/config";
import { ref, uploadBytes } from "firebase/storage";

export function NewArea({ navigation }) {
  //Estados
  const [areaTitle, setAreaTitle] = useState("");
  const [image, setImage] = useState("");
  //Realm
  const user = useUser();
  const realm = useRealm();
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

  //Funções de mensagem Toast
  const NeedCamps = () => {
    Toast.show({
      type: "appError",
      text1: "Campo vazio ou incorreto!",
    });
  };
  const ToastNewArea = () => {
    Toast.show({
      type: "newArea",
      text1: "Área criada com sucesso",
    });
  };
  const CancelUpload = () => {
    Toast.show({
      type: "appError",
      text1: "Upload de imagem cancelado",
    });
  };
  const ExceededCharacters = () => {
    Toast.show({
      type: "appError",
      text1: "Limite de caracteres excedido!",
    });
  };
  const UnknownExtension = () => {
    Toast.show({
      type: "appError",
      text1: "Extensão de arquivo não suportada!",
    });
  };

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

  //Criar área
  async function newArea() {
    try {
      const extension = getURIExtension(image);
      if (extension != "Extensão desconhecida") {
        const areaId = uuid.v4();

        //Conversão do arquivo para blob
        const blob = await uriToBlob(image);
        //Configuração das referencias (local e nome do arquivo)
        const storageRef = ref(storage, areaId + "." + extension);

        // 'file' comes from the Blob or File API
        await uploadBytes(storageRef, blob);

        realm.write(() => {
          realm.create("Area", {
            _id: areaId,
            userId: user.id,
            title: areaTitle.trim(),
            imageURl: image,
          });
        });
        setAreaTitle("");
        ToastNewArea();
        setTimeout(() => navigation.navigate("home"), 1500);
      } else {
        UnknownExtension();
      }
    } catch (erro) {
      console.log(erro);
    }
  }

  //Verificação se os campos estão com irregularidades
  function verification() {
    if (areaTitle != "" && areaTitle != null) {
      if (areaTitle.length <= 25) {
        newArea();
      } else {
        ExceededCharacters();
      }
    } else {
      NeedCamps();
    }
  }

  return (
    <Container>
      <BgSvg
        width={width}
        height={height}
        style={{ position: "absolute", top: 0, left: 0, zIndex: -1 }}
      />
      <Main>
        <Header>
          <TouchableOpacity
            onPress={() => {
              navigation.getParent().setOptions({
                tabBarStyle: {
                  display: "flex",
                  backgroundColor: "#FF7F00",
                  height: 70,
                  position: "absolute",
                  bottom: 30,
                  right: 40,
                  borderRadius: 30,
                  left: 40,
                  borderTopWidth: 0,
                },
              });
              navigation.goBack();
            }}
          >
            <AntDesign name="arrowleft" size={35} color={"#FF7F00"} />
          </TouchableOpacity>

          <Title>Criar nova área</Title>
        </Header>
        <Form>
          <SelectImage onPress={pickImage}>
            {image ? (
              <Image
                source={{ uri: image }}
                style={{ width: "100%", height: "100%", borderRadius: 12 }}
              />
            ) : (
              <View style={{ alignItems: "center" }}>
                <FontAwesome5 name="camera" size={50} color={"#091837"} />
                <TextImage>Adicionar imagem de fundo</TextImage>
              </View>
            )}
          </SelectImage>
          <View style={{ gap: 8 }}>
            <Input
              placeholder="Título da área"
              placeholderTextColor={"#d9d9d9"}
              cursorColor={"#ff7f00"}
              onChangeText={setAreaTitle}
              value={areaTitle}
            />
            <AlertView>
              <Ionicons name="alert-circle-outline" size={24} color="#FF7F00" />
              <TextAlert>Máximo de 25 caracteres</TextAlert>
            </AlertView>
          </View>
        </Form>
      </Main>
      <Bottom>
        <Confirm onPress={verification}>
          <TextButton>Criar Área</TextButton>
        </Confirm>
      </Bottom>
    </Container>
  );
}
