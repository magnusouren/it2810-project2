import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { ToggleButton } from '@mui/material';
import { FC, memo, useState } from 'react';

import { Movie } from '../../types';
import styles from './WatchlistButton.module.scss';

interface WatchlistButtonProps {
  movie: Movie;
  existInWatchlist: (movie: Movie) => boolean;
  toggleMovieInWatchlist: (movie: Movie) => void;
}

const Button: FC<WatchlistButtonProps> = ({ movie, existInWatchlist, toggleMovieInWatchlist }) => {
  const [selected, setSelected] = useState(() => existInWatchlist(movie));

  return (
    <div className={styles.container}>
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
        {selected ? <RemoveIcon /> : <AddIcon />}
      </ToggleButton>
    </div>
  );
};

const WatchlistButton = memo(Button);

export default WatchlistButton;
