import React from "react";
import { View, Modal } from "react-native";
import { useRealm, useObject } from "../../databases/";
//Mensagem Toast
import Toast from "react-native-toast-message";

import {
  Bottom,
  Area,
  AreaTitle,
  Cancel,
  Confirm,
  Container,
  PhraseNumber,
  TapClose,
  TextButton,
  Title,
  AlertView,
  TextAlert,
} from "./styles";

import { Ionicons } from "@expo/vector-icons";

export function ConfirmModal({ visible, setVisible, area, navigation }) {
  const realm = useRealm();

  //Excluir área
  async function HandleRemove(area) {
    try {
      realm.write(() => {
        realm.delete(area);
      });
      setVisible(false);
      navigation.navigate("home");
      Toast.show({
        type: "appChecked",
        text1: "Área exluída com sucesso!",
      });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <TapClose onPress={() => setVisible(false)} />
      <Container>
        <Title>Tem certeza que deseja excluir essa área?</Title>
        <Area>
          <AreaTitle>{area?.title}</AreaTitle>
          <PhraseNumber>8 frases registradas</PhraseNumber>
        </Area>

        <Bottom>
          <AlertView>
            {/* <Ionicons name="alert-circle-outline" size={24} color="#FF7F00" /> */}
            <TextAlert>
              Todas as frases dessa área também serão excluidas!
            </TextAlert>
          </AlertView>
          <Cancel onPress={() => setVisible(false)}>
            <TextButton>Cancelar</TextButton>
          </Cancel>
          <Confirm onPress={() => HandleRemove(area)}>
            <TextButton>Excluir</TextButton>
          </Confirm>
        </Bottom>
      </Container>
    </Modal>
  );
}
