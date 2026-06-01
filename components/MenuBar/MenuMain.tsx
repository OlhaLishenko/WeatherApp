import { loadHourlyTemp } from "@/api/loadHourlyTemp";
import { colors } from "@/constants/colors";
import { ForecastType } from "@/enums/ForecastType";
import { actions as actionsHourly } from "@/store/hourlyTempSlice";
import { DayInfo } from "@/types/DayInfo";
import { HourlyTemp } from "@/types/HourlyTemp";
import { useAppDispatch, useAppSelector } from "@/types/reduxTypes";
import { normolizeTempData } from "@/utils/normolizeTempData";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import BottomBarControls from "./BottomBarControls";
import ForecastInfoHourly from "./ForecastInfoHourly";
import ForecastInfoWeekly from "./ForecastInfoWeekly";
import ForecastOptions from "./ForecastOptions";
import ForecastSlider from "./ForecastSlider";
import { useBottomSheet } from "@/hooks/useBottomSheet";
import { useHourlyTemp } from "@/hooks/useHourlyTemp";

type MenuMainType = {
  currentDay: DayInfo;
};

export default function MenuMain({ currentDay }: MenuMainType) {
  const { data: coordinates } = useAppSelector((state) => state.coordinates);
  const { latitude, longitude } = coordinates;
  useHourlyTemp(latitude, longitude, currentDay);

  const [activeForecastType, setActiveForecastType] = useState<ForecastType>(
    ForecastType.WEEKLY,
  );

  const weeklyWeather = useAppSelector((state) => state.weeklyTemp.data);
  const hourlyWeather = useAppSelector((state) => state.hourlyTemp.data);
  const isWeeklyWeatherData = activeForecastType === ForecastType.WEEKLY;

  const { dragGesture, animatedStyle } = useBottomSheet();

  return (
    <>
      <Animated.View style={[styles.menuDisplay, animatedStyle]}>
        <LinearGradient
          colors={[colors.secondaryBgBlue, colors.mainBgBlue]}
          style={{ flex: 1 }}
          start={[0.9, 0]}
          end={[-1, -1]}
        >
          <GestureDetector gesture={dragGesture}>
            <View style={styles.buttonDrag}>
              <View style={styles.dragLine} />
            </View>
          </GestureDetector>

          <ForecastOptions
            handleSetActiveForecastType={setActiveForecastType}
            activeForecastType={activeForecastType}
          />

          <View style={{ flex: 1 }}>
            {isWeeklyWeatherData ? (
              <ForecastInfoWeekly
                weeklyWeather={weeklyWeather}
                currentDay={currentDay}
              />
            ) : (
              <ForecastSlider direction='vertical'>
                {hourlyWeather.map((hourlyWeather) => (
                  <ForecastInfoHourly
                    hourlyWeather={hourlyWeather}
                    key={hourlyWeather.id}
                  />
                ))}
              </ForecastSlider>
            )}
          </View>
        </LinearGradient>
      </Animated.View>
      <View style={styles.bottomBarContainer}>
        <BottomBarControls />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  menuBgImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },

  buttonDrag: {
    width: "100%",
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },

  dragLine: {
    width: 48,
    height: 8,
    borderRadius: 10,
    backgroundColor: colors.darkGray,
  },

  menuDisplay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
    zIndex: 1,
  },

  bottomBarContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
  },

  menuBackground: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.lightBlueElements,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
});
