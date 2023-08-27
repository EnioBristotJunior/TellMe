import React from "react";
import { View, Modal, ScrollView } from "react-native";
import {
  Container,
  HearAgain,
  HeardText,
  TapClose,
  TextButton,
  Title,
} from "./styles";

import { FontAwesome } from "@expo/vector-icons";

export function HeardModal({ visible, setVisible, result }) {
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <TapClose onPress={() => setVisible(false)} />
      <Container>
        <Title>Foi isso o que captamos:</Title>
        <HeardText>{result}</HeardText>
        <HearAgain onPress={() => setVisible(false)}>
          <TextButton>Captar novamente</TextButton>
          <FontAwesome name="rotate-left" size={28} color={"#091837"} />
        </HearAgain>
      </Container>
    </Modal>
  );
}
