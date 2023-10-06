import { FC } from 'react';

import { Movie } from '../../types';
import { MovieCard } from '../movieCard/MovieCard';
import styles from './MovieList.module.scss';

interface MovieListProps {
  movies: Movie[];
}

export const MovieList: FC<MovieListProps> = ({ movies }) => {
  return (
    <div className={styles.container}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};
