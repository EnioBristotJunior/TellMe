//React
import React, { useEffect, useState } from "react";
import { Container, Header, Main, Title, ChangeView } from './styles';
import { Dimensions, View, TouchableOpacity } from 'react-native';

//Realm
import { useRealm, useObject } from "../../../databases";
import { AreaSchema } from "../../../databases/schemas/AreaSchema";

//Navegação
import { useRoute } from "@react-navigation/native";

import BgSvg from "../../../imgs/Phrases/backPhrase-g9.svg";

//Icons
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";


const { width, height } = Dimensions.get("screen");


export function PhrasesList({navigation}) {
    //Parametros
    const route = useRoute();
    const { id } = route.params;
    //Realm
    const realm = useRealm();
    const area = id ? useObject(AreaSchema, id) : undefined;

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
          borderRadius: 30,
          left: 40,
          borderTopWidth: 0,
        },
      });
    };
  }, []);

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
                  borderRadius: 30,
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
            <TouchableOpacity >
                <FontAwesome5 name="grip-lines" size={25} color={"#091837"} />
            </TouchableOpacity>
            <TouchableOpacity>
                <Ionicons name="grid" size={25} color={"#091837"} />
            </TouchableOpacity>
          </ChangeView>
        </Header>
      </Main>
      
    </Container>
  );
}