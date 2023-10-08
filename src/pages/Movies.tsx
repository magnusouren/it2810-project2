import { Pagination } from '@mui/material';
import { useState } from 'react';

import data from '../../storage/data.json';
import { MovieList } from '../components/movieList/MovieList';
import { Movie } from '../types';
import styles from './Movies.module.scss';

export const Movies = () => {
  const sizeLimit = 16;

  const [page, setPage] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(sizeLimit);

  const handlePagination = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setStartIndex((value - 1) * sizeLimit);
    setEndIndex(value * sizeLimit);
  };

  const length = data.length;
  const count = Math.ceil(length / sizeLimit);

  const movies: Movie[] = data.slice(startIndex, endIndex);

  return (
    <>
      <h1 className={styles.heading}>
        Movies <Pagination count={count} page={page} onChange={handlePagination} color='primary' />
      </h1>

      <MovieList movies={movies} />
      <section className={styles.pagination}>
        <Pagination count={count} page={page} onChange={handlePagination} color='primary' size='large' />
      </section>
    </>
  );
};
