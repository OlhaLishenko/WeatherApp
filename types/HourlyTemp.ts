export type HourlyTemp = {
  id: number;
  weatherType: "hourly";
  time: string;
  temp: number;
  rainSum: number;
  cloudCover: number;
  windSpeed: number;
  uvIndex: number;
  isDay: boolean;
};

export type HourlyData = {
  time: string[];
  temp: number[];
  rainSum: number[];
  cloudCover: number[];
  windSpeed: number[];
  uvIndex: number[];
  isDay: boolean[];
};
