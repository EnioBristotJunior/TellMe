import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.background};
`;

export const Header = styled.View`
align-items: flex-start;
padding-left: 25px;
justify-content: center;
flex: 0.2;
`;

export const Title = styled.Text`
font-size: 36px;
font-family: 'ComicNeue_700Bold';
color: ${props => props.theme.color};
`;


export const FastTalk = styled.TouchableOpacity`
width: 200px;
height: 55px;
border-radius: 20px;
flex-direction: row;
position: absolute;
right: 50px;
bottom: 140px;
background-color:transparent;
border-color: ${props =>  props.theme.secondBackground};
border-width: 2px;
align-items: center;
justify-content: space-evenly;
`;

export const TextFastTalk = styled.Text`
color: ${props =>  props.theme.color};
font-size: 20px;
font-family: "ComicNeue_700Bold";
`;
