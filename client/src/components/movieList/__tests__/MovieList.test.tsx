import { screen } from '@testing-library/react';

import { Movie } from '../../../types';
import { renderWithRouterAndUserContext } from '../../../utils/testUtils';
import { MovieList } from '../MovieList';

describe('MovieList', () => {
  const movies: Movie[] = [
    {
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
    },
    {
      adult: false,
      backdrop_path: '/mockBackdropURL.jpg',
      genre_ids: [
        { _id: 12, name: 'Adventure' },
        { _id: 28, name: 'Action' },
      ], // Adventure, Action
      _id: 222222,
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
    },
  ];

  it('should match snapshot', () => {
    const { container } = renderWithRouterAndUserContext(<MovieList movies={movies} />);
    expect(container).toMatchSnapshot();
  });

  it('should render a MovieCard for each movie in the list', () => {
    renderWithRouterAndUserContext(<MovieList movies={movies} />);

    const movieCards = screen.getAllByRole('link');
    expect(movieCards).toHaveLength(2);
  });
});
