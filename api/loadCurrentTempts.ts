import { FavoriteCity } from "@/types/FavoriteCity";
import { loadCurrentTemp } from "./loadCurrentTemp";

export async function fetchTempList(cityList: FavoriteCity[]) {
  return await Promise.all(
    cityList.map(async (city: FavoriteCity) => {
      const weatherData = await loadCurrentTemp(city.latitude, city.longitude);
      return {
        ...city,
        weather: {
          temp: weatherData.temperature,
          rainSum: weatherData.rain,
          cloudCover: weatherData.cloudCover,
          windSpeed: weatherData.windSpeed,
        },
      };
    }),
  );
}
