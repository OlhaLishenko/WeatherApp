export async function loadWeeklyTemp(
  latitude: number | null,
  longitude: number | null,
) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,rain_sum,cloud_cover_mean,wind_speed_10m_max`;

  const responses = await fetch(url);
  const data = await responses.json();

  console.log(data);

  return data;
}
