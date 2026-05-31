import DeleteBtn from "@/components/Elements/DeleteBtn";
import Dot from "@/components/Elements/Dot";
import { colors } from "@/constants/colors";
import { Typography } from "@/constants/fontsConfiguration";
import { tempIndicator } from "@/constants/variables";
import { FavoriteCityWeather } from "@/types/FavoriteCity";
import { useAppSelector } from "@/types/reduxTypes";
import { ForecastImage } from "@/utils/findForecastImage";
import { getWeatherIcons } from "@/utils/getWeatherIcons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FavoriteIndicator from "./FavoriteIndicator";

export default function FavoriteCityItem({
  city,
  image,
  deleteCity,
}: {
  city: FavoriteCityWeather;
  image: ForecastImage;
  deleteCity: (name: FavoriteCityWeather) => void;
}) {
  const [isDelBtn, setIsBtn] = useState(false);
  const { rainSum, cloudCover, windSpeed } = city.weather;
  const { city: currentCity } = useAppSelector((state) => state.locationName);

  const currentTemp =
    Math.round(city.weather.temp) > 0
      ? `+${Math.round(city.weather.temp)}`
      : Math.round(city.weather.temp);

  const indicators = getWeatherIcons({
    rainSum,
    cloudCover,
    windSpeed,
  });

  const handleDeleteCity = (city: FavoriteCityWeather) => {
    if (city.cityName === null) {
      return;
    }

    deleteCity(city);
  };

  const opacityAnim = useRef(new Animated.Value(1)).current;

  const handleShowDelBtn = () => {
    const newValue = isDelBtn === false ? 0.5 : 1;

    setIsBtn(!isDelBtn);
    Animated.timing(opacityAnim, {
      toValue: newValue,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };
  const isActiveLocation = city.cityName === currentCity;

  return (
    <LinearGradient
      colors={["transparent", colors.lightBlue, "transparent"]}
      locations={[0, 0.5, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[
        styles.favoriteContainer,
        isActiveLocation && styles.activeFavoriteContainer,
      ]}
    >
      <Animated.View
        style={{
          opacity: opacityAnim,
          flex: 1,
          flexDirection: "column",
          gap: 20,
        }}
      >
        <View style={styles.favoriteContent}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                gap: 5,
              }}
            >
              <View style={styles.favoriteIndicator} />
              <View style={styles.contentNameWrapper}>
                <Text
                  style={{ ...Typography.secondary, color: colors.mainText }}
                >
                  {city.cityName}
                </Text>
                <Text style={{ ...Typography.smallGrey }}>{city.country}</Text>
              </View>
            </View>

            <View style={{ flexDirection: "row" }}>
              <View style={styles.contentInfoWrapper}>
                <View style={styles.contentInfo}>
                  <Text style={Typography.secondary}>
                    {currentTemp}
                    {tempIndicator}
                  </Text>
                  <Text style={{ fontSize: 20 }}>{image.imageSmall}</Text>
                </View>

                <Text style={{ ...Typography.smallGrey }}>{image.title}</Text>
              </View>
              <TouchableOpacity
                style={{
                  marginLeft: 25,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={handleShowDelBtn}
              >
                <View style={{ flexDirection: "column", gap: 2 }}>
                  {Array.from({ length: 3 }, (_, i) => (
                    <Dot color={colors.textGray} key={i} />
                  ))}
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View
          style={{ height: 1, flex: 1, backgroundColor: colors.whileOpacity }}
        />
        <View style={styles.indicatorList}>
          {indicators.map((indicator) => (
            <FavoriteIndicator indicator={indicator} key={indicator.id} />
          ))}
        </View>
      </Animated.View>
      {isDelBtn && (
        <DeleteBtn deleteCity={handleDeleteCity} cityToDelete={city} />
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  favoriteContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.whileOpacity,
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderWidth: 0.4,
    borderColor: colors.textGray,
    position: "relative",
  },

  activeFavoriteContainer: {
    borderColor: colors.mainText,
    borderWidth: 0.8,
  },

  favoriteIndicator: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: "#7d78ff",
    marginRight: 10,
    marginTop: 7,
  },

  favoriteContent: {
    flex: 1,
    flexDirection: "row",
  },

  contentNameWrapper: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 5,
  },

  contentInfoWrapper: {
    flexDirection: "column",
    gap: 5,
    alignItems: "center",
  },
  contentInfo: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },

  indicatorList: {
    flexDirection: "row",
    gap: 15,
    justifyContent: "flex-end",
  },
});
