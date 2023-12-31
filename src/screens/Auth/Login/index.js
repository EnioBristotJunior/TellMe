//React
import { React, useState, useContext } from "react";

//Realm
import Realm from "realm";
import { useApp } from "@realm/react";
//Estilos
import {
  Container,
  Main,
  Title,
  Form,
  Input,
  ForgotPassword,
  NextContainer,
  SignUp,
} from "./styles";

//Imagens
import BgSvg from "../../../imgs/Login/backLogin-g9.svg";
import ArrowRight from "../../../imgs/components/arrow-right.svg";

//Componentes
import { Dimensions, StatusBar, TouchableOpacity, View } from "react-native";

//Icons
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

//Mensagem Toast
import Toast from "react-native-toast-message";

//Contexto
import { OneBoardingContext } from "../../../context/oneboardingContext";

//Funções de acesso ao storage
import { getOneboarding, setOneboarding } from "../../../storage";

//Dimensão da tela
const { width, height } = Dimensions.get("screen");

export function Login({ navigation }) {
  const { setUserPasswordPreview } = useContext(OneBoardingContext);

  //Estados
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  //Função do Realm
  const app = useApp();
  //Mensagem Toast de erro
  const NeedCamps = () => {
    Toast.show({
      type: "authError",
      text1: "Preencha todos os campos!",
    });
  };

  const Logged = () => {
    Toast.show({
      type: "loggedUser",
      text1: "Sessão iniciada com sucesso!",
    });
  };

  //Verificar se os campos estãos vazios
  function verification() {
    if (email != "" && password != "") {
      if (
        email.includes("@gmail.com") ||
        email.includes("@outlook.com") ||
        email.includes("@yahoo.com")
      ) {
        register(email, password);
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
  //Função de login
  async function register(email, password) {
    try {
      await app.logIn(Realm.Credentials.emailPassword(email, password));
      setUserPasswordPreview(password);
      Logged();
    } catch (error) {
      if (error.message.includes("invalid username/password")) {
        Toast.show({
          type: "authError",
          text1: "E-mail ou senha incorretos!",
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
        <Title>Bem-vindo de volta!</Title>
        <Form>
          <View>
            <Input
              placeholder="E-mail"
              placeholderTextColor={"#d9d9d9"}
              cursorColor={"#ff7f00"}
              onChangeText={setEmail}
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
        </Form>
        <NextContainer>
          <Title>Login</Title>
          <TouchableOpacity onPress={() => verification()}>
            <ArrowRight color={"#fff"} width={50} height={35} />
          </TouchableOpacity>
        </NextContainer>
        <TouchableOpacity
          onPress={() => navigation.navigate("cadastro")}
          style={{ position: "absolute", left: 40, bottom: 50 }}
        >
          <SignUp>Não é cadastrado?</SignUp>
        </TouchableOpacity>
      </Main>
    </Container>
  );
}
