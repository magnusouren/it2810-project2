import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

import { PageLayout } from './layouts/PageLayout.tsx';
import { NotFound } from './pages/NotFound.tsx';

export const Router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<PageLayout />}>
        <Route path='/' element={<h1>Home</h1>} />
        <Route path='/movies' element={<h2>Movies</h2>} />
      </Route>
      <Route path='*' element={<NotFound />} />
    </>,
  ),
  { basename: '/project2' },
);
