import React, { useEffect } from "react";
import {
  Container,
  Main,
  Header,
  Title,
  Bottom,
  Confirm,
  ConfirmText,
  UserImage,
  ChangePicture,
  DeletePicture,
  ChangePictureText,
} from "./styles";
import { Dimensions, TouchableOpacity } from "react-native";

//icons
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

import BgSvg from "../../../imgs/Profile/backPicture-g9.svg";

//Tamanho da tela
const { width, height } = Dimensions.get("screen");

export function EditPitcure({ navigation }) {
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
      <Header>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={35} color={"#FF7F00"} />
        </TouchableOpacity>
        <Title>Alterar Foto</Title>
      </Header>
      <Main>
        <UserImage>
          <FontAwesome5 name="user" color={"#fff"} size={80} />
        </UserImage>
        <ChangePicture>
          <ChangePictureText>Alterar</ChangePictureText>
        </ChangePicture>
        <DeletePicture>
          <ChangePictureText>Excluir</ChangePictureText>
        </DeletePicture>
      </Main>

      <Bottom>
        <Confirm>
          <ConfirmText>Confirmar Alterações</ConfirmText>
        </Confirm>
      </Bottom>
    </Container>
  );
}
