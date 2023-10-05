import { createNativeStackNavigator } from "@react-navigation/native-stack";

const { Screen, Navigator } = createNativeStackNavigator();

import { Welcome } from "../screens/OneBoarding/Welcome";
import { InformingBoard } from "../screens/OneBoarding/InformingBoard";

export function OneBoardingStack() {
  return (
    <Navigator
      initialRouteName="welcome"
      screenOptions={{ headerShown: false }}
    >
      <Screen name="welcome" component={Welcome} />
      <Screen name="informingBoard" component={InformingBoard} />
    </Navigator>
  );
}
