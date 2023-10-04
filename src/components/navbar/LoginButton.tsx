import { faker } from '@faker-js/faker';
import { AccountCircle as AccountCircleIcon, PlaylistPlay as PlaylistPlayIcon } from '@mui/icons-material';
import { IconButton, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { User } from '../../types';
import { getUser, removeUser, setUser as setNewUser, userExists } from '../../utils/persistency';
import styles from './LoginButton.module.scss';

function LoginButton() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [user, setUser] = useState<User | undefined>(getUser());

  const handleLogin = () => {
    const tempUser = { name: faker.person.fullName() } as User;
    console.log(tempUser);
    if (!userExists()) setNewUser(tempUser);
    setUser(getUser());
    handleMenuClose();
  };

  const handleLogout = () => {
    setUser(undefined);
    handleMenuClose();
  };

  const handleHardLogout = () => {
    setUser(undefined);
    removeUser();
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return user ? (
    <>
      <IconButton color='inherit' onClick={handleMenuOpen}>
        <p className={styles.loginText}>{user.name}</p>
        <PlaylistPlayIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <Link to='/watchlist' className={styles.navLink}>
          <MenuItem onClick={handleMenuClose}>My Watchlist</MenuItem>
        </Link>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
        <MenuItem onClick={handleHardLogout}>Delete user</MenuItem>
      </Menu>
    </>
  ) : (
    <IconButton color='inherit' onClick={handleLogin}>
      <AccountCircleIcon />
      <p className={styles.loginText}>Login</p>
    </IconButton>
  );
}

export default LoginButton;
