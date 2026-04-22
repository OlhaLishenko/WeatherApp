export function getCurrentDay() {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const today = new Date();
  const dayName = days[today.getDay()];
  const dayNumber = today.getDay();

  return { dayName: dayName, dayNumber: dayNumber };
}
