import React, { useContext, useEffect, useState } from "react";
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
import { useApp, useUser } from "@realm/react";

//icons
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
//Fundo
import BgSvg from "../../imgs/Profile/backProfile-g9.svg";

import Toast from "react-native-toast-message";
import { OneBoardingContext } from "../../context/oneboardingContext";
import { Image } from "expo-image";

//Tamanho da tela
const { width, height } = Dimensions.get("screen");

export function Profile({ navigation }) {
  const { userCustomData, setUserCustomData } = useContext(OneBoardingContext);

  const user = useUser();
  const app = useApp();

  useEffect(() => {
    // Access current custom user data with `user.customData`
    // const customUserData = user.refreshCustomData();
    setUserCustomData(user.customData);
    console.log(user.customData);
  }, []);

  //Areas e frases
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

  function handleOpen(screen, props) {
    navigation.navigate(screen, { props });
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
            {userCustomData?.UserImage ? (
              <Image
                source={{ uri: userCustomData?.UserImage }}
                style={{ width: "100%", height: "100%", borderRadius: 12 }}
              ></Image>
            ) : (
              <FontAwesome5 name="user" color={"#fff"} size={80} />
            )}
          </UserImage>
          <UserName>{userCustomData?.UserName}</UserName>
          <UserEmail>{user.profile.email}</UserEmail>
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
          <Option
            onPress={() => handleOpen("editName", userCustomData?.UserName)}
          >
            <OptionText>Nome</OptionText>
            <OptionIcon>
              <AntDesign name="arrowright" size={20} color={"#fff"} />
            </OptionIcon>
          </Option>
          <Option onPress={() => navigation.navigate("editPicture")}>
            <OptionText>Foto</OptionText>
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
