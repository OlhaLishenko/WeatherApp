import { totalHoursPerDay } from "@/constants/variables";
import { weekDayNames } from "@/constants/weekDayNames";
import { DayInfo } from "@/types/DayInfo";
import { HourlyData, HourlyTemp } from "@/types/HourlyTemp";
import { WeeklyTemp } from "@/types/WeeklyTemp";

export function normolizeTempData(
  initTempData: any,
  mode: "hourly" | "weekly",
  currentDay?: DayInfo,
): WeeklyTemp[] | HourlyTemp[] {
  if (mode === "weekly") {
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
        sunrise: tempData.sunrise[index],
        uvIndex: tempData.uv_index_max[index],
        daylightDuration: tempData.daylight_duration[index],
        surfacePressure: tempData.surface_pressure_mean[index],
        humidity: tempData.relative_humidity_2m_mean[index],
        visibility: tempData.visibility_mean[index],
      }),
    );

    return formattedTempData;
  }
  const startIndex = (currentDay!.dayNumber - 2) * totalHoursPerDay;
  const endIndex = startIndex + totalHoursPerDay;

  const formattedData: HourlyData = {
    time: initTempData.time.slice(startIndex, endIndex),
    temp: initTempData.temperature_2m.slice(startIndex, endIndex),
    rainSum: initTempData.rain.slice(startIndex, endIndex),
    cloudCover: initTempData.cloud_cover.slice(startIndex, endIndex),
    windSpeed: initTempData.wind_speed_10m.slice(startIndex, endIndex),
    uvIndex: initTempData.uv_index.slice(startIndex, endIndex),
    isDay: initTempData.is_day.slice(startIndex, endIndex),
  };

  const hourlyIterationData: HourlyTemp[] = formattedData.time.map(
    (_: any, index: number) => ({
      id: index,
      weatherType: "hourly",
      time: formattedData.time[index],
      temp: formattedData.temp[index],
      rainSum: formattedData.rainSum[index],
      cloudCover: formattedData.cloudCover[index],
      windSpeed: formattedData.windSpeed[index],
      uvIndex: formattedData.uvIndex[index],
      isDay: formattedData.isDay[index],
    }),
  );

  return hourlyIterationData;
}
