import DarkModeIcon from '@mui/icons-material/DarkMode';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Button from '@mui/material/Button';
import React, { useEffect } from 'react';

import { useUser } from '../../context/UserContext';
import styles from './Dark.module.scss';

const DarkModeToggle: React.FC = () => {
  const { darkMode, toggleDarkMode } = useUser();

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  return (
    <>
      <Button
        variant='outlined'
        className={styles.toggle}
        aria-label='dark mode toggle'
        onClick={toggleDarkMode}
        color='inherit'
      >
        Change mode {darkMode ? <DarkModeIcon /> : <WbSunnyIcon />}
      </Button>
    </>
  );
};

export default DarkModeToggle;
