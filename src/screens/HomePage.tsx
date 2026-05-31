//#region imports
import { loadCurrentTemp } from "@/api/loadCurrentTemp";
import MenuMain from "@/components/MenuBar/MenuMain";
import { colors } from "@/constants/colors";
import { Typography } from "@/constants/fontsConfiguration";
import { tempIndicator } from "@/constants/variables";
import { LoadCurrentLocationName } from "@/store/locationNameSlice";
import { fetchWeeklyData } from "@/store/weeklyTempSlice";
import { DayInfo } from "@/types/DayInfo";
import { CurrentWeather } from "@/types/FavoriteCity";
import { useAppDispatch, useAppSelector } from "@/types/reduxTypes";
import { getCurrentDay } from "@/utils/getCurrentDay";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";

const imageBg = require("@/assets/images/bg-main.png");
const imageHome = require("@/assets/images/House.png");
//#endregion

export default function HomePage() {
  const coordinates = useAppSelector((state) => state.coordinates);
  const locationName = useAppSelector((state) => state.locationName);
  const weeklyTemp = useAppSelector((state) => state.weeklyTemp);
  const dispatch = useAppDispatch();

  const [currentTemp, setCurrentTemp] = useState<CurrentWeather | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const { latitude, longitude } = coordinates.data;

  useEffect(() => {
    if (!latitude || !longitude) return;
    const fetchInitData = async () => {
      try {
        await dispatch(LoadCurrentLocationName());
        await dispatch(fetchWeeklyData());
        const currentWeather = await loadCurrentTemp(
          coordinates.data.latitude,
          coordinates.data.longitude,
        );

        setCurrentTemp({
          temp: currentWeather.temperature,
          rainSum: currentWeather.rain,
          cloudCover: currentWeather.cloudCover,
          windSpeed: currentWeather.windSpeed,
        });
      } catch {
        setError("Can not fetch forecast");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitData();
  }, [
    coordinates.data.latitude,
    coordinates.data.longitude,
    dispatch,
    latitude,
    longitude,
  ]);

  const currentDay: DayInfo = getCurrentDay();

  // const currentTemp = weeklyTemp.data[currentDay.dayNumber]?.temp;

  console.log(currentTemp);
  console.log("location " + locationName.city);

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={imageBg} resizeMode='cover' style={styles.bg}>
        <LinearGradient
          colors={[colors.transparent, colors.darkBlueElements]}
          style={{ flex: 1 }}
          start={[0.9, 0]}
          end={[1, 1]}
        >
          <View style={styles.mainScreenContent}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>
                {locationName.city}, {locationName.country}
              </Text>
              {isLoading ? (
                <Text>Loading</Text>
              ) : error && currentTemp === null ? (
                <Text>{error}</Text>
              ) : (
                <Text style={styles.title}>
                  {currentTemp?.temp}
                  {tempIndicator}
                </Text>
              )}

              <Text style={styles.title}>{currentDay.dayName}</Text>
            </View>
            <View
              style={{
                flex: 1,
                position: "relative",
              }}
            >
              <Image source={imageHome} resizeMode='contain' />
            </View>
          </View>
          <MenuMain currentDay={currentDay} />
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.blueDark,
    minHeight: "100%",
    flexDirection: "column",
    gap: 48,
  },

  mainScreenContent: {
    flex: 1,
    flexDirection: "column",
    gap: 23,
    position: "relative",
  },

  textContainer: {
    marginTop: 100,
    flexDirection: "column",
    gap: 12,
  },

  title: {
    ...Typography.big,
    textAlign: "center",
  },

  bg: {
    flex: 1,
    justifyContent: "flex-end",
  },
});
