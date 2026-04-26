export async function loadWeeklyTemp(
  latitude: number | null,
  longitude: number | null,
) {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  console.log("timezone ", timezone);

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,rain_sum,cloud_cover_mean,wind_speed_10m_max,sunrise,uv_index_max,daylight_duration,surface_pressure_mean,relative_humidity_2m_mean,visibility_mean&timezone=${timezone}`;

  const responses = await fetch(url);
  const data = await responses.json();

  return data;
}
