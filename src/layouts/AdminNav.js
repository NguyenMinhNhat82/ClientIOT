import PropTypes from 'prop-types';
import { useContext, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
// @mui
import cookie from 'react-cookies';

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
import { setGlobalState, useGlobalState } from '..';


import Apis, { endpoints } from '../configs/Apis';



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
      title: 'User',
      path: '/admin/home',
      icon: icon('ic_analytics'),
    },
    {
      title: 'Statistical reports',
      path: '/admin/report',
      icon: icon('ic_analytics'),
    },
    {
      title: 'Controller',
      path: '/admin/controller',
      icon: icon('ic_analytics'),
    },
    {
      title: 'Notification',
      path: '/admin/notification',
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
  const listener = useGlobalState('message')[0];

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, listener]);

  useEffect(() => {
    
    const loaddata = async () => {
      const res = await Apis.get(endpoints.getNumberUnread, {
          headers: {
              Authorization: `Bearer ${cookie.load('token')}`,
          },
      });
      if (res.data === '') {
          setGlobalState('isAuthorized', false);
      } else {
        console.log(`test${res.data}`)
        const notification  = document.querySelector("#root > div > nav > div > div > div > div > div.simplebar-wrapper > div.simplebar-mask > div > div > div > div.MuiBox-root.css-0 > ul > a:nth-child(4)");
        if(notification != null){
          console.log(notification.childNodes.length)
          if(notification.childNodes.length > 2){
            if (notification.lastChild) {
              notification.removeChild(notification.lastChild);
            }
            
          }
          const spanElement = document.createElement("span");
          
        
          // Set the inner HTML content to "0"
          spanElement.innerHTML = res.data
          spanElement.style.padding = "4px 13px";
          spanElement.style.backgroundColor = "red";
          spanElement.style.color = "white";
          spanElement.style.borderRadius = "10px";
          
          notification.appendChild(spanElement)
      }
    }
  };
  loaddata();
  }, [listener]);
  

  

 

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
