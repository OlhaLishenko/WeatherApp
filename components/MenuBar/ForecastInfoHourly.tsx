import { colors } from "@/constants/colors";
import { Fonts } from "@/constants/theme";
import { HourlyTemp } from "@/types/HourlyTemp";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

type ForecastInfoHourlyType = {
  dataItem: HourlyTemp;
  image: any;
};

export default function ForecastInfoHourly({
  dataItem,
  image,
}: ForecastInfoHourlyType) {
  return (
    <>
      <LinearGradient
        colors={[
          "transparent",
          dataItem.id % 2 === 1
            ? colors.overlayBlueDark
            : colors.overlayBlueLight,
          "transparent",
        ]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.container}>
          <Text style={[styles.text, styles.tempItem, styles.tempItemBase]}>
            {dataItem.time.slice(-5)}
          </Text>
          <View style={styles.tempItemBase}>
            <Text style={styles.text}>{dataItem.temp}°</Text>
            <Image source={image} resizeMode='contain' style={styles.image} />
          </View>
          <Text style={[styles.text, styles.tempItem, styles.tempItemBase]}>
            {dataItem.rainSum} mm
          </Text>
          <Text style={[styles.text, styles.tempItem, styles.tempItemBase]}>
            {dataItem.windSpeed} km/h
          </Text>
          <Text style={[styles.text, styles.tempItem, styles.tempItemBase]}>
            {dataItem.uvIndex}
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
    // gap: 8,
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
