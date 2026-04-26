import { WeeklyTemp } from "./WeeklyTemp";

export type TempState = {
  data: WeeklyTemp[];
  loading: boolean;
  error: string;
};
