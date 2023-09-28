import { type FC } from 'react';
import { Outlet } from 'react-router-dom';

export const PageLayout: FC = () => (
  <main>
    <section>
      <Outlet />
    </section>
  </main>
);
