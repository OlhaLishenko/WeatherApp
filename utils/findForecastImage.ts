import { forecastImg } from "@/constants/images";
import { Levels } from "@/enums/Levels";
import { CurrentWeather } from "@/types/FavoriteCity";
import { ForecastSummary } from "@/types/ForecastSummary";
import { HourlyTemp } from "@/types/HourlyTemp";
import { WeeklyTemp } from "@/types/WeeklyTemp";
import { ImageSourcePropType } from "react-native";

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
  dayTemp: WeeklyTemp | HourlyTemp | CurrentWeather,
): ForecastSummary => ({
  temp: dayTemp.temp,
  wind: findLevel("wind", dayTemp.windSpeed),
  cloud: findLevel("cloud", dayTemp.cloudCover),
  rain: findLevel("rain", dayTemp.rainSum),
});

export type ForecastImage = {
  imageBig: ImageSourcePropType;
  imageSmall: string;
  title: string;
};

export const findForecastImage = (
  temp: WeeklyTemp | HourlyTemp | CurrentWeather,
): ForecastImage => {
  const summary: ForecastSummary = makeForecastInfo(temp);

  if (summary.rain === Levels.extra && summary.wind === Levels.extra) {
    return {
      imageBig: forecastImg.storm,
      imageSmall: "🌀",
      title: "Storm",
    };
  }

  if (summary.wind === Levels.strong || summary.wind === Levels.extra) {
    if (summary.rain === Levels.middle || summary.rain === Levels.strong) {
      return {
        imageBig: forecastImg.sunCloudStrongRain,
        imageSmall: "🌦️",
        title: "Strong rain",
      };
    }
    return {
      imageBig: forecastImg.sunCloudStrongWind,
      imageSmall: "🌦️",
      title: "Strong wind",
    };
  }

  if (summary.rain === Levels.extra) {
    return {
      imageBig: forecastImg.rain,
      imageSmall: "🌧️",
      title: "Rain",
    };
  }

  if (summary.rain === Levels.strong) {
    return {
      imageBig: forecastImg.sunCloudStrongRain,
      imageSmall: "☔",
      title: "Strong rain",
    };
  }

  if (summary.rain === Levels.middle) {
    return {
      imageBig: forecastImg.sunCloudMidRain,
      imageSmall: "🌦️",
      title: "Middle rain",
    };
  }

  if (summary.cloud === Levels.extra) {
    return {
      imageBig: forecastImg.cloudly,
      imageSmall: "☁️",
      title: "Cloudly",
    };
  }

  if (summary.cloud === Levels.strong) {
    return {
      imageBig: forecastImg.fog,
      imageSmall: "🌫️",
      title: "Fog",
    };
  }

  if (summary.cloud === Levels.middle) {
    return {
      imageBig: forecastImg.sunCloud,
      imageSmall: "🌤️",
      title: "Partly cloudly",
    };
  }

  if (summary.rain === Levels.normal && summary.cloud === Levels.normal) {
    return {
      imageBig: forecastImg.drizzle,
      imageSmall: "💧",
      title: "Drizzle",
    };
  }

  return {
    imageBig: forecastImg.sunny,
    imageSmall: "☀️",
    title: "Sunny",
  };
};
