import { colors } from "@/constants/colors";
import { ForecastType } from "@/enums/ForecastType";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type ForecastOptionsType = {
  handleSetActiveForecastType: (newActiveForecastType: ForecastType) => void;
  activeForecastType: ForecastType;
};

export default function ForecastOptions({
  handleSetActiveForecastType,
  activeForecastType,
}: ForecastOptionsType) {
  return (
    <View style={{ flexDirection: "column" }}>
      <View style={styles.textContainer}>
        <Pressable
          onPress={() => handleSetActiveForecastType(ForecastType.HOURLY)}
        >
          <Text style={styles.text}>Hourly Forecast</Text>
        </Pressable>
        <Pressable
          onPress={() => handleSetActiveForecastType(ForecastType.WEEKLY)}
        >
          <Text style={styles.text}>Weekly Forecast</Text>
        </Pressable>
      </View>

      <View
        style={[
          styles.activeIndicator,
          {
            justifyContent:
              activeForecastType === ForecastType.WEEKLY
                ? "flex-end"
                : "flex-start",
          },
        ]}
      >
        <LinearGradient
          colors={["transparent", colors.mainText, "transparent"]}
          style={{ width: "50%", height: "100%" }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        ></LinearGradient>
      </View>

      <View style={styles.separator}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: "row",
    marginInline: 32,
    justifyContent: "space-between",
    alignSelf: "stretch",
  },

  text: {
    fontSize: 15,
    fontWeight: "600",
    fontStyle: "normal",
    lineHeight: 20,
    letterSpacing: -0.5,
    textAlign: "right",
    color: colors.textGray,
  },

  underline: {
    opacity: 0.8,
    width: "100%",
    height: "100%",
  },

  separator: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    height: 1,
    marginTop: 0,
  },

  activeIndicator: {
    width: "100%",
    height: 4,
    flexDirection: "row",
  },
});
