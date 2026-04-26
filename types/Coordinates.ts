export type CoordinatesState = {
  coordinates: {
    latitude: number;
    longitude: number;
  };
  loader: boolean;
  error: string | null;
};
export type Coordinates = {
  latitude: number;
  longitude: number;
};
