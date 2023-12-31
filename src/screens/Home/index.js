//React
import React, { useState, useEffect } from "react";

//Componentes
import { View, Dimensions } from "react-native";

//Estilizições
import {
  Container,
  Header,
  TextFastTalk,
  Title,
  NewArea,
  AreasSection,
  FastTalkButton,
} from "./styles";

//Imagem SVG
import BgSvg from "../../imgs/Home/backHome-g9.svg";

//Icons
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

//Realm
import { useUser } from "@realm/react";
import { useQuery, useRealm } from "../../databases";
import { AreaSchema } from "../../databases/schemas/AreaSchema";
import { FlatList } from "react-native";

//Componente área
import { Area } from "../../components/Area";

import { FastTalk } from "../../components/FastTalk";

//Mensagem Toast
import Toast from "react-native-toast-message";

//Dimensão da tela
const { width, height } = Dimensions.get("screen");

export function Home({ navigation }) {
  //Estados
  const [areas, setAreas] = useState([]);
  const [fastTalkVisible, setFastTalkVisible] = useState(false);

  //Realm
  const realm = useRealm();
  const user = useUser();
  const areaQuery = useQuery(AreaSchema);

  //Lista de Áreas
  async function fetchAreas() {
    const response = areaQuery.toJSON();
    const filt = (registro) => registro.userId == user.id;
    let result = response.filter(filt);
    setAreas(result);
    //console.log(result);
  }
  //Carrega a função
  useEffect(() => {
    fetchAreas();
  }, []);
  //Atualiza toda vez que a variável mudar
  useEffect(() => {
    realm.addListener("change", fetchAreas);

    return () => realm.removeListener("change", fetchAreas);
  }, []);
  //Navega para a tela de editar área
  function openEditArea(id) {
    navigation.navigate("editArea", { id });
  }

  //Acessa as frases

  function openPhrases(id) {
    navigation.navigate("phrasesList", { id });
  }

  const addSubs = async () => {
    await realm.subscriptions.update((sub, realm) => {
        const areaToSync = realm.objects('Area').filtered(`userId == '${user.id}'`)
        const phraseToSync = realm.objects('Phrase').filtered(`userId == '${user.id}'`)
   

        sub.add(areaToSync, { name: 'AreaSchema' })
        sub.add(phraseToSync, { name: 'PhraseSchema' })
    })
}

useEffect(() => {
        addSubs()
    
}, [realm])

  return (
    <Container>
      <BgSvg
        width={width}
        height={height}
        style={{ position: "absolute", top: 0, left: 0, zIndex: -1 }}
      />
      <Header>
        <Title>Áreas</Title>
      </Header>
      <AreasSection>
        <FlatList
          data={areas}
          columnWrapperStyle={{ columnGap: 15 }}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          style={{ maxHeight: 600, marginBottom: 10 }}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <Area
              title={item.title}
              navigation={() => openPhrases(item._id)}
              icon={() => openEditArea(item._id)}
              img={item.imageURl}
            />
          )}
          ListFooterComponent={() => (
            <NewArea onPress={() => navigation.navigate("newArea")}>
              <FontAwesome5 name="plus" size={45} color={"#fff"} />
            </NewArea>
          )}
        />
      </AreasSection>

      <FastTalkButton onPress={() => setFastTalkVisible(true)}>
        <FontAwesome name="microphone" size={24} color="#fff" />
        <TextFastTalk>Conversar</TextFastTalk>
      </FastTalkButton>
      <FastTalk visible={fastTalkVisible} setVisible={setFastTalkVisible} />
      {/* <ConfirmSpeakModal
        visible={confirmSpeakVisible}
        setVisible={setConfirmSpeakVisible}
      /> */}
    </Container>
  );
}
