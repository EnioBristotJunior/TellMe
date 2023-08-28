import React from "react";
import { View, Dimensions } from "react-native";
import {
  Container,
  FastTalk,
  Header,
  TextFastTalk,
  Title,
  NewArea,
  AreasSection,
} from "./styles";

import BgSvg from "../../imgs/Home/backHome-g9.svg";

import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useUser } from "@realm/react";

const { width, height } = Dimensions.get("screen");

export function Home({ navigation }) {
  const user = useUser();
  function logout() {
    user.logOut();
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
      <AreasSection>
        <NewArea onPress={() => navigation.navigate("newArea")}>
          <FontAwesome5 name="plus" size={45} color={"#091837"} />
        </NewArea>
      </AreasSection>

      <FastTalk onPress={() => logout()}>
        <FontAwesome name="microphone" size={24} color="#fff" />
        <TextFastTalk>Conversar</TextFastTalk>
      </FastTalk>
    </Container>
  );
}
