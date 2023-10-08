import { BookmarkAdd, BookmarkRemove } from '@mui/icons-material';
import { ToggleButton } from '@mui/material';
import { FC, memo, useState } from 'react';

import { Movie } from '../../types';
import styles from './WatchlistButton.module.scss';

interface WatchlistButtonProps {
  movie: Movie;
  existInWatchlist: (movie: Movie) => boolean;
  toggleMovieInWatchlist: (movie: Movie) => void;
  style?: 'big' | 'small';
}

const Button: FC<WatchlistButtonProps> = ({ movie, existInWatchlist, toggleMovieInWatchlist, style = 'small' }) => {
  const [selected, setSelected] = useState(() => existInWatchlist(movie));

  return (
    <div className={style == 'big' ? styles.bigContainer : styles.smallContainer}>
      <ToggleButton
        value='check'
        selected={selected}
        color='primary'
        size='small'
        onChange={() => {
          setSelected(!selected);
          toggleMovieInWatchlist(movie);
        }}
      >
        {selected ? <BookmarkRemove className={styles.remove} /> : <BookmarkAdd className={styles.add} />}
      </ToggleButton>
    </div>
  );
};

const WatchlistButton = memo(Button);

export default WatchlistButton;
