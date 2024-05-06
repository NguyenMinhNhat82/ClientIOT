import { useContext, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Form, Link, Navigate, useNavigate } from 'react-router-dom';

// @mui
import { styled } from '@mui/material/styles';
import {
  Container,
  Typography,
  Divider,
  Stack,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Checkbox,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import cookie from 'react-cookies';
import { setGlobalState } from '..';
import Apis, { authApi, endpoints } from '../configs/Apis';
import { MyUserContext } from '../App';

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
const divStyleBoxCaptcha = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
};
const captchaTextStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  border: '1px solid #D2D2D2',
  width: '250px',
  borderRadius: '5px',
  fontFamily: 'cursive',
  fontSize: '25px',
  color: '#A0A0A0',
  letterSpacing: '3px',
  textDecoration: 'line-through',
};
const captchaButtonStyle = {
  backgroundColor: '#2065D1',
  color: 'white',
  height: '30px',
  width: '30px',
};
// ----------------------------------------------------------------------

export default function LoginPage() {
  const randomcaptcha = Math.random().toString(36).slice(8);
  const refreshCap = () => {
    setcaptcha(Math.random().toString(36).slice(8));
  };
  const [captcha, setcaptcha] = useState(randomcaptcha);
  const navigate = useNavigate();
  document.body.classList.add('active-modal');

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    cookie.save('user', '');
    cookie.save('token', '');
  }, []);
  const handleClick = () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const captchatext = document.getElementById('captcha').value;
    const process = async () => {
      try {
        const res = await Apis.post(endpoints.login, {
          email,
          password,
        });
        cookie.save('token', res.data.jwtToken);
        
        if (res.status === 200 && captchatext === document.getElementById('textcap').textContent) {
          setGlobalState('isAuthorized', true);
          const data = await authApi().get(endpoints.current_user);
          const expirationOfToken = await Apis.get(`${endpoints.getExpirationDate}/${res.data.jwtToken}`);
          cookie.save('expiration', expirationOfToken.data);
          cookie.save('user', data);
          setGlobalState('user', data);
          dispatch({
            type: 'login',
            payload: data.data,
          });
        } else {
          alert('sai mã');
        }
      } catch (error) {
        alert('Tài khoản hoặc mật khẩu không khả dụng');
      }
    };
    process();
  };

  const mdUp = useResponsive('up', 'md');
  const [user, dispatch] = useContext(MyUserContext);
  if (user != null) return <Navigate to="/" />;
  return (
    <>
      <Helmet>
        <title> Login | Minimal UI </title>
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
              Hi, Welcome Back
            </Typography>
            <img src="/assets/illustrations/illustration_login.png" alt="login" />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Sign in
            </Typography>

            <Typography variant="body2" sx={{ mb: 5 }}>
              Don’t have an account? {''}
              <Link variant="subtitle2" to={'/register'}>
                Get started
              </Link>
            </Typography>

            <Stack spacing={3}>
              <TextField id="email" name="email" label="Email address" />

              <TextField
                id="password"
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
              <div className="box-captcha" style={divStyleBoxCaptcha}>
                <div className="classcaptcha" id="textcap" style={captchaTextStyle}>
                  {captcha}
                  <Button onClick={refreshCap} style={captchaButtonStyle}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-arrow-clockwise"
                      viewBox="0 0 16 16"
                    >
                      <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z" />
                      <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
                    </svg>
                  </Button>
                </div>
                <TextField id="captcha" name="captcha" label="nhập mã xác thực" />
              </div>
            </Stack>
            <br />
            <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
              Login
            </LoadingButton>
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
