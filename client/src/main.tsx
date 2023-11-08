import './index.scss';

import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { UserProvider } from './context/UserContext';
import { Router } from './routes';

const serverURI = new HttpLink({
  uri: 'http://localhost:4000',
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: serverURI,
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
      <ApolloProvider client={client}>
        <RouterProvider router={Router} />
      </ApolloProvider>
    </UserProvider>
  </React.StrictMode>,
);
