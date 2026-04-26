import { colors } from "@/constants/colors";
import { Fonts } from "@/constants/theme";
import { useAppSelector } from "@/types/reduxTypes";
import { WeeklyTemp } from "@/types/WeeklyTemp";
import { findForecastImage } from "@/utils/findForecastImage";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const forecastBgBlock = require("@/assets/images/forecast-block.png");
const rainIcon = require("@/assets/images/forecast/cloud-rain-solid.png");
const windIcon = require("@/assets/images/forecast/wind-solid.png");
const cloudIcon = require("@/assets/images/forecast/cloud-regular.png");

type ForecastType = {
  tempData: WeeklyTemp;
};

export default function ForecastList({ tempData }: ForecastType) {
  const image = findForecastImage(tempData);
  const locationName = useAppSelector((state) => state.locationName);

  const indicatorsData = [
    {
      id: "1",
      name: "rain",
      unit: "mm",
      icon: rainIcon,
      value: tempData.rainSum,
    },
    {
      id: "2",
      name: "wind",
      unit: "km/h",
      icon: windIcon,
      value: tempData.windSpeed,
    },
    {
      id: "3",
      name: "cloud",
      unit: "%",
      icon: cloudIcon,
      value: tempData.cloudCover,
    },
  ];

  return (
    <View
      style={{
        height: 220,
        flexDirection: "column",
        justifyContent: "flex-end",
        position: "relative",
      }}
    >
      <Image source={forecastBgBlock} style={styles.bg} resizeMode='contain' />
      <View style={[StyleSheet.absoluteFill]}>
        <View style={styles.textContainer}>
          <Text style={styles.textBig}>{tempData.temp}°</Text>

          <Text style={styles.textSmall}>
            {locationName.city}, {locationName.country}
          </Text>

          <LinearGradient
            colors={["transparent", colors.mainText, "transparent"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 1 }}
            style={{
              height: 5,
              width: "50%",
            }}
          ></LinearGradient>

          <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
            {indicatorsData.map((indicator) => (
              <View key={indicator.id} style={styles.indicatorContainer}>
                <Image
                  style={{ width: 16, height: 16 }}
                  source={indicator.icon}
                />
                <Text style={styles.textSmall}>
                  {indicator.value} {indicator.unit}
                </Text>
              </View>
            ))}
          </View>
        </View>
        <Image
          source={image}
          style={{
            position: "absolute",
            top: 10,
            width: 150,
            height: 150,
            right: 15,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bg: {
    width: "100%",
  },

  textBig: {
    fontSize: 64,
    fontWeight: "300",
    fontStyle: "normal",
    color: colors.mainText,
    fontFamily: Fonts.family.regular,
  },

  textSmall: {
    fontSize: 16,
    fontWeight: "400",
    fontStyle: "normal",
    color: colors.mainText,
    fontFamily: Fonts.family.regular,
  },

  textContainer: {
    flex: 1,
    flexDirection: "column",
    gap: 10,
    paddingLeft: 25,
    paddingTop: 30,
    paddingBottom: 20,
    justifyContent: "flex-end",
  },

  indicatorContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});
