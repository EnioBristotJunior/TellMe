//React
import React, { useState, useEffect } from "react";

//Componentes
import { View, Dimensions } from "react-native";

//Estilizições
import {
  Container,
  FastTalk,
  Header,
  TextFastTalk,
  Title,
  NewArea,
  AreasSection,
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
import { Area } from "../../components/Area";

//Dimensão da tela
const { width, height } = Dimensions.get("screen");

export function Home({ navigation }) {
  //Estados
  const [userAreas, setUserAreas] = useState([]);
  const [areas, setAreas] = useState([]);

  //Realm
  const realm = useRealm();
  const user = useUser();
  const areaQuery = useQuery(AreaSchema);

  // areas.forEach((value, i, array) => {
  //   if (areas[i].userId == user.id) {
  //     setUserAreas(areas[i]);
  //   }
  // });

  //Sair da conta
  function logout() {
    user.logOut();
  }

  //Lista de Áreas
  async function fetchAreas() {
    const response = areaQuery.toJSON();
    const filt = (registro) => registro.userId == user.id;
    let result = response.filter(filt);
    setAreas(result);
    console.log(result);
  }

  useEffect(() => {
    fetchAreas();
  }, []);

  useEffect(() => {
    realm.addListener("change", fetchAreas);

    return () => realm.removeListener("change", fetchAreas);
  }, []);

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
          style={{ maxHeight: 610, marginBottom: 10 }}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <Area
              title={item.title}
              press={() => console.log("clicado")}
              icon={() => navigation.navigate("editArea")}
            />
          )}
          ListFooterComponent={() => (
            <NewArea onPress={() => navigation.navigate("newArea")}>
              <FontAwesome5 name="plus" size={45} color={"#fff"} />
            </NewArea>
          )}
        />
      </AreasSection>

      <FastTalk onPress={() => logout()}>
        <FontAwesome name="microphone" size={24} color="#fff" />
        <TextFastTalk>Conversar</TextFastTalk>
      </FastTalk>
    </Container>
  );
}
