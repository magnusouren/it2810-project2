import { ArrowBack, LiveTv, PeopleAlt, Star } from '@mui/icons-material';
import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
  const { user } = userContext;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.movieDetails}>
      <Link to='/' className={styles.goBack}>
        <ArrowBack /> <span>Movies</span>
      </Link>
      <img
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt={movie.title + ' backdrop poster'}
        className={styles.backdropPoster}
      />
      <div className={styles.container}>
        {user && <WatchlistButton movie={movie} style={'small'} user={user} />}
        <h1>
          {movie.title} ({movie.release_date.split('-')[0]})
        </h1>
        <p className={styles.date}>
          {movie.release_date} - {movie.genre_ids.map((id) => getCategoryNameById(id)).join(', ')}
        </p>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <h2 className={styles.subtitle}>About:</h2>
            <p className={styles.overview}>{movie.overview}</p>
          </div>
          <h2 className={styles.subtitle}>Statistics:</h2>
          <div className={styles.details}>
            <div className={styles.detail}>
              <div className={styles.score}>
                {movie.vote_average} / 10{' '}
                <div>
                  <Star fontSize='inherit' />
                </div>
              </div>
              <p>Avg. Rating</p>
            </div>
            <div className={styles.detail}>
              <div className={styles.score}>
                {movie.vote_count}{' '}
                <div>
                  <PeopleAlt fontSize='inherit' />
                </div>
              </div>
              <p>Vote Count</p>
            </div>
            <div className={styles.detail}>
              <div className={styles.score}>
                {movie.popularity}{' '}
                <div>
                  <LiveTv fontSize='inherit' />
                </div>
              </div>
              <p>Popularity</p>
            </div>
          </div>
        </div>
        {user && <StarRating movieId={movie._id} />}
      </div>
    </div>
  );
};
