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
