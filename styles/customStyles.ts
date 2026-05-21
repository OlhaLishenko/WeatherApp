import { colors } from "@/constants/colors";
import { Fonts } from "@/constants/theme";
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

  textSmall: {
    fontFamily: Fonts.family.regularItalic,
    fontSize: Fonts.size.h6,
    color: colors.mainText,
  },
});
