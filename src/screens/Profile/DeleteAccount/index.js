import React, { useEffect, useState } from "react";

import {useApp, useUser} from '@realm/react';

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
  AlertText,
} from "./styles";
import { Dimensions, TouchableOpacity } from "react-native";

import { AntDesign } from "@expo/vector-icons";

import Toast from "react-native-toast-message";

import BgSvg from "../../../imgs/Areas/backArea-g9.svg";
import { ConfirmDeleteModal } from "../../../components/ConfirmDeleteModal";

//Tamanho da tela
const { width, height } = Dimensions.get("screen");

export function DeleteAccount({ navigation }) {

  const [inputPassword,setInputPassword] = useState('');
  const [visible, setVisible] = useState(false);

  const user = useUser();

  //Mensagens Toast

  function NeedCamps() {
    Toast.show({
      type: "appError",
      text1: "Preencha as informações corretamente",
    });
  }

  function Checked() {
    Toast.show({
      type: "appChecked",
      text1: "Conta excluída com sucesso!",
    });
  }

  function IncorrectPassword() {
    Toast.show({
      type: "appError",
      text1: "Senha incorreta!",
    });
  }
    function Verification(inseredPassword){
      if(inseredPassword != ""){
        if(inseredPassword === user.customData.UserPassword){
          setVisible(true)
        }else{
          IncorrectPassword()
        }
      }else{
        NeedCamps();
      }
    }
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
          <Title>Excluir conta</Title>
        </Header>
        <AlertText>
          A exclusão de conta é permanente, sua conta e seus dados serão
          excluidos do banco de dados do aplicativo, necessitando criar outra
          conta se quiser acessar o aplicativo novamente. Somente exclua sua
          conta se tiver total certeza disso.
        </AlertText>

        <Input
          placeholder="Sua Senha"
          placeholderTextColor={"#d9d9d9"}
          cursorColor={"#ff7f00"}
          value={inputPassword}
          onChangeText={setInputPassword}
        />
      </Main>
      <Bottom>
        <Confirm onPress={() => Verification(inputPassword)}>
          <ConfirmText>Confirmar Exclusão</ConfirmText>
        </Confirm>
      </Bottom>
      <ConfirmDeleteModal visible={visible} setVisible={setVisible}/>
    </Container>
  );
}
