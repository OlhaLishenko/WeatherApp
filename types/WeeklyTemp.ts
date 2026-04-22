export type WeeklyTemp = {
  id: number;
  weatherType: "weekly";
  data: string;
  weekDay: string;
  temp: number;
  windSpeed: number;
  cloudCover: number;
  rainSum: number;
};
