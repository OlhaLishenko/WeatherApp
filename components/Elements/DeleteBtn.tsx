import { colors } from "@/constants/colors";
import { Typography } from "@/constants/fontsConfiguration";
import { FavoriteCityWeather } from "@/types/FavoriteCity";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function DeleteBtn({
  deleteCity,
  cityToDelete,
}: {
  deleteCity: (city: FavoriteCityWeather) => void;
  cityToDelete: FavoriteCityWeather;
}) {
  const translation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(translation, {
      toValue: 70,
      useNativeDriver: true,
    }).start();
  }, [translation]);

  return (
    <Animated.View
      style={{
        transform: [{ translateY: translation }],
      }}
    >
      <TouchableOpacity
        onPress={() => deleteCity(cityToDelete)}
        style={{
          position: "absolute",
          right: 5,
          top: -130,
          zIndex: 2,
          paddingHorizontal: 20,
          paddingVertical: 3,
          borderWidth: 1,
          borderRadius: 5,
          borderColor: colors.textGray,
          backgroundColor: colors.lightPurpule,
        }}
      >
        <Text style={{ ...Typography.smallGrey }}>Delete</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({});
