import { actions as searchCityActions } from "@/store/searchCity";
import { actions as searchCityTempActions } from "@/store/searchCityTempSlice";
import { NavigationType } from "@/types/NavigationType";
import { useAppDispatch, useAppSelector } from "@/types/reduxTypes";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
const menuBg = require("@/assets/images/menu-bg.png");
const menuAdd = require("@/assets/images/addBtn.png");
const iconMenu = require("@/assets/images/List.png");
const iconMap = require("@/assets/images/Map.png");

export default function BottomBarControls() {
  const navigation = useNavigation<NavigationType>();
  const weeklyWeather = useAppSelector((state) => state.weeklyTemp.data);
  const locationName = useAppSelector((state) => state.locationName);
  const coordinates = useAppSelector((state) => state.coordinates.data);
  const dispatch = useAppDispatch();

  const handleNavigate = () => {
    dispatch(searchCityTempActions.setData(weeklyWeather));
    dispatch(
      searchCityActions.setData({
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        country: locationName.country,
        city: locationName.city,
      }),
    );
    navigation.navigate("Forecast");
  };

  return (
    <ImageBackground
      source={menuBg}
      style={[
        StyleSheet.absoluteFill,
        {
          position: "relative",
          height: 100,
          bottom: 0,
          right: 0,
          left: 0,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
      ]}
      resizeMode='cover'
    >
      <View style={styles.bottomBarContent}>
        <TouchableOpacity style={styles.icon} onPress={handleNavigate}>
          <Image
            source={iconMenu}
            resizeMode='contain'
            style={StyleSheet.absoluteFill}
          />
        </TouchableOpacity>

        <TouchableOpacity style={{ flex: 1 }}></TouchableOpacity>

        <TouchableOpacity style={styles.icon}>
          <Image
            source={iconMap}
            resizeMode='contain'
            style={StyleSheet.absoluteFill}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={{ flex: 1, position: "absolute" }}>
        <Image source={menuAdd} resizeMode='contain' />
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 50,
    height: 50,
  },

  bottomBarContent: {
    position: "absolute",
    flex: 1,
    flexDirection: "row",
    marginInline: 20,
  },
});
