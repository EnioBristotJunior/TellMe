//React
import React, { useState } from "react";
//Componentes
import { View, Dimensions, TouchableOpacity, ScrollView } from "react-native";
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
//Expo Speech
import * as Speech from "expo-speech";
//Fundo
import BgSvg from "../../../imgs/SpeakPhrase/backSpeakPhrase-g9.svg";

//Mensagem Toast
import Toast from "react-native-toast-message";

//Icons
import {
  AntDesign,
  FontAwesome,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";
import { ConfirmPhraseModal } from "../../../components/ConfirmPhraseModal";
import { Area } from "../../../components/ConfirmModal/styles";
import { AreaSchema } from "../../../databases/schemas/AreaSchema";

import {
  clean,
  getOneboarding,
  setOneboarding,
  getHistoric,
  setHistoric,
} from "../../../storage";

//Tamanho da tela
const { width, height } = Dimensions.get("screen");

export function Speak({ navigation }) {
  //Variaveis da rota
  const route = useRoute();
  const { phraseId, areaId } = route.params;
  const phrase = phraseId ? useObject(PhraseSchema, phraseId) : undefined;
  const area = areaId ? useObject(AreaSchema, areaId) : undefined;
  //Estados
  const [visible, setVisible] = useState(false);
  const [phraseNumber, setPhraseNumber] = useState(phrase?.number);
  const [phraseTitle, setPhraseTitle] = useState(phrase?.title);
  const [phraseContent, setPhraseContent] = useState(phrase?.content);

  const [isSpeaking, setIsSpeaking] = useState(false);

  const historic = JSON.parse(getHistoric() || "[]");
  // console.log(historic);

  function HandleOpenEdit(phraseId, areaId) {
    navigation.navigate("editPhrase", { phraseId, areaId });
  }

  //Mensagem Toast

  function ToastIsSpeaking() {
    Toast.show({
      type: "speaking",
      text1: "Emição em andamento!",
    });
  }

  function ToastSpeakError() {
    Toast.show({
      type: "appError",
      text1: "Erro ao converter texto para voz",
    });
  }

  async function StartSpeak(content) {
    try {
      console.log(content);
      Speech.speak(content, {
        language: "pt-br",
        onStart: () => setIsSpeaking(true),
        onDone: () => setIsSpeaking(false),
        onStopped: () => setIsSpeaking(false),
      });
      ToastIsSpeaking();
      setRecentUsed(phrase);
    } catch (error) {
      console.log(error);
      ToastSpeakError();
    }
  }

  async function StopSpeak() {
    try {
      Speech.stop();
    } catch (error) {
      console.log(error);
    }
  }

  function setRecentUsed(phraseToSet) {
    const index = historic.findIndex((v) => v._id === phraseToSet._id);
    const alreadyExists = index > -1;

    if (alreadyExists) {
      historic.splice(index, 1);
    }

    historic.unshift(phraseToSet);
    // console.log(historic);
    setHistoric(historic);
  }
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
        <NumberTitle>{phraseNumber}</NumberTitle>
        <Title>{phraseTitle}</Title>
        <ScrollView style={{ maxHeight: 300 }}>
          <Content>{phraseContent}</Content>
        </ScrollView>
      </Main>
      <Bottom>
        <DeleteButton onPress={() => setVisible(true)}>
          <FontAwesome5 name="trash-alt" color={"#fff"} size={24} />
        </DeleteButton>
        <EditButton onPress={() => HandleOpenEdit(phrase._id, area._id)}>
          <FontAwesome5 name="pen" size={24} color="#fff" />
        </EditButton>
        {!isSpeaking ? (
          <SpeakPhrase onPress={() => StartSpeak(phraseContent)}>
            <SpeakPhraseText>Falar Frase</SpeakPhraseText>
            <FontAwesome name="microphone" size={30} color={"#fff"} />
          </SpeakPhrase>
        ) : (
          <SpeakPhrase onPress={() => Speech.stop()}>
            <SpeakPhraseText>Parar</SpeakPhraseText>
            <Ionicons name="stop-circle-outline" size={35} color={"#fff"} />
          </SpeakPhrase>
        )}
      </Bottom>
      <ConfirmPhraseModal
        visible={visible}
        setVisible={setVisible}
        area={area}
        navigation={navigation}
        phrase={phrase}
      />
    </Container>
  );
}
