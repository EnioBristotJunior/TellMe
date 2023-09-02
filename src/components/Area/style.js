import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
  flex: 1;
  width: 180px;
  height: 130px;
  background-color: ${(props) => props.theme.secondBackground};
  border-radius: 15px;
  margin-bottom: 15px;
  position: relative;
`;

export const Content = styled.View`
  flex: 1;
  padding: 20px;
  flex-direction: row;
  align-items: flex-end;
  gap: 10px;
  justify-content: space-between;
`;

export const TextArea = styled.Text`
  font-size: 22px;
  color: ${(props) => props.theme.color};
  font-family: "ComicNeue_700Bold";
  align-self: flex-start;
`;
