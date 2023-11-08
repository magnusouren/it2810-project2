import { useQuery } from '@apollo/client';
import { Pagination } from '@mui/material';
import { useState } from 'react';

import { MovieList } from '../components/movieList/MovieList';
import { useUser } from '../context/UserContext';
import { GET_WATCHLIST_BY_USER_ID } from '../graphql/queries';
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

  const handlePagination = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const userContext = useUser();
  const { user } = userContext;

  const { data } = useQuery(GET_WATCHLIST_BY_USER_ID, {
    variables: { userId: user?.id, page: page },
    fetchPolicy: 'network-only',
  });

  if (!data) return <div>Loading...</div>;

  const length = data.getWatchlistCountByUserID;
  const count = Math.ceil(length / sizeLimit);

  if (!user) {
    return (
      <>
        <h1 className={styles.heading}>Watchlist</h1>
        <p>You need to be logged in to see your watchlist.</p>
      </>
    );
  }

  if (length === 0)
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
        Watchlist
        {length > sizeLimit && <Pagination count={count} page={page} onChange={handlePagination} color='primary' />}
      </h1>

      <MovieList movies={data.getWatchlistByUserID.movies} />
      {length > sizeLimit && (
        <section className={styles.pagination}>
          <Pagination count={count} page={page} onChange={handlePagination} color='primary' size='large' />
        </section>
      )}
    </>
  );
};
