export type State<P> = {
  data: P;
  loader: boolean;
  error: string | null;
};
