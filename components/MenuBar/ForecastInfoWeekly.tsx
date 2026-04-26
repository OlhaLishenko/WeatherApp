import { colors } from "@/constants/colors";
import { DayInfo } from "@/types/DayInfo";
import { WeeklyTemp } from "@/types/WeeklyTemp";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import ForecastAdditionInfo from "./ForecastAdditionInfo";
import ForecastSlider from "./ForecastSlider";
import ForecastWeeklyItem from "./ForecastWeeklyItem";

type ForecastWeeklyDataListType = {
  weeklyWeather: WeeklyTemp[];
  currentDay: DayInfo;
};

export const ForecastWeeklyDataList = ({
  weeklyWeather,
  currentDay,
}: ForecastWeeklyDataListType) => {
  return (
    <>
      {weeklyWeather.map((dayWeather) => (
        <ForecastWeeklyItem
          dayWeather={dayWeather}
          currentDay={currentDay}
          key={dayWeather.id}
        />
      ))}
    </>
  );
};

type ForecastInfoWeeklyType = {
  weeklyWeather: WeeklyTemp[];
  currentDay: DayInfo;
};

export default function ForecastInfoWeekly({
  weeklyWeather,
  currentDay,
}: ForecastInfoWeeklyType) {
  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "flex-start",
          gap: 20,
        }}
      >
        <ForecastSlider direction={"horizontal"}>
          <ForecastWeeklyDataList
            weeklyWeather={weeklyWeather}
            currentDay={currentDay}
          />
        </ForecastSlider>
        <View style={{ flexDirection: "row" }}>
          <ForecastAdditionInfo />
        </View>
      </View>
    </ScrollView>
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
