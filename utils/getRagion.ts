export const getRegion = (latitude: number, radiusKm: number) => {
  const latitudeDelta = radiusKm / 111;

  const longitudeDelta =
    radiusKm / (111 * Math.cos(latitude * (Math.PI / 180)));

  return {
    latitudeDelta,
    longitudeDelta,
  };
};
