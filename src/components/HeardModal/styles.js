import styled from "styled-components/native";

export const Container = styled.View`
  background-color: ${(props) => props.theme.color};
  z-index: 2;
  width: 325px;
  height: 500px;
  border-radius: 20px;
  position: absolute;
  align-self: center;
  top: 175px;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

export const TapClose = styled.TouchableOpacity`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  background-color: ${(props) => props.theme.background};
  opacity: 0.4;
`;

export const Title = styled.Text`
  color: ${(props) => props.theme.secondBackground};
  font-size: 28px;
  font-family: "ComicNeue_700Bold";
  text-align: center;
`;

export const HearAgain = styled.TouchableOpacity`
  width: 100%;
  height: 65px;
  align-items: center;
  justify-content: space-evenly;
  background-color: ${(props) => props.theme.secondBackground};
  border-radius: 15px;
  flex-direction: row;
`;

export const HeardText = styled.Text`
  color: ${(props) => props.theme.background};
  font-size: 18px;
  font-family: "Comfortaa_400Regular";
  text-align: center;
`;

export const TextButton = styled.Text`
  color: ${(props) => props.theme.background};
  font-size: 20px;
  font-family: "ComicNeue_700Bold";
`;
