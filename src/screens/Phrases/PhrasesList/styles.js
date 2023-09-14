import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.background};
`;

export const Main = styled.View`
  gap: 25px;
  margin-top: 40px;
  padding: 25px;
`;

export const Header = styled.View`
gap: 10px;`;

export const Title = styled.Text`
  font-size: 32px;
  font-family: "ComicNeue_700Bold";
  color: ${(props) => props.theme.color};
  max-width: 200px;
`;

export const ChangeView = styled.View`
width: 120px;
height: 50px;
border-radius: 15px;
background-color:  ${props => props.theme.color};
flex-direction: row;
align-items: center;
justify-content: space-around;
`;

