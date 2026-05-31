import { colors } from "@/constants/colors";
import { Typography } from "@/constants/fontsConfiguration";
import { customStyles } from "@/styles/customStyles";
import { DayInfo } from "@/types/DayInfo";
import { WeeklyTemp } from "@/types/WeeklyTemp";
import { findForecastImage, ForecastImage } from "@/utils/findForecastImage";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

type ForecastWeeklyItemType = {
  dayWeather: WeeklyTemp;
  currentDay: DayInfo;
};

export default function ForecastWeeklyItem({
  dayWeather,
  currentDay,
}: ForecastWeeklyItemType) {
  const isToday = currentDay.dayNumber === dayWeather.id;
  const image: ForecastImage = findForecastImage(dayWeather);

  return (
    <View style={[styles.container, isToday ? styles.containerActive : ""]}>
      <Text style={styles.title}>{dayWeather.weekDay}</Text>
      <View>
        <Image
          source={image.imageBig}
          resizeMode='contain'
          style={customStyles.tempImageSize}
        />
      </View>
      <Text style={styles.textTemperature}>{dayWeather.temp}°</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 146,
    borderRadius: 30,
    backgroundColor: colors.secondaryBgBlue,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.4)",

    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 5,
      height: 4,
    },
    shadowRadius: 10,
    shadowOpacity: 1,
    paddingBlock: 16,
    paddingInline: 12,
  },

  containerActive: {
    backgroundColor: colors.mainBgBlue,
  },

  title: {
    ...Typography.medium,
    marginBottom: 12,
  },

  textTemperature: {
    ...Typography.medium,
    marginTop: 26,
  },
});
