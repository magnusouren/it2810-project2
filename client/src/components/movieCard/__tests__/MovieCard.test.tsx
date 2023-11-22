import { screen, waitFor } from '@testing-library/react';

import { Movie, User } from '../../../types';
import { renderWithProviders } from '../../../utils/testUtils';
import { MovieCard } from '../MovieCard';

const mockUser: User = {
  id: '1',
  name: 'Foo Bar',
  loginState: true,
};

describe('MovieCard', () => {
  const movie: Movie = {
    adult: false,
    backdrop_path: '/mockBackdropURL.jpg',
    genre_ids: [
      { _id: 12, name: 'Adventure' },
      { _id: 28, name: 'Action' },
    ], // Adventure, Action
    _id: 111111,
    original_language: 'en',
    original_title: 'Foo Bar',
    overview: 'Simple mock overview',
    popularity: 1000,
    poster_path: '/mockPosterURL.jpg',
    release_date: '1970-01-01',
    title: 'Foo Bar',
    video: false,
    vote_average: 5,
    vote_count: 555,
  };

  it('should match snapshot', async () => {
    const { container } = renderWithProviders({ child: <MovieCard movie={movie} />, mockUser: mockUser });
    await waitFor(() => {
      expect(screen.getByTestId('watchlist-toggle-button')).toBeDefined();
    });
    expect(container).toMatchSnapshot();
  });

  it('should render the watchlist button when user is defined', async () => {
    renderWithProviders({ child: <MovieCard movie={movie} />, mockUser: mockUser });
    await waitFor(() => {
      expect(screen.getByTestId('watchlist-toggle-button')).toBeDefined();
    });
  });

  it('should not render the watchlist button when user is undefined', async () => {
    renderWithProviders({ child: <MovieCard movie={movie} /> });
    expect(screen.queryByTestId('watchlist-toggle-button')).toBeNull();
  });

  it('should render the movie title', () => {
    renderWithProviders({ child: <MovieCard movie={movie} />, mockUser: mockUser });

    const titleElement = screen.getByText(movie.title);
    expect(titleElement).toBeDefined();
  });

  it('should render the movie genres', () => {
    renderWithProviders({ child: <MovieCard movie={movie} />, mockUser: mockUser });

    const genreElement = screen.getByText('Adventure, Action');
    expect(genreElement).toBeDefined();
  });

  it('should render the movie poster', () => {
    renderWithProviders({ child: <MovieCard movie={movie} />, mockUser: mockUser });

    const posterElement = screen.getByAltText(movie.title + ' poster.');
    expect(posterElement).toBeDefined();
    expect(posterElement).toHaveProperty('src', `https://image.tmdb.org/t/p/w400${movie.poster_path}`);
  });
});
