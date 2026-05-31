import * as Location from "expo-location";

// export async function findCityByCoordinates(
//   latitude: number,
//   longitude: number,
// ) {
//   try {
//     const [result] = await Location.reverseGeocodeAsync({
//       latitude: latitude,
//       longitude: longitude,
//     });

//     console.log("timezoneeee " + result.timezone);

//     return {
//       city: result.city,
//       country: result.country,
//       timezone: result.timezone,
//     };
//   } catch {
//     throw new Error("City not found");
//   }
// }

export async function findCityByCoordinates(
  latitude: number,
  longitude: number,
) {
  const [nominatimRes, [expoResult]] = await Promise.all([
    fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=en`,
      { headers: { "User-Agent": "WeatherApp/1.0" } },
    ),
    Location.reverseGeocodeAsync({ latitude, longitude }),
  ]);

  const data = await nominatimRes.json();

  const city = data.address.city || data.address.town || data.address.village;
  const country = data.address.country;
  const timezone = expoResult.timezone;

  console.log("timezoneeee " + timezone);

  if (!city || !country) throw new Error("City not found");

  return {
    city: city,
    country: country,
    timezone: timezone,
  };
}
