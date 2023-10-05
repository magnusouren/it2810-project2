import { AccountCircle as AccountCircleIcon, PlaylistPlay as PlaylistPlayIcon } from '@mui/icons-material';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useUser } from '../../context/UserContext';
import styles from './LoginButton.module.scss';

function LoginButton() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const userContext = useUser();
  if (!userContext) throw new Error('UserContext is null');
  const { user, login, logout, deleteUser } = userContext;

  const handleLogin = () => {
    login();
    handleMenuClose();
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
  };

  const handleDeleteUser = () => {
    deleteUser();
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
        <MenuItem onClick={handleDeleteUser}>Delete user</MenuItem>
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
