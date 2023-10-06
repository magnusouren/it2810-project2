import { render } from '@testing-library/react';

import WatchlistButton from '../WatchlistButton';

describe('WatchlistButton', () => {
  const existInWatchlist = () => true;
  const toggleMovieInWatchlist = () => null;

  it('Should match snapshot', () => {
    const { container } = render(
      <WatchlistButton
        movieId={123}
        existInWatchlist={existInWatchlist}
        toggleMovieInWatchlist={toggleMovieInWatchlist}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
