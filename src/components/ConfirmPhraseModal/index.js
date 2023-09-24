import React from "react";
import { useRealm } from "../../databases/";
import {
  AreaTitle,
  Bottom,
  Cancel,
  Container,
  Phrase,
  PhraseTitle,
  TapClose,
  Title,
  TextButton,
  Confirm,
} from "./styles";
import { Modal } from "react-native";

import Toast from "react-native-toast-message";

export function ConfirmPhraseModal({
  visible,
  setVisible,
  phrase,
  areaTitle,
  navigation,
}) {
  const realm = useRealm();
  async function HandleRemove(phrase) {
    try {
      realm.write(() => {
        realm.delete(phrase);
      });
      setVisible(false);
      Toast.show({
        type: "appChecked",
        text1: "Frase exluída com sucesso!",
      });
      setTimeout(() => {
        navigation.navigate("home");
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <TapClose onPress={() => setVisible(false)} />
      <Container>
        <Title>Tem certeza de que deseja excluir essa frase?</Title>
        <Phrase>
          <PhraseTitle>{phrase?.title}</PhraseTitle>
          <AreaTitle>Área: {areaTitle}</AreaTitle>
        </Phrase>
        <Bottom>
          <Cancel onPress={() => setVisible(false)}>
            <TextButton>Cancelar</TextButton>
          </Cancel>
          <Confirm onPress={() => HandleRemove(phrase)}>
            <TextButton>Excluir</TextButton>
          </Confirm>
        </Bottom>
      </Container>
    </Modal>
  );
}
