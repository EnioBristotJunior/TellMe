import React from "react";
import { useRealm, useQuery } from "../../databases/";
import { useUser } from "@realm/react";
import { PhraseSchema } from "../../databases/schemas/PhraseSchema";
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
  area,
  navigation,
}) {
  const realm = useRealm();
  const user = useUser();
  const phrases = useQuery(PhraseSchema)
    .filtered(`userId == '${user.id}'`)
    .filtered(`areaId == '${area._id}'`);

  //Excluir Frase
  async function HandleRemove(phrase) {
    try {
      realm.write(() => {
        realm.delete(phrase);
        for (let i = 0; i < phrases.toJSON().length; i++) {
          phrases[i].number = i + 1;
        }
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
          <AreaTitle>Área: {area.title}</AreaTitle>
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
