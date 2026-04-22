import { forecastImg } from "@/constants/images";
import { Levels } from "@/enums/Levels";
import { ForecastSummary } from "@/types/ForecastSummary";
import { HourlyTemp } from "@/types/HourlyTemp";
import { WeeklyTemp } from "@/types/WeeklyTemp";

const findLevel = (indicator: string, value: number) => {
  switch (indicator) {
    case "wind":
      if (value < 6) return Levels.normal;
      if (value < 20) return Levels.middle;
      if (value < 39) return Levels.strong;
      return Levels.extra;

    case "cloud":
      if (value <= 10) return Levels.normal;
      if (value <= 50) return Levels.middle;
      if (value <= 75) return Levels.strong;
      return Levels.extra;

    case "rain":
      if (value === 0) return Levels.normal;
      if (value <= 10) return Levels.middle;
      if (value <= 30) return Levels.strong;
      return Levels.extra;

    default:
      return Levels.normal;
  }
};

const makeForecastInfo = (
  dayTemp: WeeklyTemp | HourlyTemp,
): ForecastSummary => ({
  temp: dayTemp.temp,
  wind: findLevel("wind", dayTemp.windSpeed),
  cloud: findLevel("cloud", dayTemp.cloudCover),
  rain: findLevel("rain", dayTemp.rainSum),
});

export const findForecastImage = (temp: WeeklyTemp | HourlyTemp) => {
  const summary: ForecastSummary = makeForecastInfo(temp);

  if (summary.rain === Levels.extra && summary.wind === Levels.extra) {
    return forecastImg.storm;
  }

  if (summary.wind === Levels.strong || summary.wind === Levels.extra) {
    if (summary.rain === Levels.middle || summary.rain === Levels.strong) {
      return forecastImg.sunCloudStrongRain;
    }
    return forecastImg.sunCloudStrongWing;
  }

  if (summary.rain === Levels.extra) {
    return forecastImg.rain;
  }

  if (summary.rain === Levels.strong) {
    return forecastImg.sunCloudStrongRain;
  }

  if (summary.rain === Levels.middle) {
    return forecastImg.sunCloudMidRain;
  }

  if (summary.cloud === Levels.extra) {
    return forecastImg.cloudy;
  }

  if (summary.cloud === Levels.strong) {
    return forecastImg.fog;
  }

  if (summary.cloud === Levels.middle) {
    return forecastImg.sunCloud;
  }

  if (summary.rain === Levels.normal && summary.cloud === Levels.middle) {
    return forecastImg.drizzle;
  }

  return forecastImg.sunny;
};
