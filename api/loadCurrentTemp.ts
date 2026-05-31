export async function loadCurrentTemp(
  latitude: number | null,
  longitude: number | null,
) {
  if (latitude === null || longitude === null) {
    throw new Error("Untracked location");
  }
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,rain,cloud_cover,wind_speed_10m`;
  const responses = await fetch(url);
  const data = await responses.json();

  return {
    temperature: data.current.temperature_2m,
    rain: data.current.rain,
    cloudCover: data.current.cloud_cover,
    windSpeed: data.current.wind_speed_10m,
  };
}
