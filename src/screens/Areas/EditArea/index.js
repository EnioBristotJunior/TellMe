//React
import React, { useEffect, useState } from "react";

//Realm
import { useRealm, useObject, useQuery } from "../../../databases";
import { useUser } from "@realm/react";
import { AreaSchema } from "../../../databases/schemas/AreaSchema";
//Componentes
import { View, Dimensions, TouchableOpacity } from "react-native";

//Navegação
import { useRoute } from "@react-navigation/native";

//Estilizações
import {
  Container,
  Main,
  Header,
  Title,
  Form,
  Input,
  SelectImage,
  TextAlert,
  TextImage,
  AlertView,
  Confirm,
  TextConfirm,
  Delete,
  TextDelete,
} from "./styles";

//SVG
import BgSvg from "../../../imgs/Areas/backArea-g9.svg";

//Icons
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

//Mensagem Toast
import Toast from "react-native-toast-message";

import NetInfo from "@react-native-community/netinfo";

//Dimensão da tela
const { width, height } = Dimensions.get("screen");

//Image Picker
import * as ImagePicker from "expo-image-picker";
import { Image } from "react-native";
import { ConfirmModal } from "../../../components/ConfirmModal";
import { storage } from "../../../firebase/config";
import {
  ref,
  uploadBytes,
  deleteObject,
  getDownloadURL,
} from "firebase/storage";

export function EditArea({ navigation }) {
  const [visible, setVisible] = useState(false);

  //Realm
  const user = useUser();
  const realm = useRealm();
  const route = useRoute();
  const { id } = route.params;
  const area = id ? useObject(AreaSchema, id) : undefined;
  const firstTitle = area?.title;
  const firstImage = area?.imageURl;
  //Estados
  const [areaTitle, setAreaTitle] = useState(area?.title);
  const [image, setImage] = useState(area?.imageURl);
  console.log("imagem : " + image);

  let isConnected;

  const unsubscribe = NetInfo.addEventListener((state) => {
    // console.log("Connection type", state.type);
    // console.log("Is connected?", state.isConnected);
    isConnected = state.isConnected;
    // console.log(isConnected);
  });

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
          borderRadius: 25,
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

    if (result.assets) {
      setImage(result.assets[0].uri);
    } else {
      Toast.show({
        type: "authError",
        text1: "Upload de imagem cancelado.",
      });
    }
  };

  //Mensagens Toast
  const NeedCamps = () => {
    Toast.show({
      type: "appError",
      text1: "Campo vazio ou incorreto!",
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

  //Tranformar uri em blob
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

  //Pegar a extensão da imagem
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

  //Salvar alterações da área
  async function HandleSave(title, image) {
    try {
      if (image != "" && image != null && firstImage != image) {
        const extension = getURIExtension(image);
        console.log("extensão:" + extension);
        if (extension != "Extensão desconhecida") {
          //Conversão do arquivo para blob
          const blob = await uriToBlob(image);
          //Configuração das referencias (local e nome do arquivo)
          const storageRef = ref(storage, area._id + "." + extension);
          unsubscribe();
          let urlImage = "";
          if (isConnected == true) {
            const desertRef = ref(storage, firstImage);
            // Delete the file
            deleteObject(desertRef)
              .then(() => {
                console.log("foi bebe");
              })
              .catch((error) => {
                console.log("deu pau: " + error);
              });

            // 'file' comes from the Blob or File API

            await uploadBytes(storageRef, blob);
            console.log("chegou aqui");
            urlImage = await getDownloadURL(storageRef);
          }

          realm.write(() => {
            area.title = title;
            area.imageURl = urlImage;
            area.updated_at = new Date();
          });
          Toast.show({
            type: "appChecked",
            text1: "Área modificada com sucesso",
          });
          setTimeout(() => navigation.navigate("home"), 1500);
        } else {
          UnknownExtension();
        }
      } else {
        realm.write(() => {
          area.title = title;
          area.imageURl = image;
          area.updated_at = new Date();
        });
        Toast.show({
          type: "appChecked",
          text1: "Área modificada com sucesso",
        });
        setTimeout(() => navigation.navigate("home"), 1500);
      }
    } catch (error) {
      console.log(error);
    }
  }

  //Verificação se os campos estão com irregularidades
  function verification() {
    if (areaTitle != "" && areaTitle != null) {
      if (areaTitle.length <= 25) {
        HandleSave(areaTitle.trim(), image);
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
                  borderRadius: 20,
                  left: 40,
                  borderTopWidth: 0,
                },
              });
              navigation.goBack();
            }}
          >
            <AntDesign name="arrowleft" size={35} color={"#FF7F00"} />
          </TouchableOpacity>

          <Title>Editar Área</Title>
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
        <Delete onPress={() => setVisible(true)}>
          <FontAwesome5 name="trash-alt" color={"#fff"} size={24} />
          <TextDelete>Excluir Área</TextDelete>
        </Delete>
      </Main>
      <View>
        {firstTitle != areaTitle || firstImage != image ? (
          <Confirm onPress={verification}>
            <TextConfirm>Confirmar alterações</TextConfirm>
          </Confirm>
        ) : (
          <Confirm onPress={() => navigation.navigate("home")}>
            <TextConfirm>Voltar</TextConfirm>
          </Confirm>
        )}
      </View>
      <ConfirmModal
        visible={visible}
        setVisible={setVisible}
        area={area}
        navigation={navigation}
        areaImage={image}
      />
    </Container>
  );
}
