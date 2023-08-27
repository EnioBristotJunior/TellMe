import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.background};
`;

export const ListenContainer = styled.View`
position: absolute;
top: 60%;
left: 0;
right: 0;
align-items: center;
`;

export const ListeningContainer = styled.View`
position: absolute;
top: 55%;
left: 0;
right: 0;
align-items: center;
gap: 20px;

`;

export const Microphone = styled.View`
position: absolute;
top: 32.5%;
left: 0;
right: 0;
align-items: center;
`;

export const Listen = styled.TouchableOpacity`
width: 150px;
height: 65px;
background-color: ${props => props.theme.secondBackground};
border-radius: 20px;
align-items: center;
justify-content: center;
`;

export const TextButton = styled.Text`
color: ${props => props.theme.color};
font-size: 21px;
font-family: 'ComicNeue_700Bold';
`;


export const Listening = styled.TouchableOpacity`
height: 80px;
width: 80px;
border-radius: 50px;
align-items: center;
justify-content: center;
background-color:transparent;
border-color: ${props =>  props.theme.secondBackground};
border-width: 3px;
`;



export const Timer = styled.Text`
color: ${props => props.theme.color};
font-size: 50px;
font-family: 'ComicNeue_700Bold';
`;
