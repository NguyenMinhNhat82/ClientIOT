import { useContext, useState,useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Form, Link, Navigate, useNavigate } from 'react-router-dom';

// @mui
import { styled } from '@mui/material/styles';
import {  Container, Typography, Divider, Stack, Button, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import cookie from "react-cookies";
import { setGlobalState } from '..';
import Apis, { authApi, endpoints } from '../configs/Apis'
import { AdminContext, MyUserContext } from '../App';

// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';
import Iconify from '../components/iconify';










// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
  const navigate = useNavigate();
  document.body.classList.add("active-modal")

  const [showPassword, setShowPassword] = useState(false);


  useEffect(() => {
    cookie.save("user","");
    cookie.save("token","")
   },[])
  const handleClick = () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const process = async () => {
      try {
        const res = await Apis.post(endpoints.adminLogin, {
          "email": email,
          "password": password
        }); 
        cookie.save("token", res.data.jwtToken);
        console.log(res.status)
        if(res.status === 200){
          setGlobalState("isAuthorized",true)
        }
      
        const data = await authApi().get(endpoints.current_user);
        const expirationOfToken = await Apis.get(`${endpoints.getExpirationDate}/${res.data.jwtToken}`)
        cookie.save("expiration", expirationOfToken.data);
        cookie.save("user", data);
        setGlobalState("user",data);
        adminDispatch({
          "type": "login",
          "payload": data.data
        });
        
        
      }

      catch (error) { alert("Tài khoản hoặc mật khẩu không khả dụng") }
    }
    process();
    // navigate('/dashboard', { replace: true });
  };


  const mdUp = useResponsive('up', 'md');
  const [admin, adminDispatch] = useContext(AdminContext);
  if (admin != null)
    return <Navigate to="/admin/home" />
  return (
    <>
      <Helmet>
        <title> Login | Admin site </title>
      </Helmet>

      <StyledRoot>
        <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Admin site
            </Typography>
            <img src="https://res.cloudinary.com/dexbjwfjg/image/upload/v1709322999/1707097_axqeut.png" width={500} alt="login" />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Sign in
            </Typography>
            <Stack spacing={3}>
              <TextField id='email' name="email" label="Email address" />

              <TextField
                id='password'
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
                <br/>
            <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
              Login
            </LoadingButton>
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
