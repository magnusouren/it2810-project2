import { screen } from '@testing-library/react';

import { Movie } from '../../../types';
import { renderWithRouterAndUserContext } from '../../../utils/testUtils';
import { MovieDetails } from '../MovieDetails';

const movie: Movie = {
  adult: false,
  backdrop_path: '/mockBackdropURL.jpg',
  genre_ids: [12, 28], // Adventure, Action
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

describe('MovieDetails', () => {
  beforeEach(() => {
    renderWithRouterAndUserContext(<MovieDetails movie={movie} />);
  });

  it('should match snapshot', () => {
    const { container } = renderWithRouterAndUserContext(<MovieDetails movie={movie} />);
    expect(container).toMatchSnapshot();
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
    const ratingElement = screen.getByText(movie.vote_average + ' / 10');
    const voteCountElement = screen.getByText(movie.vote_count);
    const popularityElement = screen.getByText(movie.popularity);
    expect(ratingElement).toBeDefined();
    expect(voteCountElement).toBeDefined();
    expect(popularityElement).toBeDefined();
  });
});
