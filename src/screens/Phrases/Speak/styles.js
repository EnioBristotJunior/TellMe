import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.background};
  align-items: center;
  justify-content: space-between;
  padding: 25px;
`;

export const ArrowButton = styled.TouchableOpacity`
  position: absolute;
  top: 125px;
  left: 35px;
`;

export const Main = styled.View`
  margin-top: 120px;
  align-items: center;
  justify-content: center;
  gap: 30px;
`;

export const NumberTitle = styled.Text`
  font-size: 100px;
  font-family: "ComicNeue_700Bold";
  color: ${(props) => props.theme.secondBackground};
`;

export const Title = styled.Text`
  font-size: 50px;
  font-family: "ComicNeue_700Bold";
  color: ${(props) => props.theme.secondBackground};
  text-align: center;
`;

export const Content = styled.Text`
  font-size: 16px;
  font-family: "Comfortaa_400Regular";
  color: ${(props) => props.theme.color};
  max-width: 250px;
  text-align: center;
`;

export const Bottom = styled.View`
  flex-direction: row;
  gap: 10px;
`;

export const SpeakPhrase = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.secondBackground};
  width: 60%;
  height: 65px;
  align-items: center;
  justify-content: space-around;
  border-radius: 10px;
  flex-direction: row;
`;

export const SpeakPhraseText = styled.Text`
  font-size: 20px;
  font-family: "ComicNeue_700Bold";
  color: ${(props) => props.theme.color};
`;

export const EditButton = styled.TouchableOpacity`
  width: 20%;
  background-color: transparent;
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.secondBackground};
  height: 65px;
  align-items: center;
  justify-content: center;
`;

export const DeleteButton = styled.TouchableOpacity`
  width: 20%;
  background-color: transparent;
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.secondBackground};
  height: 65px;
  align-items: center;
  justify-content: center;
`;
