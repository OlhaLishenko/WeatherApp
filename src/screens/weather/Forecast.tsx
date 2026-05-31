import { useAsyncStorage } from "@/api/storageCity";
import { Icons } from "@/assets/static";
import ForecastList from "@/components/SearchScreen/ForecastList";
import InputSearch from "@/components/SearchScreen/InputSearch";
import { customStyles } from "@/styles/customStyles";
import { FavoriteCity } from "@/types/FavoriteCity";
import { useAppSelector } from "@/types/reduxTypes";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import WeatherLayout from "./layout";
import * as Crypto from "expo-crypto";

export default function Forecast() {
  const searchCityTemp = useAppSelector((state) => state.searchCityTemp.data);
  const currentWeatherLocation = useAppSelector(
    (state) => state.searchCity.data,
  );
  const {
    value: cities,
    saveInStorage: saveCities,
    deleteFromStorage: removeCity,
    isLoading,
  } = useAsyncStorage<FavoriteCity>("favoriteCities", []);
  const [activeBtnFavorites, setActiveBtnFavorites] = useState<boolean>(false);

  useEffect(() => {
    const isFavorite = cities.some(
      (c) => c.cityName === currentWeatherLocation.city,
    );
    setActiveBtnFavorites(isFavorite);
  }, [cities, currentWeatherLocation.city]);

  const addToFoverites = () => {
    const newCity: FavoriteCity = {
      id: Crypto.randomUUID(),
      cityName: currentWeatherLocation.city,
      country: currentWeatherLocation.country,
      latitude: currentWeatherLocation.latitude,
      longitude: currentWeatherLocation.longitude,
    };
    const alreadyExists = cities.some((city) => city.id === newCity.id);

    if (alreadyExists) {
      removeCity(newCity);
      setActiveBtnFavorites(false);
    } else {
      saveCities(newCity);
      setActiveBtnFavorites(true);
    }
  };

  return (
    <WeatherLayout>
      <View style={styles.headerWrapper}>
        <InputSearch />

        <TouchableOpacity style={styles.button} onPress={addToFoverites}>
          {activeBtnFavorites ? (
            <Icons.StarIconActive style={styles.buttonIcon} />
          ) : (
            <Icons.StarIcon style={styles.buttonIcon} />
          )}
        </TouchableOpacity>
        {isLoading && <Text>loading...</Text>}
      </View>

      <View style={{ flex: 1, flexDirection: "column", gap: 20 }}>
        {searchCityTemp.map((day) => (
          <ForecastList tempData={day} key={day.weekDay} />
        ))}
      </View>
    </WeatherLayout>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },

  button: {
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    height: "70%",
    aspectRatio: 1,
    ...customStyles.boxShadowStrength,
  },

  buttonIcon: {
    width: "60%",
    height: "60%",
  },
});
