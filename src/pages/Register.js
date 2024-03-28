import { useContext, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navigate, useNavigate } from 'react-router-dom';

// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import cookie from "react-cookies";
import { FormCheck } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { setGlobalState } from '..';
import Apis, { authApi, endpoints } from '../configs/Apis'
import { MyUserContext } from '../App';

// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';
import Iconify from '../components/iconify';
// sections
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
  const [showOTP, setShowtOtp] = useState(false)
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setshowRepeatPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState();
  const [pw, setPW] = useState();
  const [mail, setMail] = useState();
  const mdUp = useResponsive('up', 'md');
  const [user, dispatch] = useContext(MyUserContext);

  const handleOtpClick = () => {
    const otpCode = document.getElementById('otp').value
    const process = async () => {
      const validateOTPRes = await Apis.post(`${endpoints.validateOTP}?otpnum=${otpCode}`, {
        "email": mail
      })
      if (validateOTPRes.data === "VALID") {
        const registerRes = await Apis.post(endpoints.register, {
          "name": name,
          "password": pw,
          "email": mail
        })
        if (registerRes.data !== null && registerRes.data !== "") {
          try {
            const res = await Apis.post(endpoints.login, {
              "email": mail,
              "password": pw
            });
            cookie.save("token", res.data.jwtToken);
            if (res.status === 200) {
              setGlobalState("isAuthorized", true)
            }

            const data = await authApi().get(endpoints.current_user);
            const expirationOfToken = await Apis.get(`${endpoints.getExpirationDate}/${res.data.jwtToken}`)
            cookie.save("expiration", expirationOfToken.data);
            cookie.save("user", data);
            console.log(data);
            setGlobalState("user", data);
            dispatch({
              "type": "login",
              "payload": data.data
            });
          }

          catch (error) { alert("Có gì đó không ổn") }
        }
        else {
          alert("Có lỗi xảy ra!!")
          setShowtOtp(false);
        }
      }
      else if (validateOTPRes.data === "NOT MATCH") {
        alert("OTP không trùng")
      }
      else if (validateOTPRes.data === "INVALID") {
        alert("Mã hết hạn")
        setShowtOtp(false)
      }
      else if (validateOTPRes.data === "WRONG") {
        alert("Mã OTP không đúng định dạng")
      }

    }
    process();

  }
  const handleClick = () => {
    const email = document.getElementById('email').value;
    const userName = document.getElementById('username').value
    const password = document.getElementById('password').value;
    setName(userName);
    setPW(password);
    setMail(email);
    const confirmPassword = document.getElementById('repeatPassword').value
    const process = async () => {
      try {
        const checkemail = await Apis.post(endpoints.checkemail, {
          "email": email
        })
        if (password === confirmPassword) {

          if (checkemail.data === false) {

            const OTPRes = await Apis.post(endpoints.generateOTP, {
              "email": email,
              "name": userName
            })
            console.log(OTPRes.data);
            if (OTPRes.data !== 0) {
              setOtp(OTPRes.data);
              setShowtOtp(!showOTP);
              console.log(1)
            }

          }
          else
            alert("Email đã tồn tại")
        } else
          alert("Mật khẩu không trùng")



      }

      catch (error) {
        console.log(error)
        alert("Tài khoản hoặc mật khẩu không khả dụng")
      }
    }
    process();

  };



  if (user != null)
    return <Navigate to="/" />
  return (
    <>
      <Helmet>
        <title> Sign Up | Minimal UI </title>
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
              Hello new guest
            </Typography>
            <img src="/assets/illustrations/illustration_login.png" alt="login" />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>

            {showOTP
              ?

              <>
                <Typography variant="h4" gutterBottom>
                  OTP Verification
                </Typography>
                <TextField id='otp' name="otp" label="OTP code" type='number' />
                <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleOtpClick}>
                  Verify
                </LoadingButton>
              </>
              :
              <>
                <Typography variant="h4" gutterBottom>
                  Sign up form
                </Typography>
                <Stack spacing={3}>
                  <TextField id='email' name="email" label="Email address" />
                  <TextField id='username' name="username" label="User name " />

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
                <br />
                <Stack spacing={3}>
                  <TextField
                    id='repeatPassword'
                    name="repeatPassword"
                    label="Confirm Password"
                    type={showRepeatPassword ? 'text' : 'password'}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setshowRepeatPassword(!showRepeatPassword)} edge="end">
                            <Iconify icon={showRepeatPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                          </IconButton>
                        </InputAdornment>

                      ),
                    }}
                  />
                </Stack>
                <br />
                <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
                  Sign Up
                </LoadingButton>
              </>
            }
          </StyledContent>
        </Container>
      </StyledRoot>




    </>
  );
}
