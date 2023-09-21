import React from "react";
import { Container, Number, Title, Content } from "./styles";
import { View } from "react-native";

export function Phrase({ title, content, number, navigation }) {
  return (
    <Container>
      <Number>{number}</Number>
      <View>
        <Title>{title}</Title>
        <Content>{content}</Content>
      </View>
    </Container>
  );
}
