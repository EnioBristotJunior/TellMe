import React, { useEffect, useState } from "react";
import {
  Container,
  TapClose,
  Input,
  RecentlyText,
  PhrasesSection,
  PhraseContainer,
  PhraseNumber,
  PhraseText,
  AreaName,
} from "./styles";
import { Modal } from "react-native";

import { useUser } from "@realm/react";
import { useQuery, useObject } from "../../databases";
import { PhraseSchema } from "../../databases/schemas/PhraseSchema";
import { AreaSchema } from "../../databases/schemas/AreaSchema";

import { FontAwesome } from "@expo/vector-icons";
import { FlatList } from "react-native";
import { View } from "react-native";
import { ConfirmSpeakModal } from "../ConfirmSpeakModal";

export function FastTalk({ visible, setVisible }) {
  const user = useUser();

  const [searchText, setSearchText] = useState("");
  const [confirmSpeakVisible, setConfirmSpeakVisible] = useState(false);
  const [phrasesRecentUsed, setPhrasesRecentUsed] = useState([]);
  const [phraseToGo, setPhraseToGo] = useState(null);
  // const [areaName, setAreaName] = useState(null);

  const allPhrases = useQuery(PhraseSchema).filtered(`userId == '${user.id}'`);

  const phrases = allPhrases
    .filtered("title CONTAINS[c] $0", searchText)
    .toJSON();

  // console.log(phrasesRecentUsed);

  // const phrasesToGetArea = allPhrases.toJSON();
  // console.log(phrasesToGetArea);

  // useEffect(() => {
  //   phrasesToGetArea.forEach((value, i, array) => {
  //     let area = phrasesToGetArea[i].areaId
  //       ? useObject(AreaSchema, phrasesToGetArea[i].areaId)
  //       : undefined;
  //   });
  // }, []);

  function openConfirmModal(phrase) {
    setPhraseToGo(phrase);
    setConfirmSpeakVisible(true);
    // setPhrasesRecentUsed([...phrasesRecentUsed, phrase]);
  }

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <TapClose onPress={() => setVisible(false)} />
      <Container>
        <Input
          placeholder="Pesquisar frase"
          placeholderTextColor={"#d9d9d9"}
          cursorColor={"#ff7f00"}
          value={searchText}
          onChangeText={setSearchText}
        />
        {searchText != "" ? (
          <PhrasesSection>
            <RecentlyText>Resultado</RecentlyText>
            <FlatList
              data={phrases}
              key={"#"}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item._id}
              style={{ maxHeight: 250 }}
              renderItem={({ item }) => (
                <PhraseContainer onPress={() => openConfirmModal(item)}>
                  <PhraseNumber>{item.number}</PhraseNumber>
                  <View>
                    <PhraseText>{item.title}</PhraseText>
                    <AreaName>{item.areaId}</AreaName>
                  </View>
                </PhraseContainer>
              )}
            />
          </PhrasesSection>
        ) : (
          <PhrasesSection>
            <RecentlyText>Suas frases</RecentlyText>
            <FlatList
              data={allPhrases}
              key={"-"}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item._id}
              style={{ maxHeight: 250 }}
              renderItem={({ item }) => (
                <PhraseContainer onPress={() => openConfirmModal(item)}>
                  <PhraseNumber>{item?.number}</PhraseNumber>
                  <View>
                    <PhraseText>{item?.title}</PhraseText>
                    <AreaName>{item?.areaId}</AreaName>
                  </View>
                </PhraseContainer>
              )}
            />
          </PhrasesSection>
        )}
      </Container>
      <ConfirmSpeakModal
        visible={confirmSpeakVisible}
        setVisible={setConfirmSpeakVisible}
        phrase={phraseToGo}
      />
    </Modal>
  );
}
