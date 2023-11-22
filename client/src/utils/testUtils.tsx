import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
import { MockedProvider } from '@apollo/client/testing';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { User } from '../types';
import MockUserProvider from './MockUserProvider';

const link = new HttpLink({
  uri: 'http://localhost:4000', // Endepunktet til din GraphQL server
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

type ProviderMocks = {
  loginMock?: () => void;
  logoutMock?: () => void;
  deleteUserMock?: () => void;
  toggleDarkModeMock?: () => void;
};

interface ProviderProps {
  child: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mocks?: any[];
  mockUser?: User;
  providerMocks?: ProviderMocks;
}

// Function to render a component wrapped inside a browserrouter for testing purposes
export const renderWithProviders = ({ child, mockUser, mocks, providerMocks }: ProviderProps) =>
  render(
    <MockUserProvider mockUser={mockUser} {...providerMocks}>
      <ApolloProvider client={client}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <BrowserRouter>{child}</BrowserRouter>
        </MockedProvider>
      </ApolloProvider>
    </MockUserProvider>,
  );
