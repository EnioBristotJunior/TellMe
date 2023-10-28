import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: ${(props) => props.theme.background};
  z-index: 2;
  width: 300px;
  height: 250px;
  border-radius: 20px;
  position: absolute;
  align-self: center;
  top: 300px;
  align-items: center;
  justify-content: space-between;
  padding: 50px 10px 10px 10px;
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
  opacity: 0.15;
`;

export const Title = styled.Text`
  color: ${(props) => props.theme.color};
  font-size: 22px;
  font-family: "ComicNeue_700Bold";
  text-align: center;
`;

export const PhraseTitle = styled.Text`
  color: ${(props) => props.theme.secondBackground};
  font-size: 20px;
  font-family: "ComicNeue_700Bold";
  text-align: center;
`;

export const Operators = styled.View`
  width: 100%;
  gap: 5px;
`;

export const CancelButton = styled.TouchableOpacity`
  width: 100%;
  height: 60px;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-color: ${(props) => props.theme.secondBackground};
  border-radius: 10px;
`;

export const ConfirmButton = styled.TouchableOpacity`
  width: 100%;
  height: 60px;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.secondBackground};
  border-radius: 10px;
`;

export const TextButton = styled.Text`
  color: ${(props) => props.theme.color};
  font-size: 18px;
  font-family: "ComicNeue_700Bold";
  text-align: center;
`;