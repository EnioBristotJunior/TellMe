import React from "react";
import { View, Dimensions } from "react-native";
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
  DeleteAccount,
} from "./styles";

//Realm
import { useRealm, useQuery } from "../../databases/";
import { PhraseSchema } from "../../databases/schemas/PhraseSchema";
import { AreaSchema } from "../../databases/schemas/AreaSchema";
import { useUser } from "@realm/react";

//icons
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
//Fundo
import BgSvg from "../../imgs/Profile/backProfile-g9.svg";

import Toast from "react-native-toast-message";

//Tamanho da tela
const { width, height } = Dimensions.get("screen");

export function Profile({ navigation }) {
  const user = useUser();

  const areas = useQuery(AreaSchema)
    .filtered(`userId == '${user.id}'`)
    .toJSON();
  const phrases = useQuery(PhraseSchema)
    .filtered(`userId == '${user.id}'`)
    .toJSON();

  //Sair da conta
  function logout() {
    try {
      user.logOut();
      Toast.show({
        type: "appChecked",
        text1: "Sessão encerrada com sucesso!",
      });
    } catch (error) {
      console.error(error);
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
          <UserImage onPress={() => navigation.navigate("editPicture")}>
            <FontAwesome5 name="user" color={"#fff"} size={80} />
          </UserImage>
          <UserName>TellMe</UserName>
          <UserEmail>tme9510@gmail.com</UserEmail>
          <UserContent>
            <ContentView>
              <NumberContent>{areas.length}</NumberContent>
              <TextContent>Áreas</TextContent>
            </ContentView>
            <ContentView>
              <NumberContent>{phrases.length}</NumberContent>
              <TextContent>Frases</TextContent>
            </ContentView>
          </UserContent>
        </Header>

        <OptionsContainer>
          <OptionsTitle>Conta</OptionsTitle>
          <Option onPress={() => navigation.navigate("editName")}>
            <OptionText>Nome</OptionText>
            <OptionIcon>
              <AntDesign name="arrowright" size={20} color={"#fff"} />
            </OptionIcon>
          </Option>
          <Option onPress={() => navigation.navigate("editEmail")}>
            <OptionText>E-mail</OptionText>
            <OptionIcon>
              <AntDesign name="arrowright" size={20} color={"#fff"} />
            </OptionIcon>
          </Option>
          <Option onPress={() => navigation.navigate("editPassword")}>
            <OptionText>Senha</OptionText>
            <OptionIcon>
              <AntDesign name="arrowright" size={20} color={"#fff"} />
            </OptionIcon>
          </Option>
          <OptionsTitle>Geral</OptionsTitle>
          <Option onPress={logout}>
            <OptionText>Sair</OptionText>
            <OptionIcon>
              <Feather name="log-out" size={18} color={"#fff"} />
            </OptionIcon>
          </Option>
          <DeleteAccount onPress={() => navigation.navigate("deleteAccount")}>
            <OptionText>Excluir Conta</OptionText>
            <OptionIcon>
              <FontAwesome5 name="trash-alt" color={"#fff"} size={18} />
            </OptionIcon>
          </DeleteAccount>
        </OptionsContainer>
      </Main>
    </Container>
  );
}
