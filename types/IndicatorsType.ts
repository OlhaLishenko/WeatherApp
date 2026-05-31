import { ImageSourcePropType } from "react-native";
import { SvgProps } from "react-native-svg";

type Indicator = {
  unit: string;
  icon: React.FC<SvgProps>;
};

export type IndicatorsType = {
  rainSum: Indicator;
  windSpeed: Indicator;
  cloudCover: Indicator;
};

////////

export type IndicatorType = {
  id: string;
  name: "rainSum" | "windSpeed" | "cloudCover";
  unit: string;
  icon: ImageSourcePropType;
};

export type IndicatorWithWeatherData = IndicatorType & { value: number };

export type WeatherIndicator = {
  windSpeed: number;
  cloudCover: number;
  rainSum: number;
};
