import { Typography } from "@/constants/fontsConfiguration";
import { IndicatorWithWeatherData } from "@/types/IndicatorsType";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function FavoriteIndicator({
  indicator,
}: {
  indicator: IndicatorWithWeatherData;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 5,
      }}
    >
      <Image source={indicator.icon} style={{ width: 15, height: 15 }} />
      <Text style={{ ...Typography.smallGrey, fontSize: 10 }}>
        {indicator.value}
        {indicator.unit}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({});
