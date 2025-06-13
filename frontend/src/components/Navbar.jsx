import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import '../css/navbar.css'
import Logo from '../images/kou.png'
import { Link } from 'react-router-dom';


const pages = [
  { name: 'Anasayfa', path: '/home' },
  { name: 'Ders Programı', path: '/course-schedule' }
];


function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'gray', width: '100%' }}>
      <Container maxWidth={false} disableGutters sx={{ width: '100%' }}>
        <Toolbar disableGutters sx={{ minHeight: '80px', padding: 0, margin: 0, width: '100%' }} >
          <img src={Logo} width={70} height={70} className='logo' />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to='/home'
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'arial',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
              padding: '20px 15px 20px 10px',
              fontSize: '22PX'
            }}
          >
            Kocaeli Üniversitesi
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
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
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu} component={Link}
                to={page.path}>
                  <Typography sx={{ textAlign: 'center' }}>{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/home"
            sx={{
              mr: 25,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'arial',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
              fontSize: '22px'
            }}
          >
            KOU
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', gap: 25 } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                component={Link}
                to={page.path}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block', fontSize: '18px', textTransform: 'none' }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0, ml: 'auto', marginRight: '40px' }}>
            <Typography sx={{ color: 'white', fontWeight: 500, fontSize: '18px' }}>
              Ebrar
            </Typography>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar