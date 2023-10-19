import React from "react";
import { View, Modal } from "react-native";
import { useRealm, useQuery } from "../../databases/";
import { PhraseSchema } from "../../databases/schemas/PhraseSchema";
import { useUser } from "@realm/react";
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

import { storage } from "../../firebase/config";
import { ref, uploadBytes, deleteObject } from "firebase/storage";

export function ConfirmModal({
  visible,
  setVisible,
  area,
  navigation,
  areaImage,
}) {
  //Realm
  const realm = useRealm();
  const user = useUser();
  const phrases = useQuery(PhraseSchema);
  // console.log(areaImage);
  // console.log(areaImage);
  //Excluir área
  async function HandleRemove(area) {
    try {
      const phrasesToDelete = phrases
        .filtered(`userId == '${user.id}'`)
        .filtered(`areaId == '${area._id || 372387}'`);

      if (areaImage) {
        const storageRef = ref(storage, areaImage);

        deleteObject(storageRef)
          .then(() => {
            console.log("foi bebe");
          })
          .catch((error) => {
            console.log("deu pau: " + error);
          });
      }
      realm.write(() => {
        realm.delete(area);
        realm.delete(phrasesToDelete);
      });

      setVisible(false);
      Toast.show({
        type: "appChecked",
        text1: "Área exluída com sucesso!",
      });
      setTimeout(() => navigation.navigate("home"), 1500);
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
