import { fireEvent, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';

import { ADD_RATING, GET_MOVIE_RATING_WITH_USERID } from '../../../graphql/queries';
import { renderWithProviders } from '../../../utils/testUtils';
import { StarRating } from '../StarRating';

// Define your user and mock responses
const mockUserContext = {
  user: {
    id: '123',
    name: 'Test User',
  },
};

// Mock the useUser hook to provide user data
vi.mock('../../context/UserContext', () => ({
  useUser: () => ({ mockUserContext }),
}));

const mocks = [
  {
    request: {
      query: GET_MOVIE_RATING_WITH_USERID,
      variables: {
        userID: undefined,
        movieID: 1,
      },
    },
    result: {
      data: {
        getMovieRatingWithUserID: {
          rating: 8,
        },
      },
    },
  },
  {
    request: {
      query: ADD_RATING,
      variables: {
        userID: mockUserContext.user.id,
        movieID: 1,
        rating: 5,
      },
    },
    result: {
      data: {
        addRating: {
          rating: 5,
        },
      },
    },
  },
];

describe('StarRating', () => {
  it('should match snapshot', async () => {
    const { container } = renderWithProviders(<StarRating movieId={1} />, mocks);
    await waitFor(() => screen.getByText('Your selected rating:'));
    expect(container).toMatchSnapshot();
  });

  it.skip('updates the rating when a star is clicked', async () => {
    renderWithProviders(<StarRating movieId={1} />, mocks);
    const ratingElement = screen.getByLabelText('5 Stars');
    fireEvent.click(ratingElement);
    // expect(screen.getByText('Your selected rating: 5 ')).toBeDefined();
    await waitFor(() => screen.getByText('Your selected rating: 5'));
  });
});
