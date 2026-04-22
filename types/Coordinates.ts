export type Coordinates = {
  coordinates: {
    latitude: number;
    longitude: number;
  };
  loader: boolean;
  error: string | null;
};
