//React
import React from "react";
//Componentes
import { View, Dimensions, TouchableOpacity } from "react-native";
//Styled Components
import {
  Container,
  ArrowButton,
  Main,
  NumberTitle,
  Title,
  Content,
  Bottom,
  SpeakPhrase,
  SpeakPhraseText,
  EditButton,
  DeleteButton,
} from "./styles";

//Realm
import { useObject, useQuery } from "../../../databases";
import { PhraseSchema } from "../../../databases/schemas/PhraseSchema";
//Navegação
import { useRoute } from "@react-navigation/native";
//Fundo
import BgSvg from "../../../imgs/SpeakPhrase/backSpeakPhrase-g9.svg";

//Icons
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

//Tamanho da tela
const { width, height } = Dimensions.get("screen");

export function Speak({ navigation }) {
  const route = useRoute();
  const { phraseId } = route.params;
  const phrase = phraseId ? useObject(PhraseSchema, phraseId) : undefined;
  console.log(phrase.title);
  return (
    <Container>
      <BgSvg
        width={width}
        height={height}
        style={{ position: "absolute", top: 0, left: 0, zIndex: -1 }}
      />
      <ArrowButton onPress={() => navigation.goBack()}>
        <AntDesign name="arrowleft" size={35} color={"#FF7F00"} />
      </ArrowButton>
      <Main>
        <NumberTitle>{phrase.number}</NumberTitle>
        <Title>{phrase.title}</Title>
        <Content>{phrase.content}</Content>
      </Main>
      <Bottom>
        <DeleteButton>
          <FontAwesome5 name="trash-alt" color={"#fff"} size={24} />
        </DeleteButton>
        <EditButton>
          <FontAwesome5 name="pen" size={24} color="#fff" />
        </EditButton>
        <SpeakPhrase>
          <SpeakPhraseText>Falar Frase</SpeakPhraseText>
          <FontAwesome name="microphone" size={30} color={"#fff"} />
        </SpeakPhrase>
      </Bottom>
    </Container>
  );
}
