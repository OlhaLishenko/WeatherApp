import { StyleSheet } from "react-native";
import { colors } from "./colors";
import { fonts } from "./fonts";

export const Fonts = {
  family: {
    regular: fonts.dmSantStatic.fontFamily,
    regularItalic: fonts.dmSantItalic.fontFamily,
    secondary: fonts.bricolade.fontFamily,
    // main: fonts.smooth.fontFamily,
  },
  size: {
    h1: 32,
    h2: 52,
    h3: 32,
    h4: 28,
    h5: 20,
    h6: 18,
    h6Small: 16,
    h6ExtraSmall: 14,
  },
};

export const Typography = StyleSheet.create({
  secondary: {
    color: colors.mainText,
    fontFamily: Fonts.family.regular,
    fontSize: 20,
    fontWeight: "400",
  },

  big: {
    color: colors.mainText,
    fontFamily: Fonts.family.secondary,
    fontSize: Fonts.size.h1,
    fontWeight: "400",
    lineHeight: 50,
  },

  medium: {
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 21,
    color: colors.mainText,
    fontFamily: Fonts.family.secondary,
  },

  regular: {
    fontSize: 25,
    fontWeight: "600",
    lineHeight: 21,
    color: colors.mainText,
    fontFamily: Fonts.family.secondary,
  },

  smallGrey: {
    fontFamily: fonts.dmSantStatic.fontFamily,
    fontSize: 15,
    fontWeight: "800",
    textAlign: "right",
    color: colors.textGray,
  },
});
