import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';

const LogoutButton = () => {
  const { logout } = useAuth0();
  
  const handleClose = () => {
    localStorage.removeItem('user-id');
    logout({ returnTo: window.location.origin });
  };

  return (
    // <Button
    //   buttonStyle="btn--outline"
    //   onClick={handleClose}
    // >
    //   Log Out
    // </Button>
    <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
    </MenuItem>
  );
};

export default LogoutButton;
