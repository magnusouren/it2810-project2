import Rating from '@mui/material/Rating';
import { FC, useState } from 'react';

import { useUser } from '../../context/UserContext';
import styles from './StarRating.module.scss';

interface StarRatingProps {
  movieId: number;
}

/**
 *
 * StarRating component.
 * Allows the user to rate a movie.
 * The rating is saved to the user's account.
 *
 * @param movieId
 * @returns {React.JSX.Element}
 *
 */

export const StarRating: FC<StarRatingProps> = ({ movieId }) => {
  const userContext = useUser();
  const { user, addRating } = userContext;

  const [value, setValue] = useState<number>(user?.ratings?.find((rating) => rating.movieId === movieId)?.rating || 0);

  const handleRating = (rating: number | null) => {
    if (rating && user) {
      setValue(rating);
      addRating(movieId, rating);
    }
  };

  const textRating = (rating: number | undefined) => {
    if (rating) {
      return (
        <span>
          {rating} star{rating !== 1 ? 's' : ''}
        </span>
      );
    }
    return <span>No rating selected</span>;
  };
  return (
    <div className={styles.rating}>
      <h2>Your selected rating: {textRating(value)}</h2>
      <Rating
        name='customized-10'
        getLabelText={(value: number) => `${value} Star${value !== 1 ? 's' : ''}`}
        precision={0.5}
        max={10}
        value={value}
        onChange={(_event, newValue) => {
          handleRating(newValue);
        }}
        size='large'
      />
      <p>Click on a star to select/change rating. The rating will be saved to your account.</p>
    </div>
  );
};
