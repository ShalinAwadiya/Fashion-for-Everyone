import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import ShopIcon from '@mui/icons-material/Shop';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Typography from '@mui/material/Typography';
import Search from "../search/Search"
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { ChevronRight } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import ListAltIcon from '@mui/icons-material/ListAlt';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';

import NotificationMenu from './NotificationMenu';
import { isUserLoggedIn, logout } from '../../utils/firebase';


const pages = [
  {
    title: 'Coupons',
    route: 'coupons'
  },
  {
    title: 'Fashion Blogs',
    route: 'fashion-blogs'
  },
  {
    title: 'Products',
    route: 'show_products'
  }];

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(null);
  };

  const [textValue, setTextValue] = useState();

  const [notificanCountValue, setNotificationCountValue] = useState(3);
  const [notificanDropDownValue, setNotificanDropDownValue] = useState(false);


  const onTextChange = (e: any) => setTextValue(e.target.value);
  const handleSubmit = () => console.log(textValue);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNotificationToggle = () => {
    setNotificanDropDownValue(!notificanDropDownValue)
  }

  const handleNotClick = () => {
    setNotificanDropDownValue(!notificanDropDownValue)

  }

  return (
    <AppBar position="relative"
      color="transparent"
      sx={{
        display: { xs: 'flex', md: 'flex' },
        width: '100%'
      }}>
      <Container maxWidth="xl" >
        <Toolbar disableGutters>
          <ShopIcon sx={{ display: { xs: 'none', md: 'flex', fontSize: 'large' }, mr: 1 }} />
          <Typography
            variant="h6"
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 600,
              letterSpacing: '.3rem',
              color: 'sky blue',
              textDecoration: 'none',
            }}
          >SHOP</Typography>

          {/* Pages section Coupons */}
          <Box sx={{ display: { xs: 'none', md: 'flex', flexGrow: 1 } }}>
            {pages.map((page) => (
              <Button
                key={page.title}
                component="a"
                href={"/" + page.route}
                sx={{ my: 2, color: 'black', display: 'block', textDecoration: 'none' }}
              >
                {page.title}
              </Button>
            ))}
            <Button
              key="SubscribeUs"
              component="a"
              sx={{ my: 2, color: 'black', display: 'block' }}
              onClick={handleOpen}
            >
              Subscribe Us
            </Button>
          </Box>


          {/* Responsive NavBar */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, flexGrow: 1 }}>
            <IconButton
              size="large"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit">
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'flex', md: 'none' },
              }}>
              {pages.map((page) => (
                <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                  <Typography
                    textAlign="center"
                    component='a'
                    href={'/' + page.route}
                    sx={{ textDecoration: 'none' }}
                  >
                    {page.title}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <ShopIcon sx={{ display: { xs: 'flex', md: 'none', fontSize: 'large' }, mr: 1, ml: 5 }} />

          <Typography
            variant="h6"
            component="a"
            href="/"
            sx={{
              mr: 2,
              flexGrow: 1,
              display: { xs: 'flex', md: 'none' },
              fontFamily: 'monospace',
              fontWeight: 600,
              letterSpacing: '.3rem',
              color: 'sky blue',
              textDecoration: 'none',
            }}
          >SHOP</Typography>

          {/* Search Bar */}
          <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>
            <Search placeholder="Search for Products" />
          </Box>

          {/* Wishlist */}
          <Link to='/wishlist'>
            <Tooltip title="favourites">
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <Button>
                  <FavoriteIcon sx={{ display: { xs: 'none', md: 'flex', color: 'black', fontSize: 'large' } }} />
                </Button>
              </Box>
            </Tooltip>
          </Link>

          {/* Subscribe Us */}
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <div className={classes.paper}>
                <h2>Subscribe to our NewsLetter!</h2>
                <p>
                  <img src="Subscription.png" height="280" width="250" />
                  <p>You will never miss our podcasts,latest newsletters, etc.<br /> Our newsletteris once a week, every Wednesday.</p>
                  <TextField variant="outlined" size="small" fullWidth onChange={onTextChange} value={textValue} label={"Enter your Email ID"} />
                  <br /> <br />
                  <Button variant="contained" size="large" fullWidth onClick={handleSubmit}>Subscribe</Button>
                </p>
              </div>
            </Fade>
          </Modal>

          {/* Profile */}
          <Link to="/profile">
            <Tooltip title="My profile">
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <Button>
                  <PersonIcon sx={{ display: { xs: 'none', md: 'flex', color: 'black', fontSize: 'large' } }} />
                </Button>
              </Box>
            </Tooltip>
          </Link>

          {/* Cart */}
          <Link to="/cart">
            <Tooltip title="Cart">
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <Button>
                  <ShoppingCartIcon sx={{ display: { xs: 'none', md: 'flex', color: 'black', fontSize: 'large' } }} />
                </Button>
              </Box>
            </Tooltip>
          </Link>

          <Link to="/orders">
            <Tooltip title="My orders">
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <Button>
                  <ListAltIcon sx={{ display: { xs: 'none', md: 'flex', color: 'black', fontSize: 'large' } }} />
                </Button>
              </Box>
            </Tooltip>
          </Link>

          {/* Pages section Sign in */}
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Button
              component="a"
              href="/signup"
              onClick={() => isUserLoggedIn() ? logout() : null}
              sx={{ my: 2, color: 'black', display: 'block' }}
            >
              {isUserLoggedIn() ? "Log out" : "Sign up"}
            </Button>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              sx={{ color: 'black', display: 'block' }}
              onClick={handleNotificationToggle}
            >
              <Badge badgeContent={notificanCountValue} color="error">
                <NotificationsIcon sx={{ display: { xs: 'none', md: 'flex', color: 'black', fontSize: 'large' } }} />
              </Badge>
            </IconButton>
          </Box>

          {/* Responsive Profile, Wishlist, Cart */}
          <Box sx={{ display: { xs: 'flex', md: 'none', ml: 10 } }}>
            <IconButton
              size="large"
              aria-haspopup="true"
              onClick={handleOpenUserMenu}
              color="inherit"
            >
              <ChevronRight />
            </IconButton>

            <Menu
              id="settings"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              sx={{
                display: { xs: 'flex', md: 'none' },
              }}>

              <Link to="/wishlist">
                <MenuItem>
                  <Button>
                    <FavoriteIcon sx={{ color: "black" }} />
                  </Button>
                </MenuItem>
              </Link>

              <Link to="/profile">
                <MenuItem>
                  <Button>
                    <PersonIcon sx={{ color: "black" }} />
                  </Button>
                </MenuItem>
              </Link>

              <Link to="/cart">
                <MenuItem>
                  <Button>
                    <ShoppingCartIcon sx={{ color: "black" }} />
                  </Button>
                </MenuItem>
              </Link>

              <Link to="/orders">
                <MenuItem>
                  <Button>
                    <ListAltIcon sx={{ color: "black" }} />
                  </Button>
                </MenuItem>
              </Link>

              <MenuItem>
                <IconButton
                  size="large"
                  aria-label="show 3 new notifications"
                  color="inherit"
                >
                  <Badge badgeContent={3} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </MenuItem>

              <Link to="/signup">
                <MenuItem>
                  <Button>
                    Sign up
                  </Button>
                </MenuItem>
              </Link>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
      {notificanDropDownValue ? <NotificationMenu handleNotClick={handleNotClick} /> : null}

    </AppBar >
  );
};
export default NavBar;