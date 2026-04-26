import { colors } from "@/constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
const sunrise = require("@/assets/images/sunrise.png");

export default function ForecastAdditionInfo() {
  return (
    <View style={styles.container}>
      <Text>ForecastAdditionInfo</Text>

      <View style={{ width: "90%", height: 6 }}>
        <LinearGradient
          colors={["green", "yellow", "orange", "red", "purple"]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          style={{ flex: 1, justifyContent: "center", borderRadius: 5 }}
        >
          <View
            style={{
              height: 10,
              width: 10,
              backgroundColor: colors.mainText,
              borderRadius: "50%",
              borderColor: colors.blueDark,
              borderWidth: 1,
              // left: "25%",
            }}
          ></View>
        </LinearGradient>
      </View>

      <Image source={sunrise} style={{ width: "100%" }} resizeMode='contain' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondaryBgBlue,
    width: 164,
    height: 164,
    borderColor: colors.solid,
    borderRadius: 16,
    borderWidth: 1,
  },
});
