import React from "react";
import { View, Dimensions } from "react-native";
import { Container } from "./styles";

import BgSvg from "../../imgs/Profile/backProfile-g9.svg";

const { width, height } = Dimensions.get("screen");

export function Profile() {
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
