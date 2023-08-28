import React, { useEffect } from "react";
import { View, Dimensions } from "react-native";

import { Container } from "./styles";

import BgSvg from "../../../imgs/Areas/backArea-g9.svg";

const { width, height } = Dimensions.get("screen");

export function NewArea({ navigation }) {
  useEffect(() => {
    navigation.getParent().setOptions({ tabBarStyle: { display: "none" } });
    return () => {
      navigation
        .getParent()
        .setOptions({
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
    </Container>
  );
}
