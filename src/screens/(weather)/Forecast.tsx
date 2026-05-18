import ForecastList from "@/components/SearchScreen/ForecastList";
import InputSearch from "@/components/SearchScreen/InputSearch";
import { colors } from "@/constants/colors";
import { useAppSelector } from "@/types/reduxTypes";
import React from "react";
import { StyleSheet, View } from "react-native";
import WeatherLayout from "./layout";

export default function Forecast() {
  const searchCityTemp = useAppSelector((state) => state.searchCityTemp.data);

  return (
    <WeatherLayout>
      <InputSearch />
      <View style={{ flex: 1, flexDirection: "column", gap: 20 }}>
        {searchCityTemp.map((day) => (
          <ForecastList tempData={day} key={day.weekDay} />
        ))}
      </View>
    </WeatherLayout>
  );
}

// const styles = StyleSheet.create({
//   navContainer: {
//     width: "100%",
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   navText: {
//     fontSize: 28,
//     fontWeight: "400",
//     fontStyle: "normal",
//     lineHeight: 34,
//     letterSpacing: 0.36399999260902405,
//     color: colors.mainText,
//   },

//   input: {
//     borderRadius: 10,
//     borderWidth: 3,
//     borderColor: "transparent",
//     boxShadow: `inset 1px 10px 2px #000"`,
//     backgroundColor: colors.secondaryBgBlue,
//     fontSize: 17,
//     fontWeight: "400",
//     fontStyle: "normal",
//     lineHeight: 22,
//     letterSpacing: -0.40799999237060547,
//     paddingBlock: 7,
//     paddingInline: 8,
//   },
// });
