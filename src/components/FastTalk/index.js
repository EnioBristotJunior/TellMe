import React, { useEffect, useState } from "react";
import {
  Container,
  TapClose,
  Input,
  RecentlyText,
  PhrasesSection,
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
import { FastTalkPhrase } from "../FastTalkPhrase";
import { getHistoric } from "../../storage";

export function FastTalk({ visible, setVisible }) {
  const user = useUser();

  const [searchText, setSearchText] = useState("");
  const [confirmSpeakVisible, setConfirmSpeakVisible] = useState(false);
  const [phraseToGo, setPhraseToGo] = useState(null);
  // const [areaName, setAreaName] = useState(null);

  const allPhrases = useQuery(PhraseSchema).filtered(`userId == '${user.id}'`);

  const phrases = allPhrases
    .filtered("title CONTAINS[c] $0", searchText)
    .toJSON();

  const historic = getHistoric();
  let phrasesRecentUsed = [];
  if (historic != undefined) {
    phrasesRecentUsed = JSON.parse(historic);
    // console.log("caiu no if" + phrasesRecentUsed);
  }

  //console.log("nao caiu do if" + phrasesRecentUsed);

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
        {searchText != "" || phrasesRecentUsed == undefined ? (
          <View>
            {allPhrases.toJSON() != "" ? (
              <PhrasesSection>
                <RecentlyText>Resultado</RecentlyText>
                <FlatList
                  data={phrases}
                  key={"#"}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item) => item._id}
                  style={{ maxHeight: 250 }}
                  renderItem={({ item }) => (
                    <FastTalkPhrase
                      id={item._id}
                      areaId={item.areaId}
                      title={item.title}
                      number={item.number}
                      isEnabled={() => openConfirmModal(item)}
                    />
                  )}
                />
              </PhrasesSection>
            ) : (
              <RecentlyText>Nenhuma frase foi adicionada ainda</RecentlyText>
            )}
          </View>
        ) : (
          <View>
            {allPhrases.toJSON() != "" ? (
              <PhrasesSection>
                <RecentlyText>Frases Recentemente usadas</RecentlyText>
                <FlatList
                  data={phrasesRecentUsed}
                  key={"-"}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item) => item._id}
                  style={{ maxHeight: 250 }}
                  renderItem={({ item }) => (
                    <FastTalkPhrase
                      id={item._id}
                      areaId={item.areaId}
                      title={item.title}
                      number={item.number}
                      isEnabled={() => openConfirmModal(item)}
                    />
                  )}
                />
              </PhrasesSection>
            ) : (
              <RecentlyText>Nenhuma frase foi adicionada ainda</RecentlyText>
            )}
          </View>
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
