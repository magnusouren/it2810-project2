import { type FC } from 'react';
import { Outlet } from 'react-router-dom';

import Navbar from '../components/navbar/Navbar';
import style from './PageLayout.module.scss';

export const PageLayout: FC = () => (
  <>
    <div className={style.wallpaper}>Yehha</div>
    <main>
      <Navbar />
      <section>
        <Outlet />
      </section>
    </main>
  </>
);
