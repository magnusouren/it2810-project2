import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
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
