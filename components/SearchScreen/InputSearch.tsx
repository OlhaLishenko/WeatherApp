import { colors } from "@/constants/colors";
import { fetchNewLocation } from "@/store/searchCity";
import { fetchNewCityTemp } from "@/store/searchCityTempSlice";
import { useAppDispatch } from "@/types/reduxTypes";
import React, { useState } from "react";
import { Image, StyleSheet, TextInput, View } from "react-native";

const searchIcon = require("@/assets/images/icon-search.png");

export default function InputSearch() {
  const dispatch = useAppDispatch();
  const [searchLocation, setSearchLocation] = useState<string>("");

  const handleChangeLocation = () => {
    const loadTemp = async () => {
      await dispatch(fetchNewLocation(searchLocation));
      await dispatch(fetchNewCityTemp());
    };
    loadTemp();
  };

  return (
    <View style={styles.inputWrapper}>
      <Image source={searchIcon} style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={" Search for a city"}
        placeholderTextColor={colors.textPlaceholder}
        onChangeText={(newLocation) => setSearchLocation(newLocation)}
        value={searchLocation}
        onSubmitEditing={handleChangeLocation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",

    borderRadius: 10,
    borderWidth: 1,
    borderColor: "transparent",
    backgroundColor: colors.secondaryBgBlue,

    paddingBlock: 5,
    paddingInline: 8,

    boxShadow: [
      {
        offsetX: 0,
        offsetY: 4,
        blurRadius: 10,
        spreadDistance: 0,
        color: colors.blueDark,
        inset: true,
      },
    ],
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: 5,
  },
  input: {
    flex: 1,
    fontSize: 17,
    fontWeight: "400",
    fontStyle: "normal",
    lineHeight: 22,
    letterSpacing: -0.40799999237060547,
    color: colors.mainText,
  },
});
