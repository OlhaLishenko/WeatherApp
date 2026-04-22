import { colors } from "@/constants/colors";
// import { ForecastType } from "@/enums/ForecastType";
import { DayInfo } from "@/types/DayInfo";
// import { HourlyTemp } from "@/types/HourlyTemp";
import { WeeklyTemp } from "@/types/WeeklyTemp";
// import { findForecastImage } from "@/utils/findForecastImage";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

type ForecastInfoType = {
  dataItem: WeeklyTemp;
  currentDay: DayInfo;
  image: any;
};

export default function ForecastInfoWeekly({
  dataItem,
  currentDay,
  image,
}: ForecastInfoType) {
  // const image = findForecastImage(dataItem);
  const isToday = currentDay.dayNumber === dataItem.id + 1;

  return (
    <View style={[styles.container, isToday ? styles.containerActive : ""]}>
      <Text style={styles.title}>{dataItem.weekDay}</Text>
      <View>
        <Image source={image} resizeMode='contain' style={styles.image} />
      </View>
      <Text style={styles.textTemperature}>{dataItem.temp}°</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 32,
    height: 32,
  },

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
    fontSize: 15,
    fontWeight: "600",
    fontStyle: "normal",
    lineHeight: 20,
    letterSpacing: -0.5,
    color: colors.mainText,
    marginBottom: 12,
  },

  textTemperature: {
    fontSize: 20,
    fontWeight: "400",
    fontStyle: "normal",
    lineHeight: 24,
    letterSpacing: 0.3799999952316284,
    color: colors.mainText,
    marginTop: 26,
  },
});
