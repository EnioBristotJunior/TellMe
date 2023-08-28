//React
import { React, useState } from "react";

//Realm
import { useApp } from "@realm/react";

//Estilos
import {
  Container,
  Main,
  Section,
  Title,
  Form,
  Input,
  NextContainer,
  SignIn,
} from "./styles";

//Imagens
import BgSvg from "../../../imgs/Cadastro/backCadastro-g9.svg";
import ArrowRight from "../../../imgs/components/arrow-right.svg";

//Icons
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

//Componentes
import { View, Dimensions, Text, TouchableOpacity } from "react-native";

//Mensagem Toast
import Toast from "react-native-toast-message";

//Dimensão da tela
const { width, height } = Dimensions.get("screen");

export function Cadastro({ navigation }) {
  //Estados
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  const [confirmSecureText, setConfirmSecureText] = useState(true);
  //Função do Realm
  const app = useApp();
  //Mensagem Toast - Campos incorretos
  const NeedCamps = () => {
    Toast.show({
      type: "authError",
      text1: "Preencha todos os campos!",
    });
  };

  //Mensagem Toast - Usuário cadastrado
  const Registred = () => {
    Toast.show({
      type: "newUser",
      text1: "Usuário cadastrado com sucesso",
    });
  };

  //Verificar se os campos estão vazios
  async function verification() {
    //Verificação de campos vazios
    if (confirmPassword != "" && email != "" && password != "") {
      //Verificação de email
      if (
        email.includes("@gmail.com") ||
        email.includes("@outlook.com") ||
        email.includes("@yahoo.com")
      ) {
        //Verificação de senha
        if (password == confirmPassword) {
          await register(email, password);
        } else {
          Toast.show({
            type: "authError",
            text1: "As senhas não coincidem",
          });
        }
      } else {
        Toast.show({
          type: "authError",
          text1: "Endereço de e-mail inválido!",
        });
      }
    } else {
      NeedCamps();
    }
  }

  //Função de cadastro
  async function register(email, password) {
    try {
      const algo = await app.emailPasswordAuth.registerUser({
        email,
        password,
      });
      console.log(algo);
      console.log(app.currentUser);
      Registred();
      setTimeout(() => navigation.navigate("login"), 2500);
    } catch (error) {
      console.log(error.message);
      if (error.message == "password must be between 6 and 128 characters") {
        Toast.show({
          type: "authError",
          text1: "A senha deve conter no mínimo 6 digitos!",
        });
      }
      if (error.message == "name already in use") {
        Toast.show({
          type: "authError",
          text1: "O email informado já está em uso!",
        });
      }
      if (error.message.includes("Network request failed")) {
        Toast.show({
          type: "authError",
          text1: "Sem conexão com internet!",
        });
      }
    }
  }

  return (
    <Container>
      <BgSvg
        width={width}
        height={height}
        style={{ position: "absolute", top: 0, left: 0, zIndex: -1 }}
      />
      <Main>
        <Title>Se junte a nós!</Title>
        <Section>
          <Form>
            <View>
              <Input
                placeholder="E-mail"
                placeholderTextColor={"#d9d9d9"}
                cursorColor={"#ff7f00"}
                onChangeText={setEmail}
                value={email}
              />
              <Ionicons
                name="mail"
                size={25}
                color={"#ff7f00"}
                style={{ position: "absolute", left: 14, top: 17 }}
              />
            </View>
            <View>
              <Input
                placeholder="Senha"
                placeholderTextColor={"#d9d9d9"}
                cursorColor={"#ff7f00"}
                onChangeText={setPassword}
                value={password}
                secureTextEntry={secureText}
              />
              <FontAwesome5
                name="lock"
                size={22}
                color={"#ff7f00"}
                style={{ position: "absolute", left: 17, top: 17 }}
              />
              {secureText ? (
                <TouchableOpacity
                  style={{ position: "absolute", right: 20, top: 17.5 }}
                  onPress={() => setSecureText(false)}
                >
                  <Ionicons name="eye" size={25} color={"#d9d9d9"} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{ position: "absolute", right: 20, top: 17.5 }}
                  onPress={() => setSecureText(true)}
                >
                  <Ionicons name="eye-off-outline" size={25} color={"#fff"} />
                </TouchableOpacity>
              )}
            </View>
            <View>
              <Input
                placeholder="Confirmar senha"
                placeholderTextColor={"#d9d9d9"}
                cursorColor={"#ff7f00"}
                onChangeText={setConfirmPassword}
                value={confirmPassword}
                secureTextEntry={confirmSecureText}
              />
              <FontAwesome5
                name="lock"
                size={22}
                color={"#ff7f00"}
                style={{ position: "absolute", left: 17, top: 17 }}
              />
              {confirmSecureText ? (
                <TouchableOpacity
                  style={{ position: "absolute", right: 20, top: 17.5 }}
                  onPress={() => setConfirmSecureText(false)}
                >
                  <Ionicons name="eye" size={25} color={"#d9d9d9"} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{ position: "absolute", right: 20, top: 17.5 }}
                  onPress={() => setConfirmSecureText(true)}
                >
                  <Ionicons name="eye-off-outline" size={25} color={"#fff"} />
                </TouchableOpacity>
              )}
            </View>
          </Form>
          <NextContainer>
            <Title>Cadastrar</Title>
            <TouchableOpacity onPress={() => navigation.navigate("login")}>
              <SignIn>Já tem uma conta?</SignIn>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => verification()}
              style={{ position: "absolute", right: -40, bottom: 100 }}
            >
              <ArrowRight color={"#fff"} width={50} height={35} />
            </TouchableOpacity>
          </NextContainer>
        </Section>
      </Main>
    </Container>
  );
}
