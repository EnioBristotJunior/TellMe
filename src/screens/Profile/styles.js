import styled from "styled-components/native";

//Tudo

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.background};
`;

export const Main = styled.View`
  padding: 25px;
  flex: 1;
  gap: 25px;
`;

//Informações do usuário

export const Header = styled.View`
  align-items: center;
  gap: 20px;
  flex: 1;
  margin-top: 90px;
`;

export const UserImage = styled.View`
  background-color: ${(props) => props.theme.background};
  width: 150px;
  height: 150px;
  border-radius: 12px;
`;

export const UserName = styled.Text`
  color: ${(props) => props.theme.background};
  font-size: 24px;
  font-family: "ComicNeue_700Bold";
`;

export const UserEmail = styled.Text`
  color: ${(props) => props.theme.color};
  font-size: 13px;
  font-family: "Comfortaa_500Medium";
`;

export const UserContent = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 25px;
  margin-top: 12px;
`;

export const ContentView = styled.View`
  background-color: ${(props) => props.theme.background};
  width: 150px;
  height: 100px;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
`;

export const NumberContent = styled.Text`
  color: ${(props) => props.theme.color};
  font-size: 40px;
  font-family: "ComicNeue_700Bold";
`;

export const TextContent = styled.Text`
  color: ${(props) => props.theme.color};
  font-size: 20px;
  font-family: "ComicNeue_700Bold";
`;

//Opções

export const OptionsContainer = styled.View`
  flex: 1;
  gap: 15px;
`;

export const OptionsTitle = styled.Text`
  color: ${(props) => props.theme.color};
  font-size: 20px;
  font-family: "ComicNeue_700Bold";
`;

export const Option = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.color};
  width: 100%;
  height: 70px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 25px;
  padding-right: 25px;
  border-radius: 10px;
`;

export const OptionText = styled.Text`
  color: ${(props) => props.theme.background};
  font-size: 16px;
  font-family: "Comfortaa_700Bold";
`;

export const OptionIcon = styled.View`
  width: 32px;
  height: 32px;
  background-color: ${(props) => props.theme.background};
  border-radius: 32px;
  align-items: center;
  justify-content: center;
`;
