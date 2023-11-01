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
          {rating} star{rating !== 1 ? 's' : ''} out of 10
        </span>
      );
    }
    return <span>No rating selected</span>;
  };
  return (
    <div className={styles.rating}>
      <h2>Personal rating:</h2>
      <p>
        You can rate this movie by clicking on the stars below. Your rating will be saved to your account and is a great
        way to keep track of your favorite movies.
      </p>
      <h3>Your selected rating: {textRating(value)}</h3>

      <Rating
        name='star-rating'
        getLabelText={(value: number) => `${value} Star${value !== 1 ? 's' : ''}`}
        precision={0.5}
        max={10}
        value={value}
        onChange={(_event, newValue) => {
          handleRating(newValue);
        }}
        size='large'
      />
      <p className={styles.info}>Click on a star to select/change rating. The rating will be saved to your account.</p>
    </div>
  );
};
