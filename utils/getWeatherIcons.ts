import { IndicatorType, WeatherIndicator } from "@/types/IndicatorsType";
import { ImageSourcePropType } from "react-native";

const rainIcon: ImageSourcePropType = require("@/assets/images/forecast/cloud-rain-solid.png");
const windIcon: ImageSourcePropType = require("@/assets/images/forecast/wind-solid.png");
const cloudIcon: ImageSourcePropType = require("@/assets/images/forecast/cloud-regular.png");

export const indicatorsData: IndicatorType[] = [
  {
    id: "1",
    name: "rainSum",
    unit: "mm",
    icon: rainIcon,
  },
  {
    id: "2",
    name: "windSpeed",
    unit: "km/h",
    icon: windIcon,
  },
  {
    id: "3",
    name: "cloudCover",
    unit: "%",
    icon: cloudIcon,
  },
];

// {
//   windSpeed: number;
//   cloudCover: number;
//   rainSum: number;
// }

export function getWeatherIcons(
  weatherData: WeatherIndicator,
): (IndicatorType & { value: number })[] {
  return indicatorsData.map((indicator) => ({
    ...indicator,
    value: weatherData[indicator.name],
  }));
}
