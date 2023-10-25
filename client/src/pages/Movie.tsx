import { useLocation } from 'react-router-dom';

import { MovieDetails } from '../components/movieDetails/MovieDetails';
import { Movie as MovieType } from '../types';

export const Movie = () => {
  const location = useLocation();
  const movie = location.state as MovieType;

  return <MovieDetails movie={movie} />;
};
