import Voice from "@react-native-voice/voice/";

import React, { useEffect, useState } from "react";
import { View, Dimensions } from "react-native";
import {
  Container,
  Listen,
  ListenContainer,
  Listening,
  ListeningContainer,
  Microphone,
  TextButton,
  Timer,
} from "./styles";

import BgSvg from "../../imgs/Hearing/backHearing-g9.svg";

import { FontAwesome } from "@expo/vector-icons";
import { HeardModal } from "../../components/HeardModal";

const { width, height } = Dimensions.get("screen");

export function Hearing() {
  const [timer, SetTimer] = useState(0);
  const [visible, setVisible] = useState(false);

  // jeito 1
  const [listening, setListening] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    Voice.onSpeechStart = OnSpeechStartHandler;
    Voice.onSpeechEnd = OnSpeechEndHandler;
    Voice.onSpeechResults = OnSpeechResultHandler;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const OnSpeechStartHandler = (e) => {
    try {
      console.log("Start handler =>>>> ", e);
    } catch (giovanna) {
      console.log("ta dando pau");
    }
  };

  const OnSpeechEndHandler = (e) => {
    try {
      console.log("Stop handler ", e);
    } catch (giovanna) {
      console.log("ta dando pau");
    }
  };

  const OnSpeechResultHandler = (e) => {
    try {
      let text = e.value[0];
      setResult(text);
      console.log("Speech result handler", e);
    } catch (giovanna) {
      console.log("deu ruim");
    }
  };

  const startListening = async () => {
    try {
      await Voice.start("en-US");
      setListening(true);
    } catch (e) {
      console.log("error -> ", e);
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
      console.log(result);
      setListening(false);
      setVisible(true);
    } catch (e) {
      console.log("error -> ", e);
    }
  };

  //jeito 2

  //   const [result, setResult] = useState("");
  //   const [error, setError] = useState("");
  //   const [listening, setListening] = useState(false);

  //   Voice.onSpeechStart = () => setListening(true);
  //   Voice.onSpeechEnd = () => setListening(false);
  //   Voice.onSpeechError = (err) => setError(err.error);
  //   Voice.onSpeechResults = (result) => setResult(result.value[0]);

  //   const startListening = async () => {
  //     try {
  //       await Voice.start("en-US");
  //     } catch (giovanna) {
  //       setError(giovanna);
  //       console.log(giovanna);
  //     }
  //   };

  //   const stopListening = async () => {
  //     try {
  //       await Voice.stop();
  //       setVisible(true);
  //     } catch (giovanna) {
  //       setError(giovanna);
  //       console.log(error);
  //     }
  //   };

  useEffect(() => {
    if (listening == true) {
      setTimeout(() => {
        SetTimer(timer + 1);
      }, 1000);
    } else {
      SetTimer(0);
    }
  }, [timer, listening]);

  return (
    <Container>
      <BgSvg
        width={width}
        height={height}
        style={{ position: "absolute", top: 0, left: 0, zIndex: -1 }}
      />
      <Microphone>
        <FontAwesome name="microphone" size={200} color={"#FF7F00"} />
      </Microphone>
      {!listening ? (
        <ListenContainer>
          <Listen onPress={startListening}>
            <TextButton>Captar</TextButton>
          </Listen>
        </ListenContainer>
      ) : (
        <ListeningContainer>
          <Timer>
            {String(Math.floor(timer / 60)).padStart(2, "0")}:
            {String(timer % 60).padStart(2, "0")}
          </Timer>
          <Listening onPress={stopListening}>
            <FontAwesome name="stop" color={"#fff"} size={30} />
          </Listening>
        </ListeningContainer>
      )}
      <HeardModal visible={visible} setVisible={setVisible} result={result} />
    </Container>
  );
}
