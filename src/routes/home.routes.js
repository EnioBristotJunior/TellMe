import { createNativeStackNavigator } from "@react-navigation/native-stack";

const { Screen, Navigator } = createNativeStackNavigator();

import { Home } from "../screens/Home";
import { NewArea } from "../screens/Areas/NewArea";
import { EditArea } from "../screens/Areas/EditArea";
import { PhrasesList } from "../screens/Phrases/PhrasesList";

export function HomeRoutes() {
  return (
    <Navigator initialRouteName="home" screenOptions={{ headerShown: false }}>
      <Screen name="home" component={Home} />
      <Screen name="newArea" component={NewArea} />
      <Screen name="editArea" component={EditArea} />
      <Screen name="phrasesList" component={PhrasesList} />
    </Navigator>
  );
}
