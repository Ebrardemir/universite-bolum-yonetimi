import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/login.css';

function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/rest/api/gorevli/giris-yap`,
                {
                    kullaniciAdi: username,
                    sifre: password,
                }
            );

            const user = response.data;
            console.log('Giriş başarılı:', user);

            // ÖNEMLİ: rolId ve userId sakla
            localStorage.setItem('rolId', user.rolId);
            localStorage.setItem('userId', user.id);

            alert('Giriş başarılı!');

            // rolId'ye göre yönlendir
            if (user.rolId === 1) {
                navigate('/bolum-panel'); // örnek sayfa
            } else if (user.rolId === 2) {
                navigate('/sekreter-panel'); // örnek sayfa
            } else if (user.rolId === 3) {
                navigate('/akademik-panel'); // örnek sayfa
            } else {
                alert('Bilinmeyen rol!');
            }

        } catch (error) {
            console.error('Giriş hatası:', error);
            alert('Giriş başarısız! Lütfen bilgileri kontrol edin.');
        }
    };

    return (
        <div className='login-form'>
            {/* Kullanıcı Adı */}
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <TextField
                    id="input-with-sx"
                    label="Kullanıcı Adı"
                    variant="standard"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </Box>

            {/* Şifre */}
            <FormControl sx={{ mt: 2, width: '25ch' }} variant="standard">
                <InputLabel htmlFor="standard-adornment-password">Şifre</InputLabel>
                <Input
                    id="standard-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label={showPassword ? 'Şifreyi gizle' : 'Şifreyi göster'}
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
            <div className="butonDiv">
                <Button className="custom-button" onClick={handleLogin}>
                    Giriş
                </Button>
            </div>


        </div>
    );
}

export default LoginForm;
