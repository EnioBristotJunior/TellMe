import React, { useContext, useEffect, useState } from "react";
import { useApp, useUser } from "@realm/react";
import { getOneboarding, setOneboarding } from "../../../storage";
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
import { OneBoardingContext } from "../../../context/oneboardingContext";

//Tamanho da tela
const { width, height } = Dimensions.get("screen");

export function InformingBoard({ navigation }) {
  const { setOneboardingVisible } = useContext(OneBoardingContext);
  //Estados
  const [username, setUsername] = useState("");
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
      text1: "Informações armazenadas com sucesso!",
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
    setOneboarding({ userId: user.id, nome: username });
    Checked();
    setOneboardingVisible(false);
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
              value={username}
              onChangeText={setUsername}
            />
            <RequiredAlert>(obrigatório)</RequiredAlert>
          </UsernameContainer>
        </InformSection>
        <Bottom>
          <Confirm onPress={() => Verification(username.trim())}>
            <ConfirmText>Continuar</ConfirmText>
          </Confirm>
        </Bottom>
      </Main>
    </Container>
  );
}
