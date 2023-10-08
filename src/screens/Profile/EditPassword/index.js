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
  Form,
} from "./styles";
import { Dimensions, TouchableOpacity } from "react-native";

import { AntDesign } from "@expo/vector-icons";

import BgSvg from "../../../imgs/Areas/backArea-g9.svg";
import { useApp, useUser } from "@realm/react";

//Tamanho da tela
const { width, height } = Dimensions.get("screen");

export function EditPassword({ navigation }) {
  const app = useApp();
  const user = useUser();

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

  // async function ResetPassword(email) {
  //   try {
  //     await app.emailPasswordAuth.sendResetPasswordEmail({ email });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

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
          <Title>Alterar senha</Title>
        </Header>
        <Form>
          <Input
            placeholder="Sua senha atual"
            placeholderTextColor={"#d9d9d9"}
            cursorColor={"#ff7f00"}
          />
          <Input
            placeholder="Nova senha"
            placeholderTextColor={"#d9d9d9"}
            cursorColor={"#ff7f00"}
          />
          <Input
            placeholder="Repita a nova senha"
            placeholderTextColor={"#d9d9d9"}
            cursorColor={"#ff7f00"}
          />
        </Form>
      </Main>
      <Bottom>
        <Confirm>
          <ConfirmText>Confirmar Alterações</ConfirmText>
        </Confirm>
      </Bottom>
    </Container>
  );
}
