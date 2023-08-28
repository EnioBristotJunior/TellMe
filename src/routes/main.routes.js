import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Octicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

const { Screen, Navigator } = createBottomTabNavigator();

import { Home } from "../screens/Home";
import { Hearing } from "../screens/Hearing";
import { Profile } from "../screens/Profile";
import { HomeRoutes } from "./home.routes";

export function MainRoutes() {
  return (
    <Navigator
      initialRouteName="homeRoutes"
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
          borderRadius: 30,
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
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user" color={color} size={size} />
          ),
        }}
      />
    </Navigator>
  );
}
