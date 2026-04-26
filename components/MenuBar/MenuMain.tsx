import { loadHourlyTemp } from "@/api/loadHourlyTemp";
import { colors } from "@/constants/colors";
import { ForecastType } from "@/enums/ForecastType";
import { actions as actionsHourly } from "@/store/hourlyTempSlice";
import { DayInfo } from "@/types/DayInfo";
import { HourlyData, HourlyTemp } from "@/types/HourlyTemp";
import { useAppDispatch, useAppSelector } from "@/types/reduxTypes";
import { useEffect, useRef, useState } from "react";
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
const SCREEN_HEIGHT = Dimensions.get("window").height;
const MIN_HEIGHT = SCREEN_HEIGHT * 0.4; // початкова висота
const MAX_HEIGHT = SCREEN_HEIGHT * 0.85; // максимальна висота

type MenuMainType = {
  currentDay: DayInfo;
};

export default function MenuMain({ currentDay }: MenuMainType) {
  const { data: coordinates } = useAppSelector((state) => state.coordinates);
  const { latitude, longitude } = coordinates;
  const dispatch = useAppDispatch();
  const totalHoursPerDay = useRef<number>(24);
  const [activeForecastType, setActiveForecastType] = useState<ForecastType>(
    ForecastType.WEEKLY,
  );

  useEffect(() => {
    if (!latitude || !longitude) return;

    const loadHourlyTempData = async () => {
      try {
        const hourlyTempData = await loadHourlyTemp(latitude, longitude);
        const hourlyData = hourlyTempData.hourly; // { time: [], ...}

        const startIndex =
          (currentDay.dayNumber - 2) * totalHoursPerDay.current;
        const endIndex = startIndex + totalHoursPerDay.current;

        const formattedData: HourlyData = {
          time: hourlyData.time.slice(startIndex, endIndex),
          temp: hourlyData.temperature_2m.slice(startIndex, endIndex),
          rainSum: hourlyData.rain.slice(startIndex, endIndex),
          cloudCover: hourlyData.cloud_cover.slice(startIndex, endIndex),
          windSpeed: hourlyData.wind_speed_10m.slice(startIndex, endIndex),
          uvIndex: hourlyData.uv_index.slice(startIndex, endIndex),
          isDay: hourlyData.is_day.slice(startIndex, endIndex),
        };

        const hourlyIterationData: HourlyTemp[] = formattedData.time.map(
          (_: any, index: number) => ({
            id: index,
            weatherType: "hourly",
            time: formattedData.time[index],
            temp: formattedData.temp[index],
            rainSum: formattedData.rainSum[index],
            cloudCover: formattedData.cloudCover[index],
            windSpeed: formattedData.windSpeed[index],
            uvIndex: formattedData.uvIndex[index],
            isDay: formattedData.isDay[index],
          }),
        );

        dispatch(actionsHourly.setHourlyTempData(hourlyIterationData));
      } catch {
        dispatch(actionsHourly.setHourlyTempError());
      }
    };

    loadHourlyTempData();
  }, [currentDay.dayNumber, dispatch, latitude, longitude]);

  const menuHeight = useSharedValue(MIN_HEIGHT);
  const startHeight = useSharedValue(MIN_HEIGHT);

  const dragGesture = Gesture.Pan()
    .onStart(() => {
      startHeight.value = menuHeight.value;
    })
    .onUpdate((event) => {
      // тягнемо вгору — висота збільшується
      const newHeight = startHeight.value - event.translationY;
      menuHeight.value = Math.min(Math.max(newHeight, MIN_HEIGHT), MAX_HEIGHT);
    })
    .onEnd(() => {
      // прилипає до найближчої точки
      const middle = (MIN_HEIGHT + MAX_HEIGHT) / 2;
      menuHeight.value = withSpring(
        menuHeight.value > middle ? MAX_HEIGHT : MIN_HEIGHT,
        { damping: 20, stiffness: 120 },
      );
    });

  const animatedStyle = useAnimatedStyle(() => ({
    height: menuHeight.value,
  }));

  const weeklyWeather = useAppSelector((state) => state.weeklyTemp.data);
  const hourlyWeather = useAppSelector((state) => state.hourlyTemp.data);
  const isWeeklyWeatherData = activeForecastType === ForecastType.WEEKLY;

  return (
    <>
      <Animated.View style={[styles.menuDisplay, animatedStyle]}>
        <GestureDetector gesture={dragGesture}>
          <View style={styles.buttonDrag}>
            <View style={styles.dragLine} />
          </View>
        </GestureDetector>

        <View style={styles.menuBackground}></View>

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
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
    zIndex: 1,
  },

  bottomBarContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 2,
  },

  menuBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.lightBlueElements,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
});
