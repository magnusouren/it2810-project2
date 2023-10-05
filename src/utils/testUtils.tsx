import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { UserProvider } from '../context/UserContext';

// Function to render a component wrapped inside a browserrouter for testing purposes
export const renderWithRouterAndUserContext = (component: JSX.Element) =>
  render(
    <UserProvider>
      <BrowserRouter>{component}</BrowserRouter>
    </UserProvider>,
  );

const queryClient = new QueryClient();

// Function to render a component wrapped inside a browserrouter and queryclient for testing purposes
export const renderWithRouterAndQueryClient = (component: JSX.Element) =>
  render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{component}</BrowserRouter>
    </QueryClientProvider>,
  );
