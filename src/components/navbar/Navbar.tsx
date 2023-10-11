import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

import MovieIcon from '../../assets/SVG/camera-white.svg';
import Search from '../search/Search';
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
          <IconButton edge='start' color='inherit' aria-label='home'>
            <img src={MovieIcon} width='40' alt='yeha' data-testid='HomeIcon' />
            {/* <HomeIcon /> From MUI */}
            <Typography variant='h6' className={styles.navbarTitle} />
          </IconButton>
        </Link>
        <Search />
        <LoginButton />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
