import React from "react";
import { View, TouchableOpacity } from "react-native";

import { Container, Content, TextArea } from "./style";

import { FontAwesome5 } from "@expo/vector-icons";
import { Image } from "expo-image";

export function Area({ title, press, icon, img }) {

  return (
    <Container onPress={press}>
      {img ?
        <Image
          source={img}
          style={{
            width: '100%',
            height: '100%',
            position: "absolute",
            left: 0,
            top: 0,
            zIndex: -1, opacity: 0.8, borderRadius: 10
          }} />
        : <></>}
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
