import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

import { PageLayout } from './layouts/PageLayout.tsx';
import { Home } from './pages/Home.tsx';
import { NotFound } from './pages/NotFound.tsx';

export const Router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<PageLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/movies' element={<h1>Movies</h1>} />
        <Route path='/watchlist' element={<h1>Watchlist</h1>} />
      </Route>
      <Route path='*' element={<NotFound />} />
    </>,
  ),
  { basename: '/project2' },
);
