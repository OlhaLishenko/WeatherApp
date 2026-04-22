import * as Location from "expo-location";

export async function findCityByCoordinates(
  latitude: number,
  longitude: number,
) {
  const [result] = await Location.reverseGeocodeAsync({
    latitude: latitude,
    longitude: longitude,
  });

  if (!result.city || !result.country) {
    throw new Error("City not found");
  }

  return {
    city: result.city,
    country: result.country,
  };
}
