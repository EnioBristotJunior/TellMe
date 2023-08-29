import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
  flex: 1;
  width: 180px;
  height: 140px;
  background-color: ${(props) => props.theme.secondBackground};
  border-radius: 15px;
  flex-direction: row;
  align-items: flex-end;
  gap: 10px;
  margin-bottom: 15px;
  padding: 20px;
  justify-content: space-between;
`;

export const TextArea = styled.Text`
  font-size: 22px;
  color: ${(props) => props.theme.color};
  font-family: "ComicNeue_700Bold";
  align-self: flex-start;
`;
