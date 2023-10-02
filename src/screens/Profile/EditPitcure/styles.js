import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.background};
  padding: 25px;
  justify-content: space-between;
`;

export const Main = styled.View`
  gap: 10px;
  align-items: center;
`;

export const Header = styled.View`
  gap: 10px;
  margin-top: 40px;
`;

export const Title = styled.Text`
  font-size: 32px;
  font-family: "ComicNeue_700Bold";
  color: ${(props) => props.theme.color};
`;

//Photo

export const UserImage = styled.View`
  background-color: ${(props) => props.theme.background};
  width: 150px;
  height: 150px;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
`;

export const ChangePicture = styled.TouchableOpacity`
  background-color: transparent;
  width: 150px;
  height: 60px;
  border-radius: 10px;
  border: 1px solid #fff;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const DeletePicture = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.background};
  width: 150px;
  height: 60px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const ChangePictureText = styled.Text`
  font-size: 20px;
  font-family: "ComicNeue_700Bold";
  color: ${(props) => props.theme.color};
`;
//Bottom

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
