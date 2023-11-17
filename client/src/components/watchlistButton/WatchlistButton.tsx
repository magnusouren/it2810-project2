import { useMutation, useQuery } from '@apollo/client';
import { BookmarkAdd, BookmarkRemove } from '@mui/icons-material';
import { ToggleButton } from '@mui/material';
import { FC, memo, useEffect, useState } from 'react';

import { ADD_MOVIE_TO_WATCHLIST, IS_IN_WATCHLIST, REMOVE_MOVIE_FROM_WATCHLIST } from '../../graphql/queries';
import { Movie, User } from '../../types';
import styles from './WatchlistButton.module.scss';

interface WatchlistButtonProps {
  movie: Movie;
  style?: 'big' | 'small';
  user: User;
}

const Button: FC<WatchlistButtonProps> = ({ movie, style = 'small', user }) => {
  const movieId = parseInt(movie._id.toString(), 10);

  const { data, loading, error } = useQuery(IS_IN_WATCHLIST, {
    variables: { movieId: movieId, userId: user.id },
    fetchPolicy: 'network-only',
  });

  // Initialize toggle state based on query data using useEffect
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  useEffect(() => {
    if (data && typeof data.movieIsInWatchlist === 'boolean') {
      setIsInWatchlist(data.movieIsInWatchlist);
    }
  }, [data]);

  const [removeMovieFromWatchlist] = useMutation(REMOVE_MOVIE_FROM_WATCHLIST, {
    variables: { movieId: movieId, userId: user.id },
    refetchQueries: [{ query: IS_IN_WATCHLIST, variables: { movieId: movieId, userId: user.id } }],
  });

  const [addMovieToWatchlist] = useMutation(ADD_MOVIE_TO_WATCHLIST, {
    variables: { movieId: movieId, userId: user.id },
    refetchQueries: [{ query: IS_IN_WATCHLIST, variables: { movieId: movieId, userId: user.id } }],
  });

  const handleClick = () => {
    if (isInWatchlist) {
      removeMovieFromWatchlist();
    } else {
      addMovieToWatchlist();
    }
    // Toggle state should not be used directly for mutations result since it's managed by Apollo's cache
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error! {error.message}</div>;

  return (
    <div className={style === 'big' ? styles.bigContainer : styles.smallContainer} data-testid='watchlist-button'>
      <ToggleButton
        value='check'
        selected={isInWatchlist}
        onChange={handleClick}
        color='primary'
        size='small'
        aria-label={isInWatchlist ? 'remove movie from watchlist' : 'add movie to watchlist'}
        data-testid='watchlist-toggle-button'
      >
        {isInWatchlist ? <BookmarkRemove className={styles.remove} /> : <BookmarkAdd className={styles.add} />}
      </ToggleButton>
    </div>
  );
};

const WatchlistButton = memo(Button);
export default WatchlistButton;
