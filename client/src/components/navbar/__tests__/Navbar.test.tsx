import { act, screen } from '@testing-library/react';

import { renderWithRouterAndUserContext } from '../../../utils/testUtils';
import Navbar from '../Navbar';

describe('Navbar', () => {
  it('Should match snapshot', () => {
    const { container } = renderWithRouterAndUserContext(<Navbar />);
    expect(container).toMatchSnapshot();
  });

  it('Should show home icon', () => {
    renderWithRouterAndUserContext(<Navbar />);

    expect(screen.getByTestId('HomeIcon')).toBeDefined();
  });

  it('Should navigate to / (home) when home icon is clicked', async () => {
    renderWithRouterAndUserContext(<Navbar />);
    act(() => {
      screen.getByTestId('home-link').click();
    });
    expect(window.location.pathname).toBe('/');
  });
});
