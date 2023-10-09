import './PageLayout.module.scss';

import { type FC } from 'react';
import { Outlet } from 'react-router-dom';

import Navbar from '../components/navbar/Navbar';

/**
 *
 * PageLayout component.
 * Describes the default layout of the application.
 *
 * @returns {React.JSX.Element}
 */

export const PageLayout: FC = () => (
  <main>
    <Navbar />
    <section>
      <Outlet />
    </section>
  </main>
);
