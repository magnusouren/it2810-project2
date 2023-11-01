import { ArrowUpward } from '@mui/icons-material';
import { type FC, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import Navbar from '../components/navbar/Navbar';
import styles from './PageLayout.module.scss';

/**
 *
 * PageLayout component.
 * Describes the default layout of the application.
 *
 * @returns {React.JSX.Element}
 */

export const PageLayout: FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <main>
        <Navbar />
        <section>
          <Outlet />
        </section>
      </main>
      {isVisible && (
        <button onClick={scrollToTop} className={styles.scrollToTop}>
          <ArrowUpward />
          <p>Scroll to top</p>
        </button>
      )}
    </>
  );
};
