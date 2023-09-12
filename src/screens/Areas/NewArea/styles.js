import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  z-index: 1;
  background-color: ${(props) => props.theme.background};
  padding: 25px;
  justify-content: space-between;
`;

export const Main = styled.View`
  gap: 25px;
  margin-top: 40px;
`;

export const Header = styled.View`
  gap: 10px;
`;

export const Form = styled.View`
  gap: 15px;
`;

export const Title = styled.Text`
  font-size: 32px;
  font-family: "ComicNeue_700Bold";
  color: ${(props) => props.theme.color};
`;

//Forms

export const SelectImage = styled.TouchableOpacity`
  width: 100%;
  height: 200px;
  background-color: ${(props) => props.theme.secondBackground};
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export const TextImage = styled.Text`
  font-size: 16px;
  font-family: "Comfortaa_700Bold";
  color: ${(props) => props.theme.background};
`;

export const Input = styled.TextInput`
  background-color: transparent;
  width: 100%;
  height: 65px;
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.secondBackground};
  padding-left: 25px;
  padding-right: 25px;
  color: ${(props) => props.theme.color};
  font-family: "Comfortaa_500Medium";
`;

export const AlertView = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 5px;
`;

export const TextAlert = styled.Text`
  font-size: 13px;
  font-family: "Comfortaa_700Bold";
  color: ${(props) => props.theme.secondBackground};
`;

//Botão de confirmar

export const Bottom = styled.View``;

export const Confirm = styled.TouchableOpacity`
  width: 100%;
  height: 65px;
  background-color: ${(props) => props.theme.secondBackground};
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  margin-bottom: 12px;
`;

export const TextButton = styled.Text`
  font-size: 20px;
  font-family: "ComicNeue_700Bold";
  color: ${(props) => props.theme.background};
`;
