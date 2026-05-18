import React from "react";
import { StyleSheet, Text, View } from "react-native";
import WeatherLayout from "./layout";

export default function FavoriteCities() {
  return (
    <WeatherLayout>
      <Text>FavoriteCities</Text>
      <View>
        <Text>Dnipro</Text>
      </View>
    </WeatherLayout>
  );
}

const styles = StyleSheet.create({});
