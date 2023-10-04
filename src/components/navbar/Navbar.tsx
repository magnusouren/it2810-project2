import { Home as HomeIcon } from '@mui/icons-material';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

import Search from '../search/Search';
import LoginButton from './LoginButton';
import styles from './Navbar.module.scss';

const Navbar: React.FC = () => {
  return (
    <AppBar position='static'>
      <Toolbar className={styles.navbarToolbar}>
        <Link to='/' className={styles.navLink}>
          <IconButton edge='start' color='inherit' aria-label='home'>
            <HomeIcon />
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
