import { colors } from "@/constants/colors";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
const sunrise = require("@/assets/images/sunrise.png");

export default function Sunrise() {
  return (
    <View style={{ position: "relative", width: "100%", height: "100%" }}>
      <Image source={sunrise} style={{ width: "100%" }} resizeMode='contain' />

      {/* <View
        style={{
          position: "absolute",
          width: "100%",
          height: 3,
          backgroundColor: colors.mainText,
          top: "55%",
          opacity: 0.5,
        }}
      ></View> */}
      <View
        style={[StyleSheet.absoluteFill, { width: "100%", height: "100%" }]}
      >
        <View
          style={{
            height: 10,
            width: 10,
            backgroundColor: colors.mainText,
            borderRadius: "50%",
            borderColor: colors.blueDark,
            borderWidth: 1,
            top: "30%",
            left: "28%",
            boxShadow: [
              {
                offsetX: 0,
                offsetY: 4,
                blurRadius: 10,
                spreadDistance: 0,
                color: colors.blueDark,
              },
            ],
          }}
        ></View>

        <View
          style={{
            top: "30%",
            width: "100%",
            height: "100%",
            backgroundColor: colors.blueDark,
            opacity: 0.8,
            borderTopWidth: 2,
            borderColor: colors.mainText,
          }}
        ></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
