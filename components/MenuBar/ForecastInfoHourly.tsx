import { colors } from "@/constants/colors";
import { Fonts } from "@/constants/theme";
import { HourlyTemp } from "@/types/HourlyTemp";
import { findForecastImage } from "@/utils/findForecastImage";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

type ForecastInfoHourlyType = {
  hourlyWeather: HourlyTemp;
};

export default function ForecastInfoHourly({
  hourlyWeather,
}: ForecastInfoHourlyType) {
  const image = findForecastImage(hourlyWeather);
  return (
    <>
      <LinearGradient
        colors={[
          "transparent",
          hourlyWeather.id % 2 === 1
            ? colors.overlayBlueDark
            : colors.overlayBlueLight,
          "transparent",
        ]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.container}>
          <Text style={[styles.text, styles.tempItem, styles.tempItemBase]}>
            {hourlyWeather.time.slice(-5)}
          </Text>
          <View style={styles.tempItemBase}>
            <Text style={styles.text}>{hourlyWeather.temp}°</Text>
            <Image source={image} resizeMode='contain' style={styles.image} />
          </View>
          <Text style={[styles.text, styles.tempItem, styles.tempItemBase]}>
            {hourlyWeather.rainSum} mm
          </Text>
          <Text style={[styles.text, styles.tempItem, styles.tempItemBase]}>
            {hourlyWeather.windSpeed} km/h
          </Text>
          <Text style={[styles.text, styles.tempItem, styles.tempItemBase]}>
            {hourlyWeather.uvIndex}
          </Text>
        </View>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 32,
    height: 32,
  },

  container: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    width: "100%",
    paddingVertical: 5,
    flex: 1,
    paddingHorizontal: 5,
    textAlign: "center",
  },

  text: {
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 21,
    color: colors.mainText,
    fontFamily: Fonts.family.secondary,
  },

  tempItemBase: {
    flex: 0.4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  tempItem: {
    textAlign: "center",
  },
});
