import { store } from "@/store/store";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import RootNavigator from "./navigation/RootNavigator";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </Provider>
    </GestureHandlerRootView>
  );
}
