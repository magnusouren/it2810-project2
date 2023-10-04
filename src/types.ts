export type User = {
  name: string;
  movieList?: Movie[];
};

export type Movie = {
  id: number;
  title: string;
  year: number;
  rating: number;
  poster: string;
};
