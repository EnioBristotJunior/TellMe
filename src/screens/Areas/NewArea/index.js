//React
import React, { useEffect } from "react";

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

import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

//Dimensão da tela
const { width, height } = Dimensions.get("screen");

export function NewArea({ navigation }) {
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
            />
            <AlertView>
              <Ionicons name="alert-circle-outline" size={24} color="#FF7F00" />
              <TextAlert>Máximo de 14 caracteres</TextAlert>
            </AlertView>
          </View>
        </Form>
      </Main>
      <Bottom>
        <Confirm>
          <TextButton>Criar Área</TextButton>
        </Confirm>
      </Bottom>
    </Container>
  );
}
