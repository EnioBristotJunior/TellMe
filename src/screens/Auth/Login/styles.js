import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.background};
`;

export const Main = styled.View`
  flex: 1;
  justify-content: center;
  align-items: flex-start;
  padding-left: 40px;
  margin-top: -20%;
  gap: 50px;
`;

export const Title = styled.Text`
  font-size: 40px;
  font-family: "ComicNeue_700Bold";
  color: ${props => props.theme.color};
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
  border: 1px solid ${props => props.theme.secondBackground};
  padding-left: 50px;
  color: ${props => props.theme.color};
  font-family: "Comfortaa_500Medium";
`;

export const ForgotPassword = styled.Text`
  font-size: 14px;
  color: ${props => props.theme.secondBackground};
  font-family: "Comfortaa_700Bold";
`;

export const NextContainer = styled.View`
  flex-direction: row;
  width: 70%;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  left: 40px;
  bottom: 160px;
`;

export const SignUpContainer = styled.View``;

export const SignUp = styled.Text`
  font-size: 16px;
  color: ${props => props.theme.color};
  font-family: "Comfortaa_700Bold";
`;
