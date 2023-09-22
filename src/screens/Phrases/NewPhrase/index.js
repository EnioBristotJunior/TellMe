//React
import React, { useEffect, useState } from "react";

//Realm
import { useRealm, useObject, useQuery } from "../../../databases";
import { useUser } from "@realm/react";
import { AreaSchema } from "../../../databases/schemas/AreaSchema";
import { PhraseSchema } from "../../../databases/schemas/PhraseSchema";

//React Native
import { View, Dimensions, TouchableOpacity } from "react-native";

//Styles
import {
  Container,
  Main,
  Header,
  Title,
  Form,
  Input,
  AlertView,
  TextAlert,
  Bottom,
  Confirm,
  ConfirmText,
  PhraseContent,
} from "./styles";

//uuid
import uuid from "react-native-uuid";

//Navegação
import { useRoute } from "@react-navigation/native";

//SVG
import BgSvg from "../../../imgs/Areas/backArea-g9.svg";

//Icons
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

//Mensagem Toast
import Toast from "react-native-toast-message";

//Dimensão da tela
const { width, height } = Dimensions.get("screen");

export function NewPhrase({ navigation }) {
  //Estados
  const [phraseTitle, setPhraseTitle] = useState("");
  const [phraseContent, setPhraseContent] = useState("");
  const [contentInputFocus, setContentInputFocus] = useState(false);

  //Parametros
  const route = useRoute();
  const { areaId, phrasesLength } = route.params;
  const area = areaId ? useObject(AreaSchema, areaId) : undefined;
  console.log(phrasesLength);
  //Realm
  const user = useUser();
  const realm = useRealm();

  function needCamps() {
    Toast.show({
      type: "appError",
      text1: "Por favor, preencha todos os campos",
    });
  }

  function exceededCharacters() {
    Toast.show({
      type: "appError",
      text1: "Número de caracteres excedido",
    });
  }

  function ToastNewPhrase() {
    Toast.show({
      type: "newArea",
      text1: "Frase criada com sucesso",
    });
  }

  //Verificação se os campos estão com irregularidades

  function Verification() {
    if (phraseTitle != "" && phraseContent != "") {
      if (phraseTitle.length <= 25) {
        newPhrase();
      } else {
        exceededCharacters();
      }
    } else {
      needCamps();
      console.log(phrases.length);
    }
  }

  function newPhrase() {
    try {
      console.log(area._id);
      realm.write(() => {
        realm.create("Phrase", {
          _id: uuid.v4(),
          userId: user.id,
          areaId: area._id,
          title: phraseTitle.trim(),
          content: phraseContent.trim(),
          number: phrasesLength + 1,
        });
      });
      ToastNewPhrase();
      setPhraseTitle("");
      setPhraseContent("");
      setTimeout(() => HandleBack(area._id), 1500);
    } catch (error) {
      console.log(error);
    }
  }
  function HandleBack(id) {
    navigation.navigate("phrasesList", { id });
  }
  return (
    <Container>
      <BgSvg
        width={width}
        height={height}
        style={{ position: "absolute", top: 0, left: 0, zIndex: -1 }}
      />
      <Main>
        <Header>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={35} color={"#FF7F00"} />
          </TouchableOpacity>
          <Title>Criar nova frase</Title>
        </Header>
        <Form>
          <View style={{ gap: 8 }}>
            <Input
              placeholder="Título da frase"
              placeholderTextColor={"#d9d9d9"}
              cursorColor={"#ff7f00"}
              onChangeText={setPhraseTitle}
              s
              value={phraseTitle}
            />
            <AlertView>
              <Ionicons name="alert-circle-outline" size={24} color="#FF7F00" />
              <TextAlert>Máximo de 25 caracteres</TextAlert>
            </AlertView>
          </View>
          <PhraseContent
            is={contentInputFocus}
            numberOfLines={4}
            placeholder="Conteúdo da frase"
            placeholderTextColor={"#d9d9d9"}
            cursorColor={"#FF7F00"}
            multiline
            onFocus={() => setContentInputFocus(true)}
            onBlur={() => setContentInputFocus(false)}
            onChangeText={setPhraseContent}
            value={phraseContent}
          />
        </Form>
      </Main>
      <Bottom>
        <Confirm onPress={() => Verification()}>
          <ConfirmText>Criar frase</ConfirmText>
        </Confirm>
      </Bottom>
    </Container>
  );
}
