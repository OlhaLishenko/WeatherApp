// import { StyleSheet, Text, View } from "react-native";
// import React from "react";
// import ForecastInfoWeekly from "./ForecastInfoWeekly";
// import ForecastSlider from "./ForecastSlider";

// export default function ForecastType({ isWeeklyWeatherData }) {
//   return (
//     <View style={{ flex: 1 }}>
//       {isWeeklyWeatherData ? (
//         <ForecastInfoWeekly
//           weeklyWeather={weeklyWeather}
//           currentDay={currentDay}
//         />
//       ) : (
//         <ForecastSlider direction='vertical'>
//           {hourlyWeather.map((hourlyWeather) => (
//             <ForecastInfoHourly
//               hourlyWeather={hourlyWeather}
//               key={hourlyWeather.id}
//             />
//           ))}
//         </ForecastSlider>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({});
