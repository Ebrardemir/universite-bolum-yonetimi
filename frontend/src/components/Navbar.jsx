import React from 'react';
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
import '../css/navbar.css';
import Logo from '../images/kou.png';
import { Link } from 'react-router-dom';

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const roleId = localStorage.getItem("rolId");

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  
  let pages = [];

  if (roleId === "1") {
    pages = [
      { name: 'Anasayfa', path: '/bolum-panel' },
      { name: 'Ders Programı', path: '/ders-programi-listesi' },
      { name: 'Sınav Programı', path: '/baskan-sinav-programi' },
      { name: 'Yetkilendirme', path: '/baskan-yetki' },
      { name: 'Derslik Planı', path: '/baskan-derslik-plan' },
    ];
  } else if (roleId === "2") {
    pages = [
      { name: 'Anasayfa', path: '/sekreter-panel' },
      { name: 'Ders Programı İşlemleri', path: '/ders-programi-listesi' },
      { name: 'Kullanıcı Ekleme', path: '/kullanici-kayit' },
      { name: 'Sınav Programı İşlemleri', path: '/sinav-programi-liste' },
      { name: 'Öğretim Elemanları', path: '/ogretim-elemani-liste' },
    ];
  } else if (roleId === "3") {
    pages = [
      { name: 'Anasayfa', path: '/akademik-panel' },
      { name: 'Ders Programı', path: '/ders-programi' },
      { name: 'Sınav Programı', path: '/sinav-programi' },
    ];
  } else {
    pages = [
      { name: 'Anasayfa', path: '/home' }
    ];
  }

  return (
    <AppBar position="static" sx={{ backgroundColor: 'gray', width: '100%' }}>
      <Container maxWidth={false} disableGutters sx={{ width: '100%' }}>
        <Toolbar disableGutters sx={{ minHeight: '80px', padding: 0, margin: 0, width: '100%' }}>
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
              fontSize: '22px'
            }}
          >
            Kocaeli Üniversitesi
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu} component={Link} to={page.path}>
                  <Typography textAlign="center">{page.name}</Typography>
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
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
              fontSize: '22px'
            }}
          >
            KOU
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', gap: 3 } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                component={Link}
                to={page.path}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', fontSize: '18px', textTransform: 'none' }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          <Box sx={{ ml: 'auto', mr: '40px' }}>
            <Button
              onClick={() => {
                localStorage.removeItem("rolId");
                localStorage.removeItem("userId");
                localStorage.clear();
                window.location.href = "/login";
              }}
              sx={{ color: 'white', fontWeight: 500 }}
            >
              Çıkış Yap
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
