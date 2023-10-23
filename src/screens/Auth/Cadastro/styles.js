import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.background};
`;

export const Main = styled.View`
  flex: 1;
  gap: 160px;
  align-items: flex-start;
  padding-left: 40px;
  margin-top: 40%;
`;

export const Section = styled.View`
  gap: 110px;
`;

export const Title = styled.Text`
  font-size: 40px;
  font-family: "ComicNeue_700Bold";
  color: ${(props) => props.theme.color};
  width: 200px;
`;

export const Form = styled.View`
  gap: 25px;
`;

export const Input = styled.TextInput`
  background-color: transparent;
  width: 300px;
  height: 60px;
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.secondBackground};
  padding-left: 50px;
  color: ${(props) => props.theme.color};
  font-family: "Comfortaa_500Medium";
`;

export const NextContainer = styled.View`
  gap: 70px;
  flex-direction: row;
`;

export const SignIn = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.color};
  font-family: "Comfortaa_700Bold";
`;
