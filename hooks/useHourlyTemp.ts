import { loadHourlyTemp } from "@/api/loadHourlyTemp";
import { DayInfo } from "@/types/DayInfo";
import { HourlyTemp } from "@/types/HourlyTemp";
import { useAppDispatch } from "@/types/reduxTypes";
import { normolizeTempData } from "@/utils/normolizeTempData";
import { useEffect } from "react";
import { actions as actionsHourly } from "@/store/hourlyTempSlice";

export function useHourlyTemp(
  latitude: number,
  longitude: number,
  currentDay: DayInfo,
) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!latitude || !longitude) return;

    const loadHourlyTempData = async () => {
      try {
        const hourlyTempData = await loadHourlyTemp(latitude, longitude);
        const hourlyData = hourlyTempData.hourly;

        const normolizedHourlyData = normolizeTempData(
          hourlyData,
          "hourly",
          currentDay,
        ) as HourlyTemp[];

        dispatch(actionsHourly.setHourlyTempData(normolizedHourlyData));
      } catch {
        dispatch(actionsHourly.setHourlyTempError());
      }
    };

    loadHourlyTempData();
  }, [currentDay, currentDay.dayNumber, dispatch, latitude, longitude]);
}
