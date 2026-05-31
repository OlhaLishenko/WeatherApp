import { colors } from "@/constants/colors";
import { View } from "react-native";

export default function Dot({ color }: { color: string }) {
  return (
    <View
      style={{
        width: 5,
        height: 5,
        borderRadius: 5,
        backgroundColor: color,
      }}
    ></View>
  );
}
