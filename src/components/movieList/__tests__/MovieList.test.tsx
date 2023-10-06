import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { Movie } from '../../../types';
import { MovieList } from '../MovieList';

describe('MovieList', () => {
  const movies: Movie[] = [
    {
      adult: false,
      backdrop_path: '/mockBackdropURL.jpg',
      genre_ids: [12, 28], // Adventure, Action
      id: 111111,
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
      genre_ids: [12, 28], // Adventure, Action
      id: 222222,
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
    const { container } = render(
      <MemoryRouter>
        <MovieList movies={movies} />
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render a MovieCard for each movie in the list', () => {
    render(
      <MemoryRouter>
        <MovieList movies={movies} />
      </MemoryRouter>,
    );

    const movieCards = screen.getAllByRole('link');
    expect(movieCards).toHaveLength(2);
  });
});
