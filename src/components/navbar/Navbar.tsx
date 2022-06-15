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
import { IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { ChevronRight } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const pages = ['Coupons', 'Blog', 'Trends'];

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

          {/* Pages section (MEN, WOMEN) */}
          <Box sx={{ display: { xs: 'none', md: 'flex', flexGrow: 1 } }}>
            <Link to='/coupons'>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'black', display: 'block' }}
              >
                Coupons
              </Button>
            </Link>
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
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
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
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Button>
              <FavoriteIcon sx={{ display: { xs: 'none', md: 'flex', color: 'black', fontSize: 'large' } }} />
            </Button>
          </Box>

          {/* Profile */}
          <Link to="/profile">
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Button>
                <PersonIcon sx={{ display: { xs: 'none', md: 'flex', color: 'black', fontSize: 'large' } }} />
              </Button>
            </Box>
          </Link>

          {/* Cart */}
          <Link to="/cart">
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Button>
                <ShoppingCartIcon sx={{ display: { xs: 'none', md: 'flex', color: 'black', fontSize: 'large' } }} />
              </Button>
            </Box>
          </Link>

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

              <MenuItem>
                <Button>
                  <FavoriteIcon sx={{ color: "black" }} />
                </Button>
              </MenuItem>

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

            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;