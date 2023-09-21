//React
import React, { useEffect, useState } from "react";

//Realm
import { useRealm, useObject } from "../../../databases";
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

//Dimensão da tela
const { width, height } = Dimensions.get("screen");

//Image Picker
import * as ImagePicker from "expo-image-picker";
import { Image } from "react-native";
import { ConfirmModal } from "../../../components/ConfirmModal";

export function EditArea({ navigation }) {
  const [visible, setVisible] = useState(false);

  //Realm
  const realm = useRealm();
  const route = useRoute();
  const { id } = route.params;
  const area = id ? useObject(AreaSchema, id) : undefined;
  const firstTitle = area?.title;
  const firstImage = area?.imageURl;
  //Estados
  const [areaTitle, setAreaTitle] = useState(area?.title);
  const [image, setImage] = useState(area?.imageURl);

  // const firstTitle = area?.title;

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

    console.log(result);

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
  //Salvar alterações da área
  function HandleSave(title, image) {
    try {
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
      />
    </Container>
  );
}
