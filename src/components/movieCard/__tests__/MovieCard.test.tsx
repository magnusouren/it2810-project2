import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { MovieCard } from '../MovieCard';

describe('MovieCard', () => {
  const movie = {
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
  };

  it('should match snapshot', () => {
    const { container } = render(
      <MemoryRouter>
        <MovieCard movie={movie} />
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render the movie title', () => {
    render(
      <MemoryRouter>
        <MovieCard movie={movie} />
      </MemoryRouter>,
    );

    const titleElement = screen.getByText(movie.title);
    expect(titleElement).toBeDefined();
  });

  it('should render the movie genres', () => {
    render(
      <MemoryRouter>
        <MovieCard movie={movie} />
      </MemoryRouter>,
    );

    const genreElement = screen.getByText('Adventure, Action');
    expect(genreElement).toBeDefined();
  });

  it('should render the movie poster', () => {
    render(
      <MemoryRouter>
        <MovieCard movie={movie} />
      </MemoryRouter>,
    );

    const posterElement = screen.getByAltText(movie.title);
    expect(posterElement).toBeDefined();
    expect(posterElement).toHaveProperty('src', `https://image.tmdb.org/t/p/w200${movie.poster_path}`);
  });
});
