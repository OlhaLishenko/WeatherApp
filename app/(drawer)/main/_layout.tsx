import { colors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";
import { Stack } from "expo-router";
import { StyleSheet } from "react-native";

export default function MainLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name='index'
        options={{ title: "Home Page" }}
      ></Stack.Screen>
    </Stack>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.blueDark,
    padding: 16,
    minHeight: "100%",
    flexDirection: "column",
    gap: 48,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  buttonSettings: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 10,
    backgroundColor: colors.blueElements,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingBlock: 10,
    paddingInline: 10,
  },

  buttonContainer: {
    color: colors.mainText,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },

  buttonTitle: {
    ...fonts.dmSantStatic,
    fontSize: 14,
    color: colors.mainText,
  },
});
