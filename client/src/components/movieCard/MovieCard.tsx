import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import { useUser } from '../../context/UserContext';
import { Movie } from '../../types';
import WatchlistButton from '../watchlistButton/WatchlistButton';
import styles from './MovieCard.module.scss';

interface MovieProps {
  movie: Movie;
}

/**
 *
 * MovieCard component.
 * Takes values from parameters and displays them in an organized card.
 *
 * @param movie
 * @returns {React.JSX.Element}
 */

export const MovieCard: FC<MovieProps> = ({ movie }) => {
  const { user } = useUser();

  return (
    <Card className={styles.card} data-testid='movie-card'>
      <Link to={`/movie/${movie._id}`} state={movie} className={styles.link}>
        <CardMedia
          component='img'
          image={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
          alt={movie.title + ' poster.'}
          className='movie-card-image'
          loading='lazy'
        />
        <CardContent>
          <Typography gutterBottom component='div' aria-label={`title: ${movie.title}.`}>
            {movie.title}
          </Typography>
          <Typography
            sx={{ color: 'var(--color-text-secondary)' }}
            variant='body2'
            aria-label={`genres:${movie.genre_ids.map((genre) => genre.name).join(', ')}`}
          >
            {movie.genre_ids.map((genre) => genre.name).join(', ')}
          </Typography>
        </CardContent>
      </Link>
      {user && <WatchlistButton movie={movie} user={user} />}
    </Card>
  );
};
