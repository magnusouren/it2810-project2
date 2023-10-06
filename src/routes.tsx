import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

import { PageLayout } from './layouts/PageLayout.tsx';
import { Home } from './pages/Home.tsx';
import { Movies } from './pages/Movies.tsx';
import { NotFound } from './pages/NotFound.tsx';

export const Router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<PageLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/movie' element={<h1>Movie</h1>} />
        <Route path='/watchlist' element={<h1>Watchlist</h1>} />
      </Route>
      <Route path='*' element={<NotFound />} />
    </>,
  ),
  { basename: '/project2' },
);
