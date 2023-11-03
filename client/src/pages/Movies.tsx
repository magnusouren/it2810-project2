import { useQuery } from '@apollo/client';
import { Pagination } from '@mui/material';
import { useEffect, useState } from 'react';

import { FilterSort } from '../components/filterSort/FilterSort';
import { MovieList } from '../components/movieList/MovieList';
import { determineQueryAndVariables } from '../graphql/queries';
import { AlphabeticalSort, RatingSort } from '../types';
import styles from './Movies.module.scss';

/**
 *
 * Movies component.
 * Displays a list of movies with pagination and filtering.
 *
 * @returns {React.JSX.Element}
 */
export const Movies = () => {
  const sizeLimit = 16;
  const defaultCount = 379;

  const [count, setCount] = useState<number | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [genre, setGenre] = useState('');
  const [alphabeticalSort, setAlphabeticalSort] = useState<AlphabeticalSort>('');
  const [ratingSort, setRatingSort] = useState<RatingSort>('');

  const { query, variables } = determineQueryAndVariables(page, genre, alphabeticalSort, ratingSort);

  const { data, loading, error } = useQuery(query, {
    variables: variables,
  });

  const handlePagination = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    if (data) {
      setCount(data.getMovieCountByGenre);
    }
  }, [data]);

  return (
    <>
      {/* Create headerelement with h1 inside */}
      <h1 className={styles.heading}>
        Movies
        <Pagination
          count={Math.ceil((count || defaultCount) / sizeLimit)}
          page={page}
          onChange={handlePagination}
          color='primary'
        />
      </h1>
      <FilterSort
        genre={genre}
        alphabeticalSort={alphabeticalSort}
        ratingSort={ratingSort}
        setGenre={setGenre}
        setPage={setPage}
        setAlphabeticalSort={setAlphabeticalSort}
        setRatingSort={setRatingSort}
      />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && !loading && (
        <>
          {data.length === 0 && <p className={styles.noMovies}>No movies found</p>}
          <MovieList
            movies={data?.getMovies || data?.getMoviesByGenre || data?.getMoviesByRating || data?.getMoviesByTitleAZ}
          />
          <section className={styles.pagination}>
            <Pagination
              count={Math.ceil((count || defaultCount) / sizeLimit)}
              page={page}
              onChange={handlePagination}
              color='primary'
              size='large'
            />
          </section>
        </>
      )}
    </>
  );
};
