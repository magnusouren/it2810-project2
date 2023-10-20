import { act, cleanup, screen } from '@testing-library/react';

import { renderWithRouterAndUserContext } from '../../../utils/testUtils';
import LoginButton from '../LoginButton';

describe('LoginButton', () => {
  beforeEach(() => {
    cleanup();
    window.localStorage.clear();
  });

  it('Should match snapshot', () => {
    const { container } = renderWithRouterAndUserContext(<LoginButton />);
    expect(container).toMatchSnapshot();
  });

  it('Should render a login button when the user is not logged in', () => {
    renderWithRouterAndUserContext(<LoginButton />);
    expect(screen.getByText(/Login/i)).toMatchSnapshot();
  });

  it('Should render the user name when the user is logged in', async () => {
    renderWithRouterAndUserContext(<LoginButton />);
    act(() => {
      screen.getByTestId('login-button').click();
    });

    expect(screen.getByTestId('user-name')).toBeDefined();
  });

  it('Should render the menu when it is clicked', async () => {
    renderWithRouterAndUserContext(<LoginButton />);
    act(() => {
      screen.getByTestId('login-button').click();
    });
    act(() => {
      screen.getByTestId('menu').click();
    });

    expect(screen.getByText(/My Watchlist/)).toBeDefined();
  });

  it('Should move to watchlist page', async () => {
    renderWithRouterAndUserContext(<LoginButton />);
    act(() => {
      screen.getByTestId('login-button').click();
    });
    act(() => {
      screen.getByTestId('menu').click();
    });
    act(() => {
      screen.getByTestId('watchlist-link').click();
    });

    expect(window.location.pathname).toBe('/watchlist');
  });

  it('Should log out when clicking logout', async () => {
    renderWithRouterAndUserContext(<LoginButton />);
    act(() => {
      screen.getByTestId('login-button').click();
    });
    act(() => {
      screen.getByTestId('menu').click();
    });
    act(() => {
      screen.getByTestId('logout').click();
    });

    expect(screen.getByTestId('login-button')).toBeDefined();
  });

  it('Should log out when clicking delete user', async () => {
    renderWithRouterAndUserContext(<LoginButton />);
    act(() => {
      screen.getByTestId('login-button').click();
    });
    act(() => {
      screen.getByTestId('menu').click();
    });
    act(() => {
      screen.getByTestId('delete-user').click();
    });

    expect(screen.getByTestId('login-button')).toBeDefined();
  });
});
