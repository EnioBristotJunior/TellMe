import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
  flex: 1;
  width: 100%;
  height: 80px;
  border-radius: 12px;
  margin-bottom: 15px;
  flex-direction: row;
  align-items: center;
  gap: 15px;
  background-color: ${(props) => props.theme.color};
  padding-left: 25px;
`;

export const Number = styled.Text`
  font-size: 30px;
  color: ${(props) => props.theme.secondBackground};
  font-family: "ComicNeue_700Bold";
`;

export const Title = styled.Text`
  font-size: 20px;
  color: ${(props) => props.theme.secondBackground};
  font-family: "ComicNeue_700Bold";
`;

export const Content = styled.Text`
  font-size: 12px;
  font-family: "Comfortaa_600SemiBold";
  color: ${(props) => props.theme.background};
`;
