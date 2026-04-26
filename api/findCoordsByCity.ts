export async function findCoordsByCity(newCity: string) {
  const error = "Can not find location";
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${newCity}&count=10&language=en&format=json`;

  if (newCity.length === 0) {
    throw new Error(`${error}`);
  }

  const result = await fetch(url);
  const data = await result.json();

  if (!data) {
    throw new Error(`${error}`);
  }

  const { latitude, longitude, country, timezone } = data.results[0];

  return { latitude, longitude, country, timezone };
}
