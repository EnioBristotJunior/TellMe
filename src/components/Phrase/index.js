import React from "react";
import {
  Container,
  Number,
  Title,
  Content,
  GridContainer,
  HeaderCard,
  GridContent,
  GridContentView,
  GridNumber,
  GridTitle,
} from "./styles";
import { View } from "react-native";

export function Phrase({ title, content, number, navigation, gridExibition }) {
  return (
    <>
      {gridExibition ? (
        <GridContainer onPress={navigation}>
          <HeaderCard>
            <GridNumber>{number}</GridNumber>
            <GridTitle>
              {title.length > 22 ? title.substring(0, 22) + "..." : title}
            </GridTitle>
          </HeaderCard>
          <GridContentView>
            <GridContent>
              {content.length > 80 ? content.substring(0, 80) + "..." : content}
            </GridContent>
          </GridContentView>
        </GridContainer>
      ) : (
        <Container onPress={navigation}>
          <Number>{number}</Number>
          <View>
            <Title>{title}</Title>
            <Content>
              {content.length > 40 ? content.substring(0, 40) + "..." : content}
            </Content>
          </View>
        </Container>
      )}
    </>
  );
}
