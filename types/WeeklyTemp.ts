export type WeeklyTemp = {
  id: number;
  weatherType: "weekly";
  weekDay: string;
  temp: number;
  windSpeed: number;
  cloudCover: number;
  rainSum: number;
  sunrise: string;
  uvIndex: number;
  daylightDuration: number;
  surfacePressure: number;
  humidity: number;
  visibility: number;
};

export interface FavoriteCity {
  cityName: string | null;
  country: string | null;
  latitude: number | null;
  longitude: number | null;
  weather?: {
    temp: number;
    rain: number;
    cloudCover: number;
    windSpeed: number;
  };
}
