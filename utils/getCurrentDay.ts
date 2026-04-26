export function getCurrentDay() {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const today = new Date();
  const dayName = days[today.getDay()];
  const dayNumber = today.getDay() === 0 ? 6 : today.getDay() - 1;

  return { dayName: dayName, dayNumber: dayNumber };
}
