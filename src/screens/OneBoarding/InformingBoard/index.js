import React, { useEffect, useState } from "react";
import {
  Bottom,
  Confirm,
  ConfirmText,
  Container,
  InformSection,
  Input,
  Main,
  OptionalAlert,
  RequiredAlert,
  Title,
  UserImage,
  UserImageContainer,
  UsernameContainer,
} from "./styles";
import { Dimensions, TouchableOpacity } from "react-native";

//Fundo
import BgSvg from "../../../imgs/Initial/backInform-g9.svg";
import ArrowRight from "../../../imgs/components/arrow-right.svg";

import Toast from "react-native-toast-message";

//Icons
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

//Tamanho da tela
const { width, height } = Dimensions.get("screen");

export function InformingBoard({ navigation }) {
  //Estados
  const [username, setUsername] = useState("");

  //Mensagens Toast

  function NeedCamps() {
    Toast.show({
      type: "appError",
      text1: "Preencha as informações corretamente",
    });
  }

  //Veficar se o campo está vazio
  function Verification() {
    if (username != "" && username != null) {
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
        <Title>Para começar, vamos precisar definir algumas coisas!</Title>
        <InformSection>
          <UserImageContainer>
            <Title>Selecionar foto de perfil</Title>
            <OptionalAlert>(Opcional)</OptionalAlert>
            <UserImage>
              <FontAwesome5 name="camera" size={50} color={"#091837"} />
            </UserImage>
          </UserImageContainer>
          <UsernameContainer>
            <Title>Seu nome</Title>
            <Input
              placeholder="Nome completo"
              placeholderTextColor={"#d9d9d9"}
              cursorColor={"#ff7f00"}
            />
            <RequiredAlert>(obrigatório)</RequiredAlert>
          </UsernameContainer>
        </InformSection>
        <Bottom>
          <Confirm onPress={Verification}>
            <ConfirmText>Continuar</ConfirmText>
          </Confirm>
        </Bottom>
      </Main>
    </Container>
  );
}
