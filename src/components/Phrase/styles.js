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
  max-height: 20px;
`;

//Exibição Grid

export const GridContainer = styled.TouchableOpacity`
  flex: 1;
  height: 150px;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  background-color: ${(props) => props.theme.secondBackground};
`;

export const HeaderCard = styled.View`
  align-items: center;
  flex: 1;
  gap: 10px;
  padding-top: 5px;
  flex-direction: row;
  width: 100%;
  padding-left: 25px;
  padding-right: 25px;
`;

export const GridNumber = styled.Text`
  font-size: 30px;
  color: ${(props) => props.theme.background};
  font-family: "ComicNeue_700Bold";
`;

export const GridTitle = styled.Text`
  font-size: 20px;
  color: ${(props) => props.theme.background};
  font-family: "ComicNeue_700Bold";
`;

export const GridContentView = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.color};
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-left: 5px;
  padding-right: 5px;
`;

export const GridContent = styled.Text`
  font-size: 12px;
  font-family: "Comfortaa_600SemiBold";
  color: ${(props) => props.theme.background};
  text-align: center;
`;
