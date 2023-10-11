import { Pagination } from '@mui/material';
import { useState } from 'react';

import { MovieList } from '../components/movieList/MovieList';
import { useUser } from '../context/UserContext';
import { Movie } from '../types';
import styles from './Movies.module.scss';

/**
 *
 * Watchlist component.
 * Displays a list of movies in the user's watchlist with pagination.
 *
 * @returns {React.JSX.Element}
 */

export const Watchlist = () => {
  const sizeLimit = 16;

  const [page, setPage] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(sizeLimit);

  const handlePagination = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setStartIndex((value - 1) * sizeLimit);
    setEndIndex(value * sizeLimit);
  };

  const userContext = useUser();
  if (!userContext) return null;
  const { getWatchlist } = userContext;

  const watchlistMovies = getWatchlist();
  const length = watchlistMovies.length;
  const count = Math.ceil(length / sizeLimit);

  const movies: Movie[] = watchlistMovies.slice(startIndex, endIndex);

  if (!userContext.user) {
    return (
      <>
        <h1 className={styles.heading}>Watchlist</h1>
        <p>You need to be logged in to see your watchlist.</p>
      </>
    );
  }

  if (movies.length === 0)
    return (
      <>
        <h1 className={styles.heading}>Watchlist</h1>
        <p>
          No movies in your watchlist.
          <br />
          Add some to see them here.
        </p>
      </>
    );

  return (
    <>
      <h1 className={styles.heading}>
        Watchlist <Pagination count={count} page={page} onChange={handlePagination} color='primary' />
      </h1>

      <MovieList movies={movies} />
      <section className={styles.pagination}>
        <Pagination count={count} page={page} onChange={handlePagination} color='primary' size='large' />
      </section>
    </>
  );
};
