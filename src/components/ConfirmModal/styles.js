import styled from "styled-components/native";

export const Container = styled.View`
  background-color: ${(props) => props.theme.background};
  z-index: 2;
  width: 320px;
  height: 400px;
  border-radius: 20px;
  position: absolute;
  align-self: center;
  top: 200px;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
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

export const Title = styled.Text`
  color: ${(props) => props.theme.color};
  font-size: 17px;
  font-family: "Comfortaa_500Medium";
  text-align: center;
`;

export const Area = styled.View`
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export const AreaTitle = styled.Text`
  color: ${(props) => props.theme.secondBackground};
  font-size: 26px;
  font-family: "ComicNeue_700Bold";
  text-align: center;
`;

export const PhraseNumber = styled.Text`
  color: ${(props) => props.theme.color};
  font-size: 14px;
  font-family: "Comfortaa_700Bold";
  text-align: center;
`;

export const Bottom = styled.View`
  width: 100%;
  gap: 8px;
`;

export const AlertView = styled.View`
  align-items: center;
`;

export const TextAlert = styled.Text`
  font-size: 12px;
  font-family: "Comfortaa_700Bold";
  color: ${(props) => props.theme.secondBackground};
  text-align: center;
`;

export const Confirm = styled.TouchableOpacity`
  width: 100%;
  height: 60px;
  background-color: ${(props) => props.theme.secondBackground};
  border-radius: 12px;
  align-items: center;
  justify-content: center;
`;

export const Cancel = styled.TouchableOpacity`
  width: 100%;
  height: 60px;
  background-color: transparent;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  border-width: 1.5px;
  border-color: ${(props) => props.theme.secondBackground};
`;

export const TextButton = styled.Text`
  color: ${(props) => props.theme.color};
  font-size: 18px;
  font-family: "ComicNeue_700Bold";
  text-align: center;
`;
