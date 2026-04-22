import { DayInfo } from "@/types/DayInfo";
import { createContext } from "react";

const correntDayContextType = createContext<DayInfo>({
  dayName: "",
  dayNumber: 1,
});

const correntDayContextProveder = () => {
  const [currentDay, setCurrentDay];
};
