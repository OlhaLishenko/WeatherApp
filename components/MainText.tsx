import { colors } from "@/constants/colors";
import { Fonts } from "@/constants/theme";
import { Text } from "@react-navigation/elements";

export default function MainText() {
  return (
    <>
      <Text
        style={{
          fontFamily: Fonts.family.secondary,
          color: colors.mainText,
          fontSize: Fonts.size.h4,
          textAlign: "center",
          alignContent: "center",
        }}
      >
        How’s the sky looking today?
      </Text>
    </>
  );
}
