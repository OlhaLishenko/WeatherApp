import { colors } from "@/constants/colors";
import { useAppSelector } from "@/types/reduxTypes";
import { WeeklyTemp } from "@/types/WeeklyTemp";
import { findForecastImage } from "@/utils/findForecastImage";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const forecastBgBlock = require("@/assets/images/forecast-block.png");
const forecast = require("@/assets/images/forecast/icon-rain.webp");
const cloudIcon = require("@/assets/images/forecast/cloud-rain-solid.png");

type ForecastType = {
  tempData: WeeklyTemp;
};

// id: number;
// weatherType: "weekly";
// data: string;
// weekDay: string;
// temp: number;
// windSpeed: number;
// cloudCover: number;
// rainSum: number;

export default function ForecastList({ tempData }: ForecastType) {
  const image = findForecastImage(tempData);
  const locationName = useAppSelector((state) => state.locationName);

  // console.log(tempData);

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
      <View style={[StyleSheet.absoluteFill, styles.coverContainer]}>
        <View style={styles.textContainer}>
          <Text style={styles.textBig}>{tempData.temp}°</Text>
          <Text style={styles.textSmall}>
            {locationName.city}, {locationName.country}
          </Text>
          <View style={styles.indicatorContainer}>
            <Image style={{ width: 16, height: 16 }} source={cloudIcon} />
            <Text style={styles.textSmall}>{tempData.rainSum}mm</Text>
          </View>
        </View>
        <Image
          source={image}
          style={{
            position: "absolute",
            top: 0,
            width: 150,
            height: 150,
            right: 0,
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
    fontWeight: "400",
    fontStyle: "normal",
    color: colors.mainText,
  },

  textSmall: {
    fontSize: 16,
    fontWeight: "400",
    fontStyle: "normal",
    color: colors.mainText,
  },

  textContainer: {
    flex: 1,
    flexDirection: "column",
    gap: 8,
    paddingLeft: 25,
    paddingTop: 60,
    // backgroundColor: "gray",
  },

  indicatorContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "red",
  },
  coverContainer: {
    // backgroundColor: "green",
  },
});
