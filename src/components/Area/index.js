import React from "react";
import { View, TouchableOpacity } from "react-native";

import { Container, Content, TextArea } from "./style";

import { FontAwesome5 } from "@expo/vector-icons";
import { Image } from "expo-image";

export function Area({ title, icon, img, navigation }) {
  return (
    <Container onPress={navigation}>
      {/* Verificar se a imagem de fundo existe */}
      {img ? (
        <Image
          source={img}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            left: 0,
            top: 0,
            zIndex: -1,
            borderRadius: 10,
            opacity: 0.7,
          }}
        />
      ) : (
        <View
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            left: 0,
            top: 0,
            zIndex: -1,
            borderRadius: 10,
            backgroundColor: "#FF7F00",
            opacity: 1,
          }}
        ></View>
      )}
      <Content>
        <TextArea>{title}</TextArea>

        <TouchableOpacity
          style={{ position: "absolute", right: 20, bottom: 20 }}
          onPress={icon}
        >
          <FontAwesome5 name="pen" size={24} color="#fff" />
        </TouchableOpacity>
      </Content>
    </Container>
  );
}
