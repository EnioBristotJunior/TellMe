//React
import React, { useEffect, useState } from "react";

import { useRealm } from "../../../databases";
import { useUser } from "@realm/react";

//React Native
import { View, Dimensions, TouchableOpacity } from "react-native";

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

export function NewArea({ navigation }) {
  //Estados
  const [areaTitle, setAreaTitle] = useState("");

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
          borderRadius: 30,
          left: 40,
          borderTopWidth: 0,
        },
      });
    };
  }, []);

  const NeedCamps = () => {
    Toast.show({
      type: "authError",
      text1: "Campo vazio ou incorreto!",
    });
  };

  async function newArea() {
    try {
      console.log(user.id);
      console.log(areaTitle);
      realm.write(() => {
        realm.create("Area", { userId: user.id, title: areaTitle });
      });
      console.log("foi");
      setAreaTitle("");
    } catch (erro) {
      console.log(erro);
    }
  }

  function verification() {
    if (areaTitle != "" && areaTitle != null) {
      newArea();
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
          <SelectImage>
            <FontAwesome5 name="camera" size={50} color={"#091837"} />
            <TextImage>Adicionar imagem</TextImage>
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
              <TextAlert>Máximo de 14 caracteres</TextAlert>
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
