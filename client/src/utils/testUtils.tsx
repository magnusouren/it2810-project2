import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
import { MockedProvider } from '@apollo/client/testing';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { UserProvider } from '../context/UserContext';

const link = new HttpLink({
  uri: 'http://localhost:4000', // Endepunktet til din GraphQL server
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

// Function to render a component wrapped inside a browserrouter for testing purposes
export const renderWithRouterAndUserContext = (component: JSX.Element) =>
  render(
    <UserProvider>
      <ApolloProvider client={client}>
        <BrowserRouter>{component}</BrowserRouter>
      </ApolloProvider>
    </UserProvider>,
  );

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const renderWithProviders = (child: React.ReactNode, mocks?: any[]) => {
  return render(
    <UserProvider>
      <MockedProvider mocks={mocks} addTypename={false}>
        <BrowserRouter>{child}</BrowserRouter>
      </MockedProvider>
    </UserProvider>,
  );
};
