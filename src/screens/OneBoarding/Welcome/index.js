import React, { useEffect } from "react";
import { Bottom, Container, Content, Main, NextText, Title } from "./styles";
import { Dimensions, TouchableOpacity } from "react-native";

//Fundo
import BgSvg from "../../../imgs/Initial/backWelcome-g9.svg";
import ArrowRight from "../../../imgs/components/arrow-right.svg";

import Toast from "react-native-toast-message";

//Tamanho da tela
const { width, height } = Dimensions.get("screen");

export function Welcome({ navigation }) {
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

  function HandleOpen() {
    navigation.navigate("informingBoard");
  }
  return (
    <Container>
      <BgSvg
        width={width}
        height={height}
        style={{ position: "absolute", top: 0, left: 0, zIndex: -1 }}
      />
      <Main>
        <Title>Bem-vindo</Title>
        <Content>
          Olá! Boas vindas ao TellMe! Aplicativo para auxíliar pessoas com
          problema de fala e audição a se comunicarem.
        </Content>
      </Main>
      <Bottom>
        <TouchableOpacity onPress={HandleOpen}>
          <NextText>Continuar</NextText>
        </TouchableOpacity>
        <TouchableOpacity onPress={HandleOpen}>
          <ArrowRight color={"#fff"} width={40} height={35} />
        </TouchableOpacity>
      </Bottom>
    </Container>
  );
}
