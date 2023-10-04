import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem } from '@mui/material';
import { Home as HomeIcon, AccountCircle as AccountCircleIcon, PlaylistPlay as PlaylistPlayIcon } from '@mui/icons-material';
import './Navbar.scss';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    setLoggedIn(true);
    handleMenuClose();
  };

  const handleLogout = () => {
    setLoggedIn(false);
    handleMenuClose();
  };

  return (
    <AppBar position="static">
      <Toolbar className="navbar-toolbar">
        <Link to="/fihihf" className='navLink'>
            <IconButton edge="start" color="inherit" aria-label="home">
            <HomeIcon />
            <Typography variant="h6" className="navbar-title">
            MovieMan
            </Typography>
            </IconButton>
        </Link>
        {loggedIn ? (
          <>
            <IconButton color="inherit" onClick={handleMenuOpen}>
              <PlaylistPlayIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <Link to="/watchlist" className='navLink'>
                <MenuItem onClick={handleMenuClose}>My Watchlist</MenuItem>
            </Link>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <IconButton color="inherit" onClick={handleLogin}>
            <AccountCircleIcon /> 
            Login
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
