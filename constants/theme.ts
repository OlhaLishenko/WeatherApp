import { StyleSheet } from "react-native";
import { colors } from "./colors";
import { fonts } from "./fonts";

export const Fonts = {
  family: {
    regular: fonts.dmSantStatic.fontFamily,
    regularItalic: fonts.dmSantItalic.fontFamily,
    secondary: fonts.bricolade.fontFamily,
  },
  size: {
    h1: 96,
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
  big: {
    color: colors.mainText,
    fontFamily: Fonts.family.regularItalic,
    fontSize: Fonts.size.h1,
    fontWeight: 700,
    // lineHeight: 19.2,
  },
  mainTitle: {
    fontFamily: Fonts.family.secondary,
    fontSize: Fonts.size.h2,
    fontWeight: 700,
    // lineHeight: 19.2,
  },
  light: {
    fontFamily: Fonts.family.regular,
    fontWeight: 300,
    // lineHeight: 16,
  },
  extraBold: {
    fontFamily: Fonts.family.regular,
    fontWeight: 700,
    // lineHeight: 19.2,
  },
  medium: {
    fontFamily: Fonts.family.regular,
    fontWeight: 500,
    // lineHeight: 19.2,
  },
});
