import React, { useEffect, useState } from "react";
import {
  Container,
  Main,
  Header,
  Title,
  Input,
  Bottom,
  Confirm,
  ConfirmText,
} from "./styles";
import { Dimensions, TouchableOpacity } from "react-native";

//Navegação
import { useRoute } from "@react-navigation/native";
import { useUser } from "@realm/react";
import { AntDesign } from "@expo/vector-icons";

import BgSvg from "../../../imgs/Areas/backArea-g9.svg";

import Toast from "react-native-toast-message";

//Tamanho da tela
const { width, height } = Dimensions.get("screen");

export function EditName({ navigation }) {
  const route = useRoute();
  const { props } = route.params;

  const [username, setUsername] = useState(props);
  const firstUsername = props;
  console.log("inicial: " + firstUsername);
  // console.log(username);
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
      text1: "Nome alterado com sucesso!",
    });
  }

  //Veficar se o campo está vazio
  async function Verification(UserName) {
    if (username != "" && username != null) {
      await writeCustomUserData({ UserName });
      console.log("foi");
    } else {
      NeedCamps();
    }
  }

  async function writeCustomUserData(newCustomData) {
    try {
      const customUserDataCollection = user
        .mongoClient("mongodb-atlas")
        .db("custom-user-data-database")
        .collection("custom-user-data");

      const filter = {
        userId: user.id,
      };

      const updateDoc = {
        $set: {
          userId: user.id,
          ...newCustomData,
        },
      };

      const options = { upsert: true };
      await customUserDataCollection.updateOne(filter, updateDoc, options);
      const customUserData = await user.refreshCustomData();
      setTimeout(() => navigation.navigate("profile"), 1500);
      Checked();
    } catch (error) {
      console.log(error);
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
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={35} color={"#FF7F00"} />
          </TouchableOpacity>
          <Title>Alterar nome</Title>
        </Header>
        <Input
          placeholder="Seu nome"
          placeholderTextColor={"#d9d9d9"}
          cursorColor={"#ff7f00"}
          value={username}
          onChangeText={setUsername}
        />
      </Main>
      <Bottom>
        {firstUsername == username ? (
          <Confirm onPress={() => navigation.goBack()}>
            <ConfirmText>Voltar</ConfirmText>
          </Confirm>
        ) : (
          <Confirm onPress={() => Verification(username.trim())}>
            <ConfirmText>Confirmar Alterações</ConfirmText>
          </Confirm>
        )}
      </Bottom>
    </Container>
  );
}
