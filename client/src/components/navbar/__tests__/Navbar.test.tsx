import { act, screen } from '@testing-library/react';

import { renderWithProviders } from '../../../utils/testUtils';
import Navbar from '../Navbar';

describe('Navbar', () => {
  it('Should match snapshot', () => {
    const { container } = renderWithProviders({ child: <Navbar /> });
    expect(container).toMatchSnapshot();
  });

  it('Should show home icon', () => {
    renderWithProviders({ child: <Navbar /> });

    expect(screen.getByTestId('HomeIcon')).toBeDefined();
  });

  it('Should navigate to / (home) when home icon is clicked', async () => {
    renderWithProviders({ child: <Navbar /> });
    act(() => {
      screen.getByTestId('home-link').click();
    });
    expect(window.location.pathname).toBe('/');
  });
});
