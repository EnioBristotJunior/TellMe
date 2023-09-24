import React, { useState } from "react";
import { View, Dimensions, TouchableOpacity } from "react-native";
import {
  Container,
  Main,
  Header,
  Title,
  Input,
  Area,
  Form,
  AlertView,
  TextAlert,
  PhraseContent,
  Bottom,
  Confirm,
  ConfirmText,
  AreaView,
  TextArea,
} from "./styles";

//Realm
import { useRealm, useObject } from "../../../databases";
import { PhraseSchema } from "../../../databases/schemas/PhraseSchema";
import { AreaSchema } from "../../../databases/schemas/AreaSchema";

//Navegação
import { useRoute } from "@react-navigation/native";

//Fundo
import BgSvg from "../../../imgs/Areas/backArea-g9.svg";

//Mensagem Toast
import Toast from "react-native-toast-message";

//Icons
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

//Tamanho da tela
const { width, height } = Dimensions.get("screen");

export function EditPhrase({ navigation }) {
  //Variaveis da rota
  const realm = useRealm();
  const route = useRoute();
  const { phraseId, areaId } = route.params;
  const phrase = phraseId ? useObject(PhraseSchema, phraseId) : undefined;
  const area = areaId ? useObject(AreaSchema, areaId) : undefined;

  const firstPhraseTitle = phrase?.title;
  const firstPhraseContent = phrase?.content;
  //Estados
  const [phraseTitle, setPhraseTitle] = useState(phrase?.title);
  const [phraseContent, setPhraseContent] = useState(phrase?.content);

  //Mensagens Toast

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

  function ToastEditPhrase() {
    Toast.show({
      type: "newArea",
      text1: "Frase alterada com sucesso",
    });
  }

  //Verificação se os campos estão com irregularidades

  function Verification() {
    if (phraseTitle != "" && phraseContent != "") {
      if (phraseTitle.length <= 25) {
        HandleSave(
          phraseTitle.trim(),
          phraseContent.trim(),
          phrase._id,
          area._id
        );
      } else {
        exceededCharacters();
      }
    } else {
      needCamps();
    }
  }

  //Salvar alterações da frase
  function HandleSave(title, content, phraseId, areaId) {
    try {
      realm.write(() => {
        phrase.title = title;
        phrase.content = content;
        phrase.updated_at = new Date();
      });
      Toast.show({
        type: "appChecked",
        text1: "Frase modificada com sucesso",
      });
      setTimeout(() => {
        navigation.navigate("home");
      }, 1500);
    } catch (error) {
      console.log(error);
    }
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
          <Title>Editar Frase</Title>
        </Header>
        <Form>
          <AreaView>
            <Ionicons name="information-circle" size={24} color="#091837" />
            <TextArea>Área: {area.title}</TextArea>
          </AreaView>
          <View style={{ gap: 8 }}>
            <Input
              placeholder="Título da frase"
              placeholderTextColor={"#d9d9d9"}
              cursorColor={"#ff7f00"}
              onChangeText={setPhraseTitle}
              value={phraseTitle}
            />
            <AlertView>
              <Ionicons name="alert-circle-outline" size={24} color="#FF7F00" />
              <TextAlert>Máximo de 25 caracteres</TextAlert>
            </AlertView>
          </View>
          <PhraseContent
            numberOfLines={4}
            placeholder="Conteúdo da frase"
            placeholderTextColor={"#d9d9d9"}
            cursorColor={"#FF7F00"}
            multiline
            onChangeText={setPhraseContent}
            value={phraseContent}
          />
        </Form>
      </Main>
      <Bottom>
        {firstPhraseTitle != phraseTitle ||
        firstPhraseContent != phraseContent ? (
          <Confirm onPress={Verification}>
            <ConfirmText>Salvar alterações</ConfirmText>
          </Confirm>
        ) : (
          <Confirm onPress={() => navigation.goBack()}>
            <ConfirmText>Voltar</ConfirmText>
          </Confirm>
        )}
      </Bottom>
    </Container>
  );
}
