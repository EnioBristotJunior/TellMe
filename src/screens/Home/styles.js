import styled from "styled-components/native";

//Tudo

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.background};
  gap: 20px;
  padding: 25px;
`;

//Header
export const Header = styled.View`
  align-items: flex-start;
  justify-content: center;
  margin-top: 50px;
`;

export const Title = styled.Text`
  font-size: 36px;
  font-family: "ComicNeue_700Bold";
  color: ${(props) => props.theme.color};
`;

//Areas

export const AreasSection = styled.View``;

export const NewArea = styled.TouchableOpacity`
  width: 100%;
  height: 140px;
  border-radius: 15px;
  background-color: transparent;
  align-items: center;
  justify-content: center;
  opacity: 0.8;
  align-self: center;
  border-width: 2px;
  border-color: ${(props) => props.theme.secondBackground};
`;

//FastTalk
export const FastTalk = styled.TouchableOpacity`
  width: 200px;
  height: 55px;
  border-radius: 20px;
  flex-direction: row;
  position: absolute;
  left: 50px;
  bottom: 110px;
  z-index: 1;
  background-color: ${(props) => props.theme.background};
  border-color: ${(props) => props.theme.secondBackground};
  border-width: 2px;
  align-items: center;
  justify-content: space-evenly;
  display: none;
`;

export const TextFastTalk = styled.Text`
  color: ${(props) => props.theme.color};
  font-size: 20px;
  font-family: "ComicNeue_700Bold";
`;
