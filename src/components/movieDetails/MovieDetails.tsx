import { FC } from 'react';

import { useUser } from '../../context/UserContext';
import { Movie } from '../../types';
import { getCategoryNameById } from '../../utils/categoryUtils';
import { StarRating } from '../starRating/StarRating';
import WatchlistButton from '../watchlistButton/WatchlistButton';
import styles from './MovieDetails.module.scss';

interface MovieDetailsProps {
  movie: Movie;
}

/**
 *
 * MovieDetails component.
 * Takes all values from parameters and displays them in an organized page.
 *
 * @param movie
 * @returns {React.JSX.Element}
 */

export const MovieDetails: FC<MovieDetailsProps> = ({ movie }) => {
  const userContext = useUser();
  const { user, existInWatchlist, toggleMovieInWatchlist } = userContext;

  return (
    <>
      <img
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt={movie.title + ' backdrop poster'}
        className={styles.backdropPoster}
      />
      <div className={styles.container}>
        <WatchlistButton
          movie={movie}
          style={'big'}
          existInWatchlist={existInWatchlist}
          toggleMovieInWatchlist={toggleMovieInWatchlist}
        />
        <h1>
          {movie.title} ({movie.release_date.split('-')[0]})
        </h1>
        <p className={styles.date}>
          {movie.release_date} - {movie.genre_ids.map((id) => getCategoryNameById(id)).join(', ')}
        </p>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <p className={styles.overview}>{movie.overview}</p>
          </div>
          <div className={styles.details}>
            <div className={styles.detail}>
              <h3>{movie.vote_average}/10</h3>
              <p>Avg. Rating</p>
            </div>
            <div className={styles.detail}>
              <h3>{movie.vote_count}</h3>
              <p>Vote Count</p>
            </div>
            <div className={styles.detail}>
              <h3>{movie.popularity}</h3>
              <p>Popularity</p>
            </div>
          </div>
        </div>
        {user && <StarRating movieId={movie.id} />}
      </div>
    </>
  );
};
