//Author: Manan Amin (B00897712)

import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function NotificationMenu({ handleNotClick }) {
  const [anchorEl, setAnchorEl] = React.useState(true);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    handleNotClick(false);
  };

  return (
    <div>
      <Menu
        anchorReference="anchorPosition"
        anchorPosition={{ top: 70, left: 1550 }}
        id="menu-appbar"
        open={open}
        onClose={handleClose}
        onClick={handleClick}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'center', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
      >
        <MenuItem>
          <p> Notification 1: this is sample notification 1</p>
        </MenuItem>
        <MenuItem>
          <p> Notification 2: this is sample notification 2</p>
        </MenuItem>
        <MenuItem>
          <p> Notification 3: this is sample notification 3</p>
        </MenuItem>
      </Menu>
    </div>
  );
}

export default NotificationMenu;
