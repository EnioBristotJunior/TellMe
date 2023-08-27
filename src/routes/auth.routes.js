import { createNativeStackNavigator } from "@react-navigation/native-stack";

const { Screen, Navigator } = createNativeStackNavigator();

import { Login } from "../screens/Auth/Login";
import { Cadastro } from "../screens/Auth/Cadastro";

export function AuthRoutes() {
  return (
    <Navigator initialRouteName="login" screenOptions={{ headerShown: false }}>
      <Screen name="login" component={Login} />
      <Screen name="cadastro" component={Cadastro} />
    </Navigator>
  );
}
