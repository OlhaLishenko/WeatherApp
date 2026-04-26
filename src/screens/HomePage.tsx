//#region imports
import MenuMain from "@/components/MenuBar/MenuMain";
import { colors } from "@/constants/colors";
import { LoadCurrentLocationName } from "@/store/locationNameSlice";
import { fetchData } from "@/store/weeklyTempSlice";
import { useAppDispatch, useAppSelector } from "@/types/reduxTypes";
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

  const { latitude, longitude } = coordinates.data;

  useEffect(() => {
    if (!latitude || !longitude) return;
    const fetchInitData = async () => {
      await dispatch(LoadCurrentLocationName());
      await dispatch(fetchData());
    };

    fetchInitData();
  }, [dispatch, latitude, longitude]);

  const currentDay = getCurrentDay();
  const currentTemp = weeklyTemp.data[currentDay.dayNumber]?.temp;

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
