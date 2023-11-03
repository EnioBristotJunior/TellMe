import React from "react";
import {
  Container,
  TapClose,
  Title,
  Operators,
  CancelButton,
  ConfirmButton,
  TextButton,
} from "./styles";
import { Modal } from "react-native";
import { useRealm, useQuery } from "../../databases/";
import { PhraseSchema } from "../../databases/schemas/PhraseSchema";
import { AreaSchema } from "../../databases/schemas/AreaSchema";
import { useUser, useApp } from "@realm/react";
import { storage } from "../../firebase/config";
import Toast from "react-native-toast-message";
import { Restart } from "fiction-expo-restart";
import { clean } from "../../storage";

import {
  ref,
  uploadBytes,
  deleteObject,
  getDownloadURL,
} from "firebase/storage";

export function ConfirmDeleteModal({ visible, setVisible }) {
  const realm = useRealm();
  const user = useUser();
  const app = useApp();
  const userAreas = useQuery(AreaSchema).filtered(`userId == '${user.id}'`);
  const userPhrases = useQuery(PhraseSchema).filtered(`userId == '${user.id}'`);

  const userAreasToFor = useQuery(AreaSchema)
    .filtered(`userId == '${user.id}'`)
    .toJSON();

  function Checked() {
    Toast.show({
      type: "appChecked",
      text1: "Conta excluída com sucesso!",
    });
  }

  async function writeCustomUserData(newCustomData) {
    try {
      const customUserDataCollection = user
        .mongoClient("mongodb-atlas")
        .db("custom-user-data-database")
        .collection("custom-user-data");

      const filter = {
        userId: user.id,
      };
      const options = { upsert: true };
      await customUserDataCollection.deleteOne(filter);
    } catch (error) {
      console.log(error);
    }
  }

  async function removeAreas() {
    try {
      for (let i = 0; i < userAreas.toJSON().length; i++) {
        const desertRef = ref(storage, userAreasToFor[i].imageURl);
        // Delete the file
        deleteObject(desertRef)
          .then(() => {
            console.log("foi bebe");
          })
          .catch((error) => {
            console.log("deu pau: " + error);
          });
      }

      realm.write(() => {
        realm.delete(userAreas);
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function removePhrases() {
    try {
      realm.write(() => {
        realm.delete(userPhrases);
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function removeUserData() {
    try {
      writeCustomUserData();
      const desertRef = ref(storage, user.customData.UserImage);
      // Delete the file
      deleteObject(desertRef)
        .then(() => {
          console.log("foi bebe");
        })
        .catch((error) => {
          console.log("deu pau: " + error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  async function removeAccount() {
    try {
      clean();
      await removeAreas();
      await removePhrases();
      await removeUserData();
      await app.deleteUser(user);
      Checked();
      setTimeout(() => Restart(), 1000);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <TapClose onPress={() => setVisible(false)} />
      <Container>
        <Title>Tem certeza de que deseja excluir sua conta?</Title>
        <Operators>
          <CancelButton onPress={() => setVisible(false)}>
            <TextButton>Cancelar</TextButton>
          </CancelButton>
          <ConfirmButton onPress={removeAccount}>
            <TextButton>Confirmar</TextButton>
          </ConfirmButton>
        </Operators>
      </Container>
    </Modal>
  );
}
