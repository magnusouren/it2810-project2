import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { ToggleButton } from '@mui/material';
import { FC, memo, useState } from 'react';

import styles from './WatchlistButton.module.scss';

interface WatchlistButtonProps {
  movieId: number;
  existInWatchlist: (movieId: number) => boolean;
  toggleMovieInWatchlist: (movieId: number) => void;
}

const Button: FC<WatchlistButtonProps> = ({ movieId, existInWatchlist, toggleMovieInWatchlist }) => {
  const [selected, setSelected] = useState(() => existInWatchlist(movieId));

  return (
    <div className={styles.container}>
      <ToggleButton
        value='check'
        selected={selected}
        color='primary'
        size='small'
        onChange={() => {
          setSelected(!selected);
          toggleMovieInWatchlist(movieId);
        }}
      >
        {selected ? <RemoveIcon /> : <AddIcon />}
      </ToggleButton>
    </div>
  );
};

const WatchlistButton = memo(Button);

export default WatchlistButton;
