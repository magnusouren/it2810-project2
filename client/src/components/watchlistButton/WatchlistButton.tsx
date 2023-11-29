import { useMutation } from '@apollo/client';
import { BookmarkAdd, BookmarkRemove } from '@mui/icons-material';
import { ToggleButton } from '@mui/material';
import { FC, memo, useState } from 'react';

import { ADD_MOVIE_TO_WATCHLIST, REMOVE_MOVIE_FROM_WATCHLIST } from '../../graphql/queries';
import { Movie, User } from '../../types';
import styles from './WatchlistButton.module.scss';

interface WatchlistButtonProps {
  movie: Movie;
  style?: 'big' | 'small';
  user: User;
}

const Button: FC<WatchlistButtonProps> = ({ movie, style = 'small', user }) => {
  const movieId = parseInt(movie._id.toString(), 10);
  const baseVariables = { movieId: movieId, userId: user.id };

  const [isInWatchlist, setIsInWatchlist] = useState<boolean>(movie.isInWatchlist ?? false);

  const [removeMovieFromWatchlist, { error: removeError }] = useMutation(REMOVE_MOVIE_FROM_WATCHLIST, {
    variables: baseVariables,
    update(cache) {
      cache.modify({
        fields: {
          getMovieById(existingMovie) {
            if (existingMovie._id === movieId) {
              return { ...existingMovie, isInWatchlist: false }; // Update the cache to reflect the change in the UI
            }
          },
        },
      });
    },
  });

  const [addMovieToWatchlist, { error: addError }] = useMutation(ADD_MOVIE_TO_WATCHLIST, {
    variables: baseVariables,
    update(cache) {
      cache.modify({
        fields: {
          getMovieById(existingMovie) {
            if (existingMovie._id === movieId) {
              return { ...existingMovie, isInWatchlist: true }; // Update the cache to reflect the change in the UI
            }
          },
        },
      });
    },
  });

  if (removeError) {
    return <div>{removeError.message}</div>;
  }

  if (addError) {
    return <div>{addError.message}</div>;
  }

  const handleClick = async () => {
    if (isInWatchlist) {
      const response = await removeMovieFromWatchlist();
      if (response?.data?.removeMovieFromWatchlist) {
        setIsInWatchlist(false);
      }
    } else {
      const response = await addMovieToWatchlist();
      if (response?.data?.addMovieToWatchlist) {
        setIsInWatchlist(true);
      }
    }
  };

  return (
    <div className={style === 'big' ? styles.bigContainer : styles.smallContainer} data-testid='watchlist-button'>
      <ToggleButton
        value='check'
        selected={isInWatchlist}
        onChange={handleClick}
        color='primary'
        size='small'
        aria-label={isInWatchlist ? 'Remove movie from watchlist' : 'Add movie to watchlist'}
        data-testid='watchlist-toggle-button'
        title={isInWatchlist ? 'Remove movie from watchlist' : 'Add movie to watchlist'}
      >
        {isInWatchlist ? <BookmarkRemove className={styles.remove} /> : <BookmarkAdd className={styles.add} />}
        {style === 'big' && (
          <span className={styles.text}>{isInWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}</span>
        )}
      </ToggleButton>
    </div>
  );
};

const WatchlistButton = memo(Button);
export default WatchlistButton;
