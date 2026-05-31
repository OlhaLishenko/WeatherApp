import { fetchTempList } from "@/api/loadCurrentTempts";
import { useAsyncStorage } from "@/api/storageCity";
import { colors } from "@/constants/colors";
import { FavoriteCity, FavoriteCityWeather } from "@/types/FavoriteCity";
import { findForecastImage } from "@/utils/findForecastImage";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import WeatherLayout from "../layout";
import FavoriteCityItem from "./FavoriteCityItem";

export default function FavoriteCities() {
  const {
    value: cities,
    deleteFromStorage: removeCity,
    isLoading,
  } = useAsyncStorage<FavoriteCity>("favoriteCities", []);
  const [activeWeather, setActiveWeather] = useState<FavoriteCityWeather[]>([]);
  const [error, setError] = useState<string>("");

  // useEffect(() => {
  //   AsyncStorage.clear();
  // }, []);

  useEffect(() => {
    if (isLoading) return;
    const fetchCitiesTemp = async () => {
      try {
        const updatedData: FavoriteCityWeather[] = await fetchTempList(cities);
        setActiveWeather(updatedData);
      } catch {
        setError("Can't load temp data for cities");
      }
    };
    fetchCitiesTemp();
  }, [cities, isLoading]);

  const getImage = (city: FavoriteCityWeather) => {
    return findForecastImage({
      temp: city.weather.temp,
      rainSum: city.weather.rainSum,
      cloudCover: city.weather.cloudCover,
      windSpeed: city.weather.windSpeed,
    });
  };

  const deleteCity = (cityToDelete: FavoriteCityWeather) => {
    setActiveWeather((prev) =>
      [...prev].filter((city) => city.id !== cityToDelete.id),
    );
    removeCity({
      id: cityToDelete.id,
      cityName: cityToDelete.cityName,
      country: cityToDelete.country,
      latitude: cityToDelete.latitude,
      longitude: cityToDelete.longitude,
    });
  };

  return (
    <WeatherLayout>
      <Spinner
        visible={isLoading}
        textContent={"Loading..."}
        animation='slide'
        overlayColor={colors.overlayBlueDark}
      />
      <ScrollView style={{ flex: 1, paddingHorizontal: 10 }}>
        {!isLoading && activeWeather.length !== 0 && (
          <View style={styles.favoriteContainer}>
            {activeWeather.map((activeCity) => (
              <FavoriteCityItem
                city={activeCity}
                key={activeCity.cityName}
                image={getImage(activeCity)}
                deleteCity={deleteCity}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </WeatherLayout>
  );
}

const styles = StyleSheet.create({
  favoriteContainer: {
    flexDirection: "column",
    gap: 20,
  },
});
