import { Levels } from "@/enums/Levels";

export type ForecastSummary = {
  temp: number;
  wind: Levels;
  cloud: Levels;
  rain: Levels;
};
