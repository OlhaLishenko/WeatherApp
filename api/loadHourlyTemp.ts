export async function loadHourlyTemp(
  latitude: number | null,
  longitude: number | null,
) {
  if (latitude === null || longitude === null) {
    throw new Error("Untracked location");
  }
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,rain,cloud_cover,uv_index,is_day,wind_speed_10m`;
  const responses = await fetch(url);
  const data = await responses.json();

  return data;
}
