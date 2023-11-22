import DarkModeIcon from '@mui/icons-material/DarkMode';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Button from '@mui/material/Button';
import React from 'react';

import { useUser } from '../../context/UserContext';
import styles from './Dark.module.scss';

const DarkModeToggle: React.FC = () => {
  const { darkMode, toggleDarkMode } = useUser();

  return (
    <>
      <Button
        variant='outlined'
        className={styles.toggle}
        aria-label='dark mode toggle'
        onClick={toggleDarkMode}
        color='inherit'
      >
        {darkMode ? (
          <>
            Light mode
            <WbSunnyIcon />
          </>
        ) : (
          <>
            Dark mode
            <DarkModeIcon />
          </>
        )}
      </Button>
    </>
  );
};

export default DarkModeToggle;
