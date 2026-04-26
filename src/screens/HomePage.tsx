//#region imports
import MenuMain from "@/components/MenuBar/MenuMain";
import { colors } from "@/constants/colors";
// import { actions as currentDayActions } from "@/store/currentDay";
import { LoadCurrentLocationName } from "@/store/locationNameSlice";
import { useAppDispatch, useAppSelector } from "@/types/reduxTypes";
import { fetchData } from "@/utils/createCustomSlice";
import { getCurrentDay } from "@/utils/getCurrentDay";
import { useEffect } from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";

const imageBg = require("@/assets/images/bg-main.png");
const imageHome = require("@/assets/images/House.png");
//#endregion

export default function HomePage() {
  const coordinates = useAppSelector((state) => state.coordinates);
  const locationName = useAppSelector((state) => state.locationName);
  const weeklyTemp = useAppSelector((state) => state.weeklyTemp);
  const dispatch = useAppDispatch();

  const { latitude, longitude } = coordinates.coordinates;

  useEffect(() => {
    if (!latitude || !longitude) return;
    const fetchInitData = async () => {
      await dispatch(LoadCurrentLocationName());
      await dispatch(fetchData());
      // const temp = weeklyTemp;
      // dispatch(actions.setData(temp));
      // const currentWeeklyTemp = await loadWeeklyTemp(latitude, longitude);
      // const tempData = currentWeeklyTemp.daily;
      // const formattedData: WeeklyTemp[] = tempData.time.map(
      //   (_: any, index: number) => ({
      //     id: index,
      //     weatherType: "weekly",
      //     weekDay: weekDayNames[index],
      //     temp: Math.round(tempData.temperature_2m_max[index]),
      //     rainSum: tempData.rain_sum[index],
      //     cloudCover: tempData.cloud_cover_mean[index],
      //     windSpeed: tempData.wind_speed_10m_max[index],
      //   }),
      // );
      // dispatch(weeklyTempActions.setWeeklyTempData(formattedData));
      // catch {
      //   dispatch(weeklyTempActions.setWeeklyTempError());
      // }
    };

    fetchInitData();
  }, [dispatch, latitude, longitude]);

  const currentDay = getCurrentDay();
  const currentTemp = weeklyTemp.data[currentDay.dayNumber]?.temp;

  // console.log(locationName.city);

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={imageBg} resizeMode='cover' style={styles.bg}>
        <View style={styles.mainScreenContent}>
          <View style={styles.textContainer}>
            <Text style={styles.textMainTown}>
              {locationName.city}, {locationName.country}
            </Text>
            <Text style={styles.textMainTown}>{currentTemp}°</Text>
            <Text style={styles.textMainTown}>{currentDay.dayName}</Text>
          </View>
          <View
            style={{
              flex: 1,
              position: "relative",
            }}
          >
            <Image
              source={imageHome}
              style={styles.imageHome}
              resizeMode='contain'
            />
          </View>
        </View>
        <MenuMain currentDay={currentDay} />
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

  textMainTown: {
    fontSize: 34,
    fontWeight: "400",
    fontStyle: "normal",
    lineHeight: 41,
    letterSpacing: 0.37400001287460327,
    textAlign: "center",
    color: colors.mainText,
  },

  textMainDescript: {
    fontSize: 20,
    fontWeight: "600",
    fontStyle: "normal",
    lineHeight: 24,
    letterSpacing: 0.3799999952316284,
    textAlign: "center",
    color: colors.mainText,
  },

  textMainTownTemp: {
    fontSize: 96,
    fontWeight: "100",
    fontStyle: "normal",
    lineHeight: 70,
    letterSpacing: 0.37400001287460327,
    textAlign: "center",
    color: colors.mainText,
  },

  bg: {
    flex: 1,
    justifyContent: "flex-end",
  },

  imageHome: {},

  menuBg: {},
});
