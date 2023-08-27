import React from "react";
import { View, Dimensions } from "react-native";
import { Container, FastTalk, Header, TextFastTalk, Title } from "./styles";

import BgSvg from "../../imgs/Home/backHome-g9.svg";

import { FontAwesome } from "@expo/vector-icons";
import { useUser } from "@realm/react";

const { width, height } = Dimensions.get("screen");

export function Home() {
  const user  = useUser()
  function logout(){
    
    user.logOut()
  }

  return (
    <Container>
      <BgSvg
        width={width}
        height={height}
        style={{ position: "absolute", top: 0, left: 0, zIndex: -1 }}
      />
      <Header>
        <Title>Áreas</Title>
      </Header>

      <FastTalk onPress={() => logout()}>
        <FontAwesome name="microphone" size={24} color="#fff" />
        <TextFastTalk>Conversar</TextFastTalk>
      </FastTalk>
    </Container>
  );
}
