import { AccountCircle as AccountCircleIcon, PlaylistPlay as PlaylistPlayIcon } from '@mui/icons-material';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useUser } from '../../context/UserContext';
import styles from './LoginButton.module.scss';

/**
 * Login button component.
 * If the user is logged in, the user's name is displayed.
 * If the user is not logged in, the login button is displayed.
 * If the user is logged in, a menu is displayed with the following options:
 * - My Watchlist
 * - Logout
 * - Delete user
 *
 * @returns {JSX.Element}
 */
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
      <IconButton color='inherit' onClick={handleMenuOpen} data-testid='menu'>
        <p className={styles.loginText} data-testid='user-name'>
          {user.name}
        </p>
        <PlaylistPlayIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <Link to='/watchlist' className={styles.navLink} data-testid='watchlist-link'>
          <MenuItem onClick={handleMenuClose}>My Watchlist</MenuItem>
        </Link>
        <MenuItem onClick={handleLogout} data-testid='logout'>
          Logout
        </MenuItem>
        <MenuItem onClick={handleDeleteUser} data-testid='delete-user'>
          Delete user
        </MenuItem>
      </Menu>
    </>
  ) : (
    <IconButton color='inherit' onClick={handleLogin} data-testid='login-button'>
      <AccountCircleIcon />
      <p className={styles.loginText}>Login</p>
    </IconButton>
  );
}

export default LoginButton;
