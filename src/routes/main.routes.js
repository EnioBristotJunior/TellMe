import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { useUser } from "@realm/react";

import { Octicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

const { Screen, Navigator } = createBottomTabNavigator();

import { Hearing } from "../screens/Hearing";
import { OneBoardingStack } from "./oneboarding.routes";
import { HomeRoutes } from "./home.routes";
import { ProfileRoutes } from "./profile.routes";
import { useContext, useEffect, useState } from "react";
import { getOneboarding, setOneboarding } from "../storage";
import { OneBoardingContext } from "../context/oneboardingContext";

// import House from "../imgs/components/home-fill.svg";
export function MainRoutes() {
  const { oneboardingVisible, setOneboardingVisible } =
    useContext(OneBoardingContext);

  const user = useUser();

  useEffect(() => {
    const oneboardingStorage = getOneboarding();
    console.log(oneboardingStorage);

    if (!oneboardingStorage) {
      console.log("não tem no storage");
      if (user.customData) {
        setOneboardingVisible(false);
        console.log("bateu user");
      } else {
        setOneboardingVisible(false);
        console.log("primeira vez");
      }
    } else {
      const vef = JSON.parse(oneboardingStorage);
      if (vef.userId === user.id) {
        console.log("bateu o user");
        setOneboardingVisible(false);
      } else {
        console.log("não bateu o user");
        setOneboardingVisible(true);
      }
    }
  }, []);

  // //Outra tela
  // setOneboarding({name: SafeArray, age})
  if (oneboardingVisible) {
    return (
      <Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#091837",
          tabBarInactiveTintColor: "#e9e9e9",
          tabBarShowLabel: false,

          tabBarStyle: {
            backgroundColor: "#FF7F00",
            height: 70,
            position: "absolute",
            bottom: 30,
            right: 40,
            borderRadius: 20,
            left: 40,
            borderTopWidth: 0,
          },
        }}
      >
        <Screen
          name="oneboardingStack"
          component={OneBoardingStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Octicons name="home" color={color} size={size} />
            ),
            tabBarItemStyle: {
              display: "none",
            },
          }}
        />
      </Navigator>
    );
  }

  return (
    <Navigator
      initialRouteName={"homeRoutes"}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#091837",
        tabBarInactiveTintColor: "#e9e9e9",
        tabBarShowLabel: false,

        tabBarStyle: {
          backgroundColor: "#FF7F00",
          height: 70,
          position: "absolute",
          bottom: 30,
          right: 40,
          borderRadius: 20,
          left: 40,
          borderTopWidth: 0,
        },
      }}
    >
      <Screen
        name="homeRoutes"
        component={HomeRoutes}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Octicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Screen
        name="hearing"
        component={Hearing}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="hearing" color={color} size={size} />
          ),
        }}
      />
      <Screen
        name="profileRoutes"
        component={ProfileRoutes}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user" color={color} size={size} />
          ),
        }}
      />
    </Navigator>
  );
}
