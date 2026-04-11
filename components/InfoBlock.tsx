import BgToday from "@/assets/images/bg-today-small.svg";
import { colors } from "@/constants/colors";
import { Fonts, Typography } from "@/constants/theme";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function InfoBlock() {
  return (
    <View style={styles.contentInfo}>
      <BgToday
        style={[StyleSheet.absoluteFillObject]}
        width='100%'
        height='100%'
        preserveAspectRatio='xMidYMid slice'
      />

      <View style={styles.overlay}>
        <View>
          <View
            style={{
              flexDirection: "column",
              gap: 12,
            }}
          >
            <Text
              style={{
                ...Typography.extraBold,
                color: colors.mainText,
                fontSize: Fonts.size.h3,
                textAlign: "center",
              }}
            >
              Berlin, Germany
            </Text>
            <Text
              style={{
                ...Typography.extraBold,
                color: colors.mainText,
                fontSize: Fonts.size.h3,
                textAlign: "center",
              }}
            >
              Tusday, Aug 5, 2025
            </Text>
          </View>
          <View style={styles.infoBoxTemp}>
            <Image
              source={require("../assets/images/icon-sunny.webp")}
              style={{ flex: 1, height: "100%" }}
              resizeMode='contain'
            />
            <Text
              style={{
                ...Typography.big,
              }}
            >
              68°
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentInfo: {
    flex: 1,
    borderRadius: 20,
    overflow: "hidden",
  },

  overlay: {
    justifyContent: "center",
    paddingBlock: 41,
    paddingInline: 16,
  },

  infoBoxTemp: {
    flexDirection: "row",
    gap: 20,
  },
});
