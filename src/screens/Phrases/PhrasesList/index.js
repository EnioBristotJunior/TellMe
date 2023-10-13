//React
import React, { useEffect, useState, useContext } from "react";
import {
  Container,
  Header,
  Main,
  Title,
  ChangeView,
  NewPhraseOne,
  NewPhraseText,
  PhrasesSection,
  StandartView,
  GridView,
} from "./styles";
import { Dimensions, View, TouchableOpacity } from "react-native";

//Realm
import { useRealm, useObject, useQuery } from "../../../databases";
import { AreaSchema } from "../../../databases/schemas/AreaSchema";
import { PhraseSchema } from "../../../databases/schemas/PhraseSchema";
import { useUser } from "@realm/react";

import { OneBoardingContext } from "../../../context/oneboardingContext";

//Navegação
import { useRoute } from "@react-navigation/native";

//Fundo
import BgSvg from "../../../imgs/Phrases/backPhrase-g9.svg";

//Icons
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import { FlatList } from "react-native";
import { Phrase } from "../../../components/Phrase";

const { width, height } = Dimensions.get("screen");

export function PhrasesList({ navigation }) {
  const { gridSentenceView, setGridSentenceView } =
    useContext(OneBoardingContext);

  //Parametros
  const route = useRoute();
  const { id } = route.params;
  //Realm
  const realm = useRealm();
  const user = useUser();
  const area = id ? useObject(AreaSchema, id) : undefined;
  const phrasesQuery = useQuery(PhraseSchema)
    .filtered(`userId == '${user.id}'`)
    .filtered(`areaId == '${area._id}'`);

  const [phrases, setPhrases] = useState(phrasesQuery.toJSON());
  const [gridExibition, setGridExibition] = useState(false);
  //Lista de Frases
  // async function fetchPhrases() {
  //   try {
  //     const response = phrasesQuery.toJSON();
  //     const filtUser = (registro) => registro.userId == user.id;
  //     const filtArea = (registro) => registro.areaId == area._id;
  //     let result = response.filter(filtUser).filter(filtArea);
  //     setPhrases(result);
  //     // console.log(result);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  // //Carrega a função
  // useEffect(() => {
  //   fetchPhrases();
  // }, []);
  // //Atualiza toda vez que a variável mudar
  // useEffect(() => {
  //   realm.addListener("change", fetchPhrases);

  //   return () => realm.removeListener("change", fetchPhrases);
  // }, []);

  //Remoção do bottom navigator
  useEffect(() => {
    navigation.getParent().setOptions({ tabBarStyle: { display: "none" } });
    return () => {
      navigation.getParent().setOptions({
        tabBarStyle: {
          display: "flex",
          backgroundColor: "#FF7F00",
          height: 70,
          position: "absolute",
          bottom: 30,
          right: 40,
          borderRadius: 20,
          left: 40,
          borderTopWidth: 0,
        },
      });
    };
  }, []);

  function HandleNewPhrase(areaId, phrasesLength) {
    navigation.navigate("newPhrase", { areaId, phrasesLength });
    // console.log(areaId)
  }

  function HandleOpenPhrase(phraseId, areaId) {
    navigation.navigate("speak", { phraseId, areaId });
  }

  return (
    <Container>
      <BgSvg
        width={width}
        height={height}
        style={{ position: "absolute", top: 0, left: 0, zIndex: -1 }}
      />
      <Main>
        <Header>
          <TouchableOpacity
            onPress={() => {
              navigation.getParent().setOptions({
                tabBarStyle: {
                  display: "flex",
                  backgroundColor: "#FF7F00",
                  height: 70,
                  position: "absolute",
                  bottom: 30,
                  right: 40,
                  borderRadius: 25,
                  left: 40,
                  borderTopWidth: 0,
                },
              });
              navigation.goBack();
            }}
          >
            <AntDesign name="arrowleft" size={35} color={"#FF7F00"} />
          </TouchableOpacity>

          <Title>{area.title}</Title>
          <ChangeView>
            <StandartView
              isSelected={gridSentenceView}
              onPress={() => setGridSentenceView(false)}
            >
              <FontAwesome5 name="grip-lines" size={25} color={"#091837"} />
            </StandartView>
            <GridView
              isSelected={gridSentenceView}
              onPress={() => setGridSentenceView(true)}
            >
              <Ionicons name="grid" size={25} color={"#091837"} />
            </GridView>
          </ChangeView>
        </Header>
        <PhrasesSection>
          {gridSentenceView ? (
            <FlatList
              data={phrases}
              key={"#"}
              columnWrapperStyle={{ columnGap: 15 }}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              style={{ maxHeight: 600, marginBottom: 10 }}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <Phrase
                  title={item.title}
                  number={item.number}
                  content={item.content}
                  navigation={() => HandleOpenPhrase(item._id, area._id)}
                  gridExibition={gridSentenceView}
                />
              )}
              ListFooterComponent={() => (
                <NewPhraseOne
                  onPress={() => HandleNewPhrase(area._id, phrases.length)}
                >
                  <FontAwesome5 name="plus" size={25} color={"#fff"} />
                  <NewPhraseText>Adicionar nova frase</NewPhraseText>
                </NewPhraseOne>
              )}
            />
          ) : (
            <FlatList
              data={phrases}
              key={"-"}
              showsVerticalScrollIndicator={false}
              style={{ maxHeight: 600, marginBottom: 10 }}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <Phrase
                  title={item.title}
                  number={item.number}
                  content={item.content}
                  navigation={() => HandleOpenPhrase(item._id, area._id)}
                  gridExibition={gridSentenceView}
                />
              )}
              ListFooterComponent={() => (
                <NewPhraseOne
                  onPress={() => HandleNewPhrase(area._id, phrases.length)}
                >
                  <FontAwesome5 name="plus" size={25} color={"#fff"} />
                  <NewPhraseText>Adicionar nova frase</NewPhraseText>
                </NewPhraseOne>
              )}
            />
          )}
        </PhrasesSection>
      </Main>
    </Container>
  );
}
