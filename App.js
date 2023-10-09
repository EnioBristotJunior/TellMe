//React
import { useEffect } from "react";
//Realm
import { UserProvider, AppProvider } from "@realm/react";
import { RealmProvider } from "./src/databases";
//Rotas
import { MainRoutes } from "./src/routes/main.routes";
import { AuthRoutes } from "./src/routes/auth.routes";

//Tema
import { ThemeProvider } from "styled-components/native";
import theme from "./src/theme";

//Barra de navegação
import * as NavigationBar from "expo-navigation-bar";

//Fontes
import {
  useFonts,
  Comfortaa_300Light,
  Comfortaa_400Regular,
  Comfortaa_500Medium,
  Comfortaa_600SemiBold,
  Comfortaa_700Bold,
} from "@expo-google-fonts/comfortaa";
import {
  ComicNeue_300Light,
  ComicNeue_400Regular,
  ComicNeue_700Bold,
} from "@expo-google-fonts/comic-neue";

//Barra de Status
import { StatusBar, View, Text } from "react-native";

//Navegação
import { NavigationContainer } from "@react-navigation/native";

//Icons
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

//Configuração da mensagem Toast
import Toast from "react-native-toast-message";
import { OneBoardingProvider } from "./src/context/oneboardingContext";

const config = {
  authError: ({ text1, props }) => (
    <View
      style={{
        height: 60,
        width: "80%",
        backgroundColor: "#ef233c",
        borderRadius: 12,
        padding: 20,
        flexDirection: "row",
        gap: 10,
        elevation: 1,
        marginTop: 25,
      }}
    >
      <FontAwesome5 name="exclamation-circle" size={19} color={"#fff"} />
      <Text
        style={{
          fontFamily: "Comfortaa_600SemiBold",
          color: "#fff",
          fontSize: 12,
        }}
      >
        {text1}
      </Text>
      <Text>{props.uuid}</Text>
    </View>
  ),
  newUser: ({ text1, props }) => (
    <View
      style={{
        height: 60,
        width: "80%",
        backgroundColor: "#091837",
        borderRadius: 15,
        padding: 20,
        flexDirection: "row",
        gap: 10,
        elevation: 1,
        marginTop: 25,
      }}
    >
      <FontAwesome5 name="user-plus" size={19} color={"#fff"} />
      <View>
        <Text
          style={{
            fontFamily: "Comfortaa_600SemiBold",
            color: "#fff",
            fontSize: 12,
          }}
        >
          {text1}
        </Text>
        <Text>{props.uuid}</Text>
      </View>
    </View>
  ),
  loggedUser: ({ text1, props }) => (
    <View
      style={{
        height: 60,
        width: "80%",
        backgroundColor: "#FF7F00",
        borderRadius: 15,
        padding: 20,
        flexDirection: "row",
        gap: 10,
        elevation: 1,
        marginTop: 25,
      }}
    >
      <FontAwesome5 name="user-check" size={19} color={"#fff"} />
      <View>
        <Text
          style={{
            fontFamily: "Comfortaa_600SemiBold",
            color: "#fff",
            fontSize: 12,
          }}
        >
          {text1}
        </Text>
        <Text>{props.uuid}</Text>
      </View>
    </View>
  ),
  newArea: ({ text1, props }) => (
    <View
      style={{
        height: 60,
        width: "80%",
        backgroundColor: "#FF7F00",
        borderRadius: 15,
        padding: 20,
        flexDirection: "row",
        gap: 10,
        elevation: 1,
        marginTop: 25,
      }}
    >
      <MaterialIcons name="playlist-add-check" size={19} color={"#fff"} />
      <View>
        <Text
          style={{
            fontFamily: "Comfortaa_600SemiBold",
            color: "#fff",
            fontSize: 12,
          }}
        >
          {text1}
        </Text>
        <Text>{props.uuid}</Text>
      </View>
    </View>
  ),
  appError: ({ text1, props }) => (
    <View
      style={{
        height: 60,
        width: "80%",
        backgroundColor: "#ef233c",
        borderRadius: 12,
        padding: 20,
        flexDirection: "row",
        gap: 10,
        marginTop: 25,
        elevation: 1,
      }}
    >
      <FontAwesome5 name="exclamation-circle" size={19} color={"#fff"} />
      <Text
        style={{
          fontFamily: "Comfortaa_600SemiBold",
          color: "#fff",
          fontSize: 12,
        }}
      >
        {text1}
      </Text>
      <Text>{props.uuid}</Text>
    </View>
  ),
  appChecked: ({ text1, props }) => (
    <View
      style={{
        height: 60,
        width: "80%",
        backgroundColor: "#FF7F00",
        borderRadius: 12,
        padding: 20,
        flexDirection: "row",
        gap: 10,
        elevation: 1,
        marginTop: 25,
      }}
    >
      <FontAwesome5 name="check" size={19} color={"#fff"} />
      <Text
        style={{
          fontFamily: "Comfortaa_600SemiBold",
          color: "#fff",
          fontSize: 12,
        }}
      >
        {text1}
      </Text>
      <Text>{props.uuid}</Text>
    </View>
  ),
  speaking: ({ text1, props }) => (
    <View
      style={{
        height: 60,
        width: "80%",
        backgroundColor: "#FF7F00",
        borderRadius: 12,
        padding: 20,
        flexDirection: "row",
        gap: 10,
        elevation: 1,
        marginTop: 25,
      }}
    >
      <MaterialIcons name="multitrack-audio" size={22} color={"#fff"} />
      <Text
        style={{
          fontFamily: "Comfortaa_600SemiBold",
          color: "#fff",
          fontSize: 12,
        }}
      >
        {text1}
      </Text>
      <Text>{props.uuid}</Text>
    </View>
  ),
};

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

export default function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyBJ5EzdEDIMDplmmyK7gNAwOuuy8JpzlYA",
    authDomain: "tell-me-b538b.firebaseapp.com",
    projectId: "tell-me-b538b",
    storageBucket: "tell-me-b538b.appspot.com",
    messagingSenderId: "702112593656",
    appId: "1:702112593656:web:e5af203d71762b7c822d0d",
    measurementId: "G-0V2J94X9F7",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // const analytics = getAnalytics(app);

  //Loading das fontes
  let [fontsLoaded, fontError] = useFonts({
    Comfortaa_300Light,
    Comfortaa_400Regular,
    Comfortaa_500Medium,
    Comfortaa_600SemiBold,
    Comfortaa_700Bold,
    ComicNeue_300Light,
    ComicNeue_400Regular,
    ComicNeue_700Bold,
  });

  //Configuração da cor da barra de navegação
  useEffect(() => {
    NavigationBar.setBackgroundColorAsync(theme.background);
  }, []);
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <OneBoardingProvider>
      <NavigationContainer>
        <ThemeProvider theme={theme}>
          <StatusBar
            backgroundColor="transparent"
            translucent
            style="light-content"
          />
          <AppProvider id={"application-0-hfxgp"}>
            <UserProvider fallback={<AuthRoutes />}>
              <RealmProvider deleteRealmIfMigrationNeeded={true}>
                <MainRoutes />
              </RealmProvider>
            </UserProvider>
          </AppProvider>
        </ThemeProvider>
        <Toast config={config} />
      </NavigationContainer>
    </OneBoardingProvider>
  );
}
