import CheckIcon from '@mui/icons-material/Check';
import { ToggleButton } from '@mui/material';
import { FC, memo, useState } from 'react';

interface WatchlistButtonProps {
  movieId: number;
  existInWatchlist: (movieId: number) => boolean;
  toggleMovieInWatchlist: (movieId: number) => void;
}

const Button: FC<WatchlistButtonProps> = ({ movieId, existInWatchlist, toggleMovieInWatchlist }) => {
  const [selected, setSelected] = useState(() => existInWatchlist(movieId));

  return (
    <ToggleButton
      value='check'
      selected={selected}
      onChange={() => {
        setSelected(!selected);
        toggleMovieInWatchlist(movieId);
      }}
    >
      <CheckIcon />
    </ToggleButton>
  );
};

const WatchlistButton = memo(Button);

export default WatchlistButton;
