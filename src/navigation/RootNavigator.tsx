import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InitScreen from "../screens/InitScreen";
import HomePage from "../screens/HomePage";
import Forecast from "../screens/(weather)/Forecast";
import MapLocation from "../screens/(weather)/MapLocation";
import FavoriteCities from "../screens/(weather)/FavoriteCities";
const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Init' component={InitScreen} />
      <Stack.Screen name='Home' component={HomePage} />
      <Stack.Screen name='Forecast' component={Forecast} />
      <Stack.Screen name='MapLocation' component={MapLocation} />
      <Stack.Screen name='FavoriteCities' component={FavoriteCities} />
    </Stack.Navigator>
  );
}
