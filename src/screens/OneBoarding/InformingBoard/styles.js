import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.background};
`;

export const Main = styled.View`
  margin-top: 50px;
  flex: 1;
  padding: 25px;
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-family: "ComicNeue_700Bold";
  color: ${(props) => props.theme.color};
  text-align: center;
`;

export const InformSection = styled.View`
  gap: 40px;
`;

export const UserImageContainer = styled.View`
  gap: 12px;
  align-items: center;
`;

export const OptionalAlert = styled.Text`
  font-size: 14px;
  font-family: "ComicNeue_700Bold";
  color: ${(props) => props.theme.color};
  text-align: center;
`;

export const UserImage = styled.TouchableOpacity`
  width: 200px;
  height: 200px;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.secondBackground};
`;

export const UsernameContainer = styled.View`
  gap: 12px;
  width: 100%;
  align-items: flex-start;
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

export const RequiredAlert = styled.Text`
  font-size: 14px;
  font-family: "ComicNeue_700Bold";
  color: ${(props) => props.theme.secondBackground};
  text-align: center;
`;

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

export const ConfirmText = styled.Text`
  font-size: 20px;
  font-family: "ComicNeue_700Bold";
  color: ${(props) => props.theme.background};
`;
