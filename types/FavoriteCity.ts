export type FavoriteCity = {
  id: string;
  cityName: string | null;
  country: string | null;
  latitude: number | null;
  longitude: number | null;
};

export type CurrentWeather = {
  temp: number;
  rainSum: number;
  cloudCover: number;
  windSpeed: number;
};

export type FavoriteCityWeather = FavoriteCity & { weather: CurrentWeather };
