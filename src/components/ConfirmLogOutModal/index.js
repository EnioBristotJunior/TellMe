import React from 'react';
import { Modal } from 'react-native';
import { Container, TapClose, Title, Operators, CancelButton, TextButton, ConfirmButton } from './styles';
import { useUser } from '@realm/react';
import Toast from "react-native-toast-message";

export function ConfirmLogOutModal({visible, setVisible}) {

    const user = useUser();

    //Sair da conta
  function logout() {
    try {
      user.logOut();
      Toast.show({
        type: "appChecked",
        text1: "Sessão encerrada com sucesso!",
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <TapClose onPress={() => setVisible(false)} />
      <Container>
        <Title>
            Deseja sair de sua conta?
        </Title>
        <Operators>
          <CancelButton onPress={() => setVisible(false)}>
            <TextButton>Cancelar</TextButton>
          </CancelButton>
          <ConfirmButton onPress={logout}>
            <TextButton>Confirmar</TextButton>
          </ConfirmButton>
        </Operators>
      </Container>
    </Modal>
  );
}