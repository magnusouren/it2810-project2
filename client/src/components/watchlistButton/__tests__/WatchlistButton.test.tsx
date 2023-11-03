import { render } from '@testing-library/react';

import { Movie } from '../../../types';
import WatchlistButton from '../WatchlistButton';

describe('WatchlistButton', () => {
  const existInWatchlist = () => true;
  const toggleMovieInWatchlist = () => null;

  it('Should match snapshot', () => {
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

    const { container } = render(
      <WatchlistButton
        movie={movie}
        existInWatchlist={existInWatchlist}
        toggleMovieInWatchlist={toggleMovieInWatchlist}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
