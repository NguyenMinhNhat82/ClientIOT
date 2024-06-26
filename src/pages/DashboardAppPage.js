import React, { useContext, useEffect, useState, Component } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import cookie from 'react-cookies';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import { toInteger } from 'lodash';
import Apis, { endpoints } from '../configs/Apis';
import Button from '../theme/overrides/Button';
import { setGlobalState, useGlobalState } from '..';
import { MyUserContext } from '../App';

// components
import Iconify from '../components/iconify';
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';
import Expired from './Expired';
import MySpinner from '../layouts/Spinner';

// sections

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const [user, dispatch] = useContext(MyUserContext);
  const theme = useTheme();

 

  const [data, setData] = useState();

  const listener = useGlobalState('message')[0];
  useEffect(() => {
    const loaddata = async () => {
      const res = await Apis.get(endpoints.allStation, {
        headers: {
          Authorization: `Bearer ${cookie.load('token')}`,
        },
      });
      
      if (res.data === '') {
        setGlobalState('isAuthorized', false);
      } else {
        setData(res.data);
        
      }
    };
    loaddata();
  }, [listener]);

  const isAuthorized = useGlobalState('isAuthorized')[0];
  const formatTitle = (str) => {
    return str
      .slice(0, 1)
      .toUpperCase()
      .concat(str.slice(1, 7).concat(` ${str.substring(7, 9)}`));
  };

  if (user == null) return <Navigate to="/login" />;
  if (isAuthorized === false) {
    return (
      <>
        <Expired />
      </>
    );
  }
  if (data == null) return <>
    <div className='text-center'>
      <MySpinner/>
    </div>
  </>;
  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          {data.map((element) => {
            return (
              <Grid item xs={12} sm={6} md={3}>
                <Link style={{ textDecoration: 'none' }} to={element.active ===true?`/dashboard/info/${element.id}`:""}>
                  <AppWidgetSummary title={element.name} color={element.active===true?"success":"warning"} icon={'ant-design:desktop-outlined'} />
                </Link>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </>
  );
}
