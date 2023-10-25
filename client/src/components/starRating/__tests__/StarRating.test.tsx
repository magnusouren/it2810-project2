import { fireEvent, screen } from '@testing-library/react';
import { vi } from 'vitest';

import { renderWithRouterAndUserContext } from '../../../utils/testUtils';
import { StarRating } from '../StarRating';

const mockUserContext = {
  user: {
    id: 1,
    name: 'John Doe',
    ratings: [{ movieId: 1, rating: 5 }],
  },
  addRating: vi.fn(),
};

vi.mock('../../context/UserContext', () => ({
  useUser: () => mockUserContext,
}));

describe('StarRating', () => {
  it('should match snapshot', () => {
    const { container } = renderWithRouterAndUserContext(<StarRating movieId={1} />);
    expect(container).toMatchSnapshot();
  });

  // TODO - fix this test
  it.skip('updates the rating when a star is clicked', () => {
    renderWithRouterAndUserContext(<StarRating movieId={1} />);
    const ratingElement = screen.getByLabelText('5 Stars');
    fireEvent.click(ratingElement);
    expect(mockUserContext.addRating).toHaveBeenCalledWith(1, 5);
  });
});
