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

//Mensagem Toast
import Toast from "react-native-toast-message";

export function ConfirmSpeakModal({ visible, setVisible, phrase }) {
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

  function StartSpeak(content) {
    try {
      console.log(content);
      Speech.speak(content);
      ToastIsSpeaking();
      setVisible(false);
    } catch (error) {
      console.log(error);
      ToastSpeakError();
    }
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
