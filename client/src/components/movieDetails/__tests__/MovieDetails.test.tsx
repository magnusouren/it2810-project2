import { screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';

import { GET_MOVIE_RATING_WITH_USERID } from '../../../graphql/queries';
import { Movie } from '../../../types';
import { renderWithProviders } from '../../../utils/testUtils';
import { MovieDetails } from '../MovieDetails';

const movie: Movie = {
  adult: false,
  backdrop_path: '/mockBackdropURL.jpg',
  genre_ids: [
    { _id: 12, name: 'Adventure' },
    { _id: 28, name: 'Action' },
  ],
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

const getMovieRatingWithUserIDMock = {
  request: {
    query: GET_MOVIE_RATING_WITH_USERID,
    variables: {
      userID: '1',
      movieID: 111111,
    },
  },
  result: {
    data: {
      getMovieRatingWithUserID: {
        rating: 5,
      },
    },
  },
};

window.scrollTo = vi.fn().mockImplementation(() => {});

describe('MovieDetails', () => {
  beforeEach(() => {
    renderWithProviders({
      child: <MovieDetails movie={movie} />,
      mockUser: { id: '1', name: 'Foo Bar', loginState: true },
      mocks: [getMovieRatingWithUserIDMock],
    });
  });

  it('should match snapshot', () => {
    const { container } = renderWithProviders({
      child: <MovieDetails movie={movie} />,
      mockUser: { id: '1', name: 'Foo Bar', loginState: true },
      mocks: [getMovieRatingWithUserIDMock],
    });
    expect(container).toMatchSnapshot();
  });

  it('should render watchlist button if user is logged in', async () => {
    await waitFor(() => {
      expect(screen.getByTestId('watchlist-toggle-button')).toBeDefined();
    });
  });

  it('renders the movie title and release year', () => {
    const titleElement = screen.getByText(movie.title + ' (' + movie.release_date.split('-')[0] + ')');
    expect(titleElement).toBeDefined();
  });

  it('renders the movie overview', () => {
    const overviewElement = screen.getByText(movie.overview);
    expect(overviewElement).toBeDefined();
  });

  it('renders the movie poster', () => {
    const posterElement = screen.getByAltText(movie.title + ' backdrop poster');
    expect(posterElement).toBeDefined();
  });

  it('renders the movie genres', () => {
    const genreElement = screen.getByText(movie.release_date + ' - Adventure, Action');
    expect(genreElement).toBeDefined();
  });

  it('renders the movie details', () => {
    const ratingElement = screen.getByText(movie.vote_average.toFixed(1) + ' / 10');
    const voteCountElement = screen.getByText(movie.vote_count);
    const popularityElement = screen.getByText(movie.popularity);
    expect(ratingElement).toBeDefined();
    expect(voteCountElement).toBeDefined();
    expect(popularityElement).toBeDefined();
  });
});
