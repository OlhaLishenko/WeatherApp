import { weekDayNames } from "@/constants/weekDayNames";
import { WeeklyTemp } from "@/types/WeeklyTemp";

export function normolizeTempData(initTempData: any) {
  const tempData = initTempData.daily;
  const formattedTempData: WeeklyTemp[] = tempData.time.map(
    (_: any, index: number) => ({
      id: index,
      weatherType: "weekly",
      weekDay: weekDayNames[index],
      temp: Math.round(tempData.temperature_2m_max[index]),
      rainSum: tempData.rain_sum[index],
      cloudCover: tempData.cloud_cover_mean[index],
      windSpeed: tempData.wind_speed_10m_max[index],
    }),
  );

  return formattedTempData;
}
