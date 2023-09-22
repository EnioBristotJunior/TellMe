import React from "react";
import { Container, Number, Title, Content } from "./styles";
import { View } from "react-native";

export function Phrase({ title, content, number, navigation }) {
  return (
    <Container onPress={navigation}>
      <Number>{number}</Number>
      <View>
        <Title>{title}</Title>
        <Content>
          {content.length > 40 ? content.substring(0, 40) + "..." : content}
        </Content>
      </View>
    </Container>
  );
}
