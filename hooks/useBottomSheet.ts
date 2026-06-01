import { MAX_HEIGHT, MIN_HEIGHT } from "@/constants/variables";
import { Gesture } from "react-native-gesture-handler";
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export function useBottomSheet() {
  const menuHeight = useSharedValue(MIN_HEIGHT);
  const startHeight = useSharedValue(MIN_HEIGHT);

  const dragGesture = Gesture.Pan()
    .onStart(() => {
      startHeight.value = menuHeight.value;
    })
    .onUpdate((event) => {
      const newHeight = startHeight.value - event.translationY;
      menuHeight.value = Math.min(Math.max(newHeight, MIN_HEIGHT), MAX_HEIGHT);
    })
    .onEnd(() => {
      const middle = (MIN_HEIGHT + MAX_HEIGHT) / 2;
      menuHeight.value = withSpring(
        menuHeight.value > middle ? MAX_HEIGHT : MIN_HEIGHT,
        { damping: 20, stiffness: 120 },
      );
    });

  const animatedStyle = useAnimatedStyle(() => ({
    height: menuHeight.value,
  }));

  return { dragGesture, animatedStyle };
}
