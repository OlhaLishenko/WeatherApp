import ForecastList from "@/components/SearchScreen/ForecastList";
import InputSearch from "@/components/SearchScreen/InputSearch";
import { colors } from "@/constants/colors";
import { useAppSelector } from "@/types/reduxTypes";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const arrowIcon = require("@/assets/images/icon-arrow.png");

export default function Forecast() {
  const searchCityTemp = useAppSelector((state) => state.searchCityTemp.data);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={[colors.secondaryBgBlue, colors.mainBgBlue]}
        style={{ flex: 1 }}
        start={[1, 0]}
        end={[3, 1]}
        locations={[0.1, 0.7]}
      >
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingVertical: 16,
            flexDirection: "column",
            gap: 20,
          }}
        >
          <View style={styles.navContainer}>
            <Image source={arrowIcon} style={{ width: 24, height: 24 }} />
            <Text style={styles.navText}>Weather</Text>
          </View>
          <InputSearch />
          <View style={{ flex: 1, flexDirection: "column", gap: 20 }}>
            {searchCityTemp.map((day) => (
              <ForecastList tempData={day} key={day.weekDay} />
            ))}
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  navContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  navText: {
    fontSize: 28,
    fontWeight: "400",
    fontStyle: "normal",
    lineHeight: 34,
    letterSpacing: 0.36399999260902405,
    color: colors.mainText,
  },

  input: {
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "transparent",
    boxShadow: `inset 1px 10px 2px #000"`,
    backgroundColor: colors.secondaryBgBlue,
    fontSize: 17,
    fontWeight: "400",
    fontStyle: "normal",
    lineHeight: 22,
    letterSpacing: -0.40799999237060547,
    paddingBlock: 7,
    paddingInline: 8,
  },
});
