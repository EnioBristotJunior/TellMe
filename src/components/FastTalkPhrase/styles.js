import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
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
  font-family: "Comfortaa_700Bold";
  font-size: 11px;
`;
