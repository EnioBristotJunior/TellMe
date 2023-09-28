import React from "react";
import { View, Dimensions, ScrollView } from "react-native";
import {
  Container,
  ContentView,
  Header,
  Main,
  NumberContent,
  OptionsContainer,
  TextContent,
  UserContent,
  UserEmail,
  UserImage,
  UserName,
  Option,
  OptionsTitle,
  OptionText,
  OptionIcon,
  OptionsScroll,
} from "./styles";

//icons
import { AntDesign } from "@expo/vector-icons";

//Fundo
import BgSvg from "../../imgs/Profile/backProfile-g9.svg";

//Tamanho da tela
const { width, height } = Dimensions.get("screen");

export function Profile() {
  return (
    <Container>
      <BgSvg
        width={width}
        height={height}
        style={{ position: "absolute", top: 0, left: 0, zIndex: -1 }}
      />
      <Main>
        <Header>
          <UserImage></UserImage>
          <UserName>Paulão da Regulagem</UserName>
          <UserEmail>paulaodaregulagem@gmail.com</UserEmail>
          <UserContent>
            <ContentView>
              <NumberContent>4</NumberContent>
              <TextContent>Áreas</TextContent>
            </ContentView>
            <ContentView>
              <NumberContent>12</NumberContent>
              <TextContent>Frases</TextContent>
            </ContentView>
          </UserContent>
        </Header>

        <OptionsContainer>
          <OptionsTitle>Conta</OptionsTitle>
          <Option>
            <OptionText>Foto</OptionText>
            <OptionIcon>
              <AntDesign name="arrowright" size={20} color={"#fff"} />
            </OptionIcon>
          </Option>
          <Option>
            <OptionText>Nome</OptionText>
            <OptionIcon>
              <AntDesign name="arrowright" size={20} color={"#fff"} />
            </OptionIcon>
          </Option>
          <Option>
            <OptionText>E-mail</OptionText>
            <OptionIcon>
              <AntDesign name="arrowright" size={20} color={"#fff"} />
            </OptionIcon>
          </Option>
        </OptionsContainer>
      </Main>
    </Container>
  );
}
