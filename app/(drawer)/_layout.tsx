import { colors } from "@/constants/colors";
import { Drawer } from "expo-router/drawer";
import { StyleSheet } from "react-native";

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: colors.blueElements,
        },
        drawerActiveTintColor: colors.blueDark,
        drawerInactiveTintColor: colors.mainText,
        drawerLabelStyle: {
          fontSize: 18,
        },
      }}
    />
  );
}

const styles = StyleSheet.create({
  absolute: {},
});
