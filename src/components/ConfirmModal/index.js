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
import { getHistoric, setHistoric } from "../../storage";

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

  const historic = JSON.parse(getHistoric() || "[]");
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

      if (historic) {
        console.log("caiu aqui em bebe");
        // for (let i = 0; i < historic.length; i++) {
        //   console.log("rodou");
        //   const index = historic.findIndex(
        //     (v) => v._id === phrasesToDelete[i]._id
        //   );
        //   const alreadyExists = index > -1;

        //   if (alreadyExists) {
        //     historic.splice(index, 1);
        //     console.log("existe");
        //   }
        //   setHistoric(historic);
        // }
        for (let i = 0; i < historic.length; i++) {
          for (let j = 0; j < phrasesToDelete.length; j++) {
            const index = historic.findIndex(
              (v) => v._id === phrasesToDelete[j]._id
            );

            const alreadyExists = index > -1;

            if (alreadyExists) {
              historic.splice(index, 1);
            }
          }
        }
        setHistoric(historic);
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

  function RemoveRecentUsed(phraseToSet) {
    const index = historic.findIndex((v) => v._id === phraseToSet._id);
    const alreadyExists = index > -1;

    if (alreadyExists) {
      historic.splice(index, 1);
      setHistoric(historic);
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
