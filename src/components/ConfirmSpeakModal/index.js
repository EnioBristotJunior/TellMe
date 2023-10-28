import React from "react";
import {
  CancelButton,
  ConfirmButton,
  Container,
  Operators,
  PhraseTitle,
  TapClose,
  TextButton,
  Title,
} from "./styles";
import { Modal } from "react-native";

//Expo Speech
import * as Speech from "expo-speech";

import { getHistoric, setHistoric } from "../../storage";

//Mensagem Toast
import Toast from "react-native-toast-message";

export function ConfirmSpeakModal({ visible, setVisible, phrase }) {

  const historic = JSON.parse(getHistoric() || '[]') 
  //Mensagem Toast
  // console.log(phrase);

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

  function StartSpeak(content) {
    try {
      console.log(content);
      Speech.speak(content);
      setRecentUsed(phrase)
      ToastIsSpeaking();
      setVisible(false);
    } catch (error) {
      console.log(error);
      ToastSpeakError();
    }
  }

  function setRecentUsed(phraseToSet) {
    const index = historic.findIndex(v => v._id === phraseToSet._id)
    const alreadyExists = index > -1
    
    
    if (alreadyExists){
      historic.splice(index, 1)
    }

    historic.unshift(phraseToSet)
    console.log(historic)
    setHistoric(historic)
  }

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <TapClose onPress={() => setVisible(false)} />
      <Container>
        <Title>
          Deseja falar a frase <PhraseTitle>{phrase?.title}</PhraseTitle> ?
        </Title>
        <Operators>
          <CancelButton onPress={() => setVisible(false)}>
            <TextButton>Cancelar</TextButton>
          </CancelButton>
          <ConfirmButton onPress={() => StartSpeak(phrase.content)}>
            <TextButton>Confirmar</TextButton>
          </ConfirmButton>
        </Operators>
      </Container>
    </Modal>
  );
}
