import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Octicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

const { Screen, Navigator } = createBottomTabNavigator();

import { Hearing } from "../screens/Hearing";
import { Profile } from "../screens/Profile";
import { HomeRoutes } from "./home.routes";
import { ProfileRoutes } from "./profile.routes";

// import House from "../imgs/components/home-fill.svg";
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
            // color == "#091837" ? (
            //   <House color={"#091837"} width={28} height={28} />
            // ) : (
            //   <Octicons name="home" color={color} size={size} />
            // ),
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
