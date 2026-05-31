import { Typography } from "@/constants/fontsConfiguration";
import { Text } from "@react-navigation/elements";
import { StyleSheet } from "react-native";

export default function MainText() {
  return (
    <>
      <Text style={styles.text}>How’s the sky looking today?</Text>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    ...Typography.big,
    textAlign: "center",
    alignContent: "center",
  },
});
