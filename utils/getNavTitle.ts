export function getNavTitle(routeName: string) {
  if (routeName === "Forecast") {
    return "Weather";
  } else if (routeName === "MapLocation") {
    return "Map";
  } else {
    return "Favorite cities";
  }
}
