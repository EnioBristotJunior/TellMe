import styled from "styled-components/native";

export const Container = styled.View`
  background-color: ${(props) => props.theme.background};
  z-index: 2;
  width: 300px;
  height: 400px;
  border-radius: 20px;
  position: absolute;
  align-self: center;
  top: 200px;
  padding: 20px;
  gap: 15px;
  /* border-width: 1px;
  border-color: ${(props) => props.theme.secondBackground}; */
`;

export const TapClose = styled.TouchableOpacity`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  background-color: ${(props) => props.theme.secondBackground};
  opacity: 0.13;
`;

export const Input = styled.TextInput`
  background-color: transparent;
  width: 100%;
  height: 60px;
  border-radius: 12px;
  border-width: 1px;
  border-color: ${(props) => props.theme.secondBackground};
  padding: 0px 20px 0px 20px;
  color: ${(props) => props.theme.color};
  font-family: "Comfortaa_500Medium";
  font-size: 12px;
`;

export const RecentlyText = styled.Text`
  color: ${(props) => props.theme.color};
  font-family: "ComicNeue_700Bold";
  font-size: 18px;
`;

export const PhrasesSection = styled.View`
  gap: 15px;
`;

export const PhraseContainer = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.secondBackground};
  width: 100%;
  height: 60px;
  border-radius: 12px;
  margin-bottom: 10px;
  flex-direction: row;
  align-items: center;
  padding: 0px 20px 0px 20px;
  gap: 10px;
`;

export const PhraseNumber = styled.Text`
  color: ${(props) => props.theme.color};
  font-family: "ComicNeue_700Bold";
  font-size: 26px;
`;

export const PhraseText = styled.Text`
  color: ${(props) => props.theme.color};
  font-family: "ComicNeue_700Bold";
  font-size: 18px;
`;

export const AreaName = styled.Text`
  color: ${(props) => props.theme.background};
  font-family: "Comfortaa_500Medium";
  font-size: 10px;
`;
