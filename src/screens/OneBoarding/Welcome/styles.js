import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.background};
  align-items: center;
`;

export const Main = styled.View`
  margin-top: 120%;
  flex: 1;
  gap: 20px;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 40px;
  font-family: "ComicNeue_700Bold";
  color: ${(props) => props.theme.color};
  max-width: 200px;
`;

export const Content = styled.Text`
  font-size: 20px;
  font-family: "ComicNeue_700Bold";
  color: ${(props) => props.theme.color};
  text-align: center;
  max-width: 300px;
`;

export const Bottom = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px 30px 20px 30px;
`;

export const NextText = styled.Text`
  font-size: 32px;
  font-family: "ComicNeue_700Bold";
  color: ${(props) => props.theme.color};
`;
