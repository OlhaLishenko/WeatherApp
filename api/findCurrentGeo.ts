import * as Location from "expo-location";

export const findCurrentGeo = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== "granted") {
    throw new Error("Permission to access location was denied");
  }

  let location = await Location.getCurrentPositionAsync({});

  return {
    // latitude: 49.98081,
    // longitude: 36.25272,
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  };
};

// Kharkiv
// "latitude": 49.98081,
// "longitude": 36.25272,
