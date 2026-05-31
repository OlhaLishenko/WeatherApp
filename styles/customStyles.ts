import { colors } from "@/constants/colors";
import { Fonts } from "@/constants/fontsConfiguration";
import { StyleSheet } from "react-native";

export const customStyles = StyleSheet.create({
  flexRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 0,
    justifyContent: "space-between",
  },

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
    fontFamily: Fonts.family.secondary,
  },

  shadow: {
    boxShadow: [
      {
        offsetX: 0,
        offsetY: 4,
        blurRadius: 10,
        spreadDistance: 0,
        color: colors.blueDark,
      },
    ],
  },

  boxShadowStrength: {
    boxShadow: [
      {
        offsetX: 0,
        offsetY: 0,
        blurRadius: 8,
        spreadDistance: 0,
      },
    ],
  },

  textSmall: {
    fontFamily: Fonts.family.regularItalic,
    fontSize: Fonts.size.h6,
    color: colors.mainText,
  },

  textBig: {
    fontFamily: Fonts.family.secondary,
    fontSize: Fonts.size.h3,
    color: colors.mainText,
  },

  tempImageSize: {
    width: 32,
    height: 32,
  },
});
