import { colors } from "@/constants/colors";
import { Fonts } from "@/constants/theme";
import { weatherIndicators } from "@/constants/variables";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text } from "react-native";

export default function ForecastSliderHeader() {
  return (
    <LinearGradient
      colors={["transparent", colors.overlayBlueDark, "transparent"]}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 1 }}
      style={{
        flexDirection: "row",
        paddingHorizontal: 16,
        borderBottomWidth: 0.5,
        borderColor: colors.textPlaceholder,
      }}
    >
      {weatherIndicators.map((indicator) => (
        <Text style={styles.text} key={indicator}>
          {indicator}
        </Text>
      ))}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  text: {
    flex: 0.4,
    color: colors.textPlaceholder,
    textAlign: "center",
    paddingVertical: 5,
    fontFamily: Fonts.family.secondary,
    fontWeight: 100,
  },
});
