import { createNativeStackNavigator } from "@react-navigation/native-stack";

const { Screen, Navigator } = createNativeStackNavigator();

import { Profile } from "../screens/Profile";
import { EditName } from "../screens/Profile/EditName";
import { DeleteAccount } from "../screens/Profile/DeleteAccount";
import { EditPitcure } from "../screens/Profile/EditPitcure";

export function ProfileRoutes() {
  return (
    <Navigator
      initialRouteName="profile"
      screenOptions={{ headerShown: false }}
    >
      <Screen name="profile" component={Profile} />
      <Screen name="editName" component={EditName} />
      <Screen name="deleteAccount" component={DeleteAccount} />
      <Screen name="editPicture" component={EditPitcure} />
    </Navigator>
  );
}
