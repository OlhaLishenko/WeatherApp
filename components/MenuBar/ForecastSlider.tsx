import React from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ForecastSliderHeader from "./ForecastSliderHeader";

type ForecastSliderType = {
  children: React.ReactNode;
  direction: "horizontal" | "vertical";
};

export default function ForecastSlider({
  children,
  direction,
}: ForecastSliderType) {
  return (
    <View style={{ flex: 1, flexDirection: "column" }}>
      {direction === "vertical" && <ForecastSliderHeader />}
      <ScrollView
        horizontal={direction === "horizontal"}
        contentContainerStyle={[
          styles.forecastSlider,
          direction === "vertical" ? styles.sliderIsVertical : null,
        ]}
        bounces={true}
      >
        {children}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  forecastSlider: {
    marginTop: 10,
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 20,
  },

  sliderIsVertical: {
    flexDirection: "column",
  },
});
