import React, { useState } from "react";
import { Container, PhraseNumber, PhraseText, AreaName } from "./styles";
import { useQuery, useObject } from "../../databases";
import { AreaSchema } from "../../databases/schemas/AreaSchema";
import { View } from "react-native";

export function FastTalkPhrase({ title, number, areaId, isEnabled, id }) {
  const area = areaId ? useObject(AreaSchema, areaId) : undefined;
  return (
    <Container onPress={isEnabled}>
      <PhraseNumber>{number}</PhraseNumber>
      <View>
        <PhraseText>{title}</PhraseText>
        <AreaName>Área: {area?.title}</AreaName>
      </View>
    </Container>
  );
}
