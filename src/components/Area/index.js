import React from "react";
import { View, TouchableOpacity } from "react-native";

import { Container, TextArea } from "./style";

import { FontAwesome5 } from "@expo/vector-icons";

export function Area({ title, press }) {
  return (
    <Container onPress={press}>
      <TextArea>{title}</TextArea>
      <TouchableOpacity style={{ position: "absolute", right: 20, bottom: 20 }}>
        <FontAwesome5 name="pen" size={24} color="#fff" />
      </TouchableOpacity>
    </Container>
  );
}
