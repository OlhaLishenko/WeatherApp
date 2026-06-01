import { Dimensions } from "react-native";

export const weatherIndicators = ["Time", "Temp", "Rain", "Wind", "UV"];
export const totalHoursPerDay = 24;
export const tempIndicator = "°C";
export const SCREEN_HEIGHT = Dimensions.get("window").height;
export const MIN_HEIGHT = SCREEN_HEIGHT * 0.4;
export const MAX_HEIGHT = SCREEN_HEIGHT * 0.85;
