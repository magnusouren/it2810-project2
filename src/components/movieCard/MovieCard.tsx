import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import { useUser } from '../../context/UserContext';
import { Movie } from '../../types';
import { getCategoryById } from '../../utils/categoryUtils';
import WatchlistButton from '../watchlistButton/WatchlistButton';
import styles from './MovieCard.module.scss';

interface MovieProps {
  movie: Movie;
}

export const MovieCard: FC<MovieProps> = ({ movie }) => {
  const userContext = useUser();
  if (!userContext) return null;
  const { user, existInWatchlist, toggleMovieInWatchlist } = userContext;

  return (
    <Card sx={{ maxWidth: 200 }} className={styles.card}>
      <Link to={`/movie/${movie.id}`} state={movie} className={styles.link}>
        <CardMedia component='img' image={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
        <CardContent>
          <Typography gutterBottom component='div'>
            {movie.title}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {movie.genre_ids.map((genre) => getCategoryById(genre)?.name).join(', ')}
          </Typography>
        </CardContent>
      </Link>
      {user && (
        <WatchlistButton
          movie={movie}
          existInWatchlist={existInWatchlist}
          toggleMovieInWatchlist={toggleMovieInWatchlist}
          data-testid='watchlist-button'
        />
      )}
    </Card>
  );
};
