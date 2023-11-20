import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

import MovieIcon from '../../assets/SVG/camera-white.svg';
import DarkModeToggle from '../darkMode/DarkModeToggle';
import LoginButton from './LoginButton';
import styles from './Navbar.module.scss';

/**
 *
 * Navbar component.
 *
 * @returns {React.JSX.Element}
 *
 */

const Navbar: React.FC = () => {
  return (
    <AppBar position='static'>
      <Toolbar className={styles.navbarToolbar}>
        <Link to='/' className={styles.navLink} data-testid='home-link'>
          <IconButton edge='start' color='inherit' aria-label='home-button'>
            <img src={MovieIcon} width='40' alt='Bingewatcher icon' data-testid='HomeIcon' />
            <Typography variant='h5' className={styles.navbarTitle}>
              Bingewatcher
            </Typography>
          </IconButton>
        </Link>
        <DarkModeToggle />
        <LoginButton />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
