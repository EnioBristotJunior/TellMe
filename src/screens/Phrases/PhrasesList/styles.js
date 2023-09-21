import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.background};
`;

export const Main = styled.View`
  gap: 25px;
  margin-top: 40px;
  padding: 25px;
`;

export const Header = styled.View`
  gap: 10px;
`;

export const Title = styled.Text`
  font-size: 32px;
  font-family: "ComicNeue_700Bold";
  color: ${(props) => props.theme.color};
  max-width: 200px;
`;

export const ChangeView = styled.View`
  margin-top: 5px;
  width: 120px;
  height: 50px;
  border-radius: 15px;
  background-color: ${(props) => props.theme.secondBackground};
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export const PhrasesSection = styled.View``;

export const NewPhraseOne = styled.TouchableOpacity`
  width: 100%;
  height: 80px;
  border-radius: 12px;
  background-color: transparent;
  border-width: 2px;
  border-color: ${(props) => props.theme.secondBackground};
  align-items: center;
  justify-content: space-evenly;
  flex-direction: row;
`;

export const NewPhraseText = styled.Text`
  font-size: 20px;
  font-family: "ComicNeue_700Bold";
  color: ${(props) => props.theme.color};
`;
