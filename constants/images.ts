import { Icons } from "@/assets/static";
import { IndicatorsType } from "@/types/IndicatorsType";
import { ImageSourcePropType } from "react-native";
import settings from "../assets/images/icon-units.svg";
import Logo from "../assets/images/logo.svg";

export const images = {
  logo: Logo,
  settings: settings,
};

export type WeatherType =
  | "sunny"
  | "sunCloud"
  | "sunCloudMidRain"
  | "sunCloudStrongRain"
  | "sunCloudStrongWind"
  | "rain"
  | "cloudly"
  | "fog"
  | "drizzle"
  | "storm"
  | "snow";

export const forecastImg: Record<WeatherType, ImageSourcePropType> = {
  sunny: require("@/assets/images/forecast/icon-sunny.webp"),
  sunCloud: require("@/assets/images/forecast/icon-sun-cloud.webp"),
  sunCloudMidRain: require("@/assets/images/forecast/icon-sun-cloud-mid-rain.png"),
  sunCloudStrongRain: require("@/assets/images/forecast/icon-sun-cloud-strong-rain.png"),
  sunCloudStrongWind: require("@/assets/images/forecast/icon-sun-cloud-fast-wing.png"),
  rain: require("@/assets/images/forecast/icon-rain.webp"),
  cloudly: require("@/assets/images/forecast/icon-overcast.webp"),
  fog: require("@/assets/images/forecast/icon-fog.webp"),
  drizzle: require("@/assets/images/forecast/icon-drizzle.webp"),
  storm: require("@/assets/images/forecast/icon-storm.webp"),
  snow: require("@/assets/images/forecast/icon-snow.webp"),
};

export const indicatorsData: IndicatorsType = {
  rainSum: {
    unit: "mm",
    icon: Icons.RainIcon,
  },
  windSpeed: {
    unit: "km/h",
    icon: Icons.WindIcon,
  },
  cloudCover: {
    unit: "%",
    icon: Icons.CloudIcon,
  },
};
