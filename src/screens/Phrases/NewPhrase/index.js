//React
import React, { useEffect, useState } from "react";

//Realm
import { useRealm } from "../../../databases";
import { useUser } from "@realm/react";

//React Native
import { View, Dimensions, TouchableOpacity } from "react-native";

//Styles
import { Container, Main, Header, Title, Form, Input, AlertView, TextAlert, Bottom, Confirm, ConfirmText, PhraseContent } from "./styles";

//uuid
import uuid from "react-native-uuid";

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


  const [contentInputFocus, setContentInputFocus] = useState(false)
  return (
    <Container>
      <BgSvg
        width={width}
        height={height}
        style={{ position: "absolute", top: 0, left: 0, zIndex: -1 }}
      />
      <Main>
        <Header>
          <TouchableOpacity onPress={() => navigation.goBack()} >
            <AntDesign name="arrowleft" size={35} color={"#FF7F00"} />
          </TouchableOpacity>
          <Title>Criar nova frase</Title>
        </Header>
        <Form>
          <Input 
          placeholder="Número da frase" 
          keyboardType="numeric" 
          placeholderTextColor={"#d9d9d9"}
          cursorColor={"#ff7f00"} />
          <View style={{ gap: 8 }}>
            <Input 
            placeholder="Título" 
            keyboardType="numeric" 
            placeholderTextColor={"#d9d9d9"}
            cursorColor={"#ff7f00"} />
            <AlertView>
              <Ionicons name="alert-circle-outline" size={24} color="#FF7F00" />
              <TextAlert>Máximo de 15 caracteres</TextAlert>
            </AlertView>
          </View>
          <PhraseContent 
            is={contentInputFocus}
            numberOfLines={4}  
            placeholder="Conteúdo da frase" 
            placeholderTextColor={"#091837"}
            cursorColor={"#d9d9d9"}
            multiline
            />
        </Form>
      </Main>
      <Bottom>
        <Confirm>
          <ConfirmText>Criar frase</ConfirmText>
        </Confirm>
      </Bottom>
    </Container>
  );
}