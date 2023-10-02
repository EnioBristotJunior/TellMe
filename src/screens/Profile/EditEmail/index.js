import React, { useEffect } from "react";
import {
  Container,
  Main,
  Header,
  Title,
  Input,
  Bottom,
  Confirm,
  ConfirmText,
} from "./styles";
import { Dimensions, TouchableOpacity } from "react-native";

import { AntDesign } from "@expo/vector-icons";

import BgSvg from "../../../imgs/Areas/backArea-g9.svg";

//Tamanho da tela
const { width, height } = Dimensions.get("screen");

export function EditEmail({ navigation }) {
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

  return (
    <Container>
      <BgSvg
        width={width}
        height={height}
        style={{ position: "absolute", top: 0, left: 0, zIndex: -1 }}
      />
      <Main>
        <Header>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={35} color={"#FF7F00"} />
          </TouchableOpacity>
          <Title>Alterar E-mail</Title>
        </Header>
        <Input
          placeholder="Seu e-mail"
          placeholderTextColor={"#d9d9d9"}
          cursorColor={"#ff7f00"}
        />
      </Main>
      <Bottom>
        <Confirm>
          <ConfirmText>Confirmar Alterações</ConfirmText>
        </Confirm>
      </Bottom>
    </Container>
  );
}
