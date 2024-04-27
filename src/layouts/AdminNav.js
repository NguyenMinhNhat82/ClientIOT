import PropTypes from 'prop-types';
import { useContext, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
// @mui

import { styled, alpha } from '@mui/material/styles';
import { Box, Link, Button, Drawer, Typography, Avatar, Stack } from '@mui/material';
import { AdminContext, MyUserContext } from '../App';

// mock
import { navConfig } from '../configs/NavConfig';
// hooks
import useResponsive from '../hooks/useResponsive';



// components
import SvgColor from '../components/svg-color';
import Logo from '../components/logo';
import Scrollbar from '../components/scrollbar';
import NavSection from '../components/nav-section';
//

import account from '../_mock/account';



// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const StyledAccount = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

// ----------------------------------------------------------------------

AdminNav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function AdminNav({ openNav, onCloseNav }) {
  const [user, dispatch] = useContext(AdminContext);
  const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;
  const output = [
    {
      title: 'Người dùng',
      path: '/admin/home',
      icon: icon('ic_analytics'),
    },
    {
      title: 'Statistical reports',
      path: '/admin/report',
      icon: icon('ic_analytics'),
    }



  ];
  if (user == null) {
    output.push({
      title: 'login',
      path: '/login',
      icon: icon('ic_lock'),
    })
  }

  // const [user, dispatch] = useContext(MyUserContext);
  const { pathname } = useLocation();

  const isDesktop = useResponsive('up', 'lg');

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);


  if (user == null)
    return <Navigate to="/admin/login" />
  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          <>
            <Scrollbar
              sx={{
                height: 1,
                '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
              }}
            >
              <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
                <Logo />
              </Box>

              <Box sx={{ mb: 5, mx: 2.5 }}>
                <Link underline="none">
                  <StyledAccount>
                    <Avatar src={account.photoURL} alt="photoURL" />

                    <Box sx={{ ml: 2 }}>
                      <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                        {user.name}
                      </Typography>

                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {account.role}
                      </Typography>
                    </Box>
                  </StyledAccount>
                </Link>
              </Box>

              <NavSection data={output} />

              <Box sx={{ flexGrow: 1 }} />


            </Scrollbar>
          </>
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          <>
            <Scrollbar
              sx={{
                height: 1,
                '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
              }}
            >
              <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
                <Logo />
              </Box>

              {/* <Box sx={{ mb: 5, mx: 2.5 }}>
                <Link underline="none">
                  <StyledAccount>
                    <Avatar src={account.photoURL} alt="photoURL" />

                    <Box sx={{ ml: 2 }}>
                      <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                        {user.name}
                      </Typography>

                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {account.role}
                      </Typography>
                    </Box>
                  </StyledAccount>
                </Link>
              </Box> */}

              <NavSection data={output} />

              <Box sx={{ flexGrow: 1 }} />


            </Scrollbar>
          </>
        </Drawer>
      )}
    </Box>
  );
}
