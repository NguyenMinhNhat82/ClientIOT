import React, { useContext, useEffect, useState, Component } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import cookie from 'react-cookies';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import CanvasJSReact from '@canvasjs/react-charts';
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

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;
// sections

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const [user, dispatch] = useContext(MyUserContext);
  const theme = useTheme();
  const navigate = useNavigate();
  const choose = (id) => {
    navigate(`/app/${id}`);
  };

  const [data, setData] = useState();
  const [data1, setData1] = useState();
  const [data2, setData2] = useState();
  const [data3, setData3] = useState();
  const [data4, setData4] = useState();
  const [data5, setData5] = useState();

  const [data1NO, setData1NO] = useState();
  const [data2NO, setData2NO] = useState();
  const [data3NO, setData3NO] = useState();
  const [data4NO, setData4NO] = useState();
  const [data5NO, setData5NO] = useState();
  
  const [data1NO2, setData1NO2] = useState();
  const [data2NO2, setData2NO2] = useState();
  const [data3NO2, setData3NO2] = useState();
  const [data4NO2, setData4NO2] = useState();
  const [data5NO2, setData5NO2] = useState();

  const [data1O3, setData1O3] = useState();
  const [data2O3, setData2O3] = useState();
  const [data3O3, setData3O3] = useState();
  const [data4O3, setData4O3] = useState();
  const [data5O3, setData5O3] = useState();

  const [data1SO2, setData1SO2] = useState();
  const [data2SO2, setData2SO2] = useState();
  const [data3SO2, setData3SO2] = useState();
  const [data4SO2, setData4SO2] = useState();
  const [data5SO2, setData5SO2] = useState();

  const [data1P2, setData1P2] = useState();
  const [data2P2, setData2P2] = useState();
  const [data3P2, setData3P2] = useState();
  const [data4P2, setData4P2] = useState();
  const [data5P2, setData5P2] = useState();
  
  const [data1P10, setData1P10] = useState();
  const [data2P10, setData2P10] = useState();
  const [data3P10, setData3P10] = useState();
  const [data4P10, setData4P10] = useState();
  const [data5P10, setData5P10] = useState();

  const [data1NH3, setData1NH3] = useState();
  const [data2NH3, setData2NH3] = useState();
  const [data3NH3, setData3NH3] = useState();
  const [data4NH3, setData4NH3] = useState();
  const [data5NH3, setData5NH3] = useState();

  const listener = useGlobalState('message')[0];
  useEffect(() => {
    const loaddata = async () => {
      const res = await Apis.get(endpoints.allStation, {
        headers: {
          Authorization: `Bearer ${cookie.load('token')}`,
        },
      });
      console.log(res);
      if (res.data === '') {
        setGlobalState('isAuthorized', false);
      } else {
        setData(res.data);
        console.log(data);
      }
    };
    const datastation1 = async () => {
      const res = await Apis.get(`${endpoints.station}/station1`, {
        headers: {
          Authorization: `Bearer ${cookie.load('token')}`,
        },
      });
      if (res.data === '') {
        setGlobalState('isAuthorized', false);
      } else {
        const responese = [];
        const no = [];
        const no2 = [];
        const o3 = [];
        const so2 = [];
        const p2 = [];
        const p10 = [];
        const nh3 = [];
        res.data.forEach((element) => {
          responese.push({ y: element.component.co, x: new Date(toInteger(element.dt) * 1000) });
          no.push({ y: element.component.no, x: new Date(toInteger(element.dt) * 1000) })
          no2.push({ y: element.component.no2, x: new Date(toInteger(element.dt) * 1000) })
          o3.push({ y: element.component.o3, x: new Date(toInteger(element.dt) * 1000) })
          so2.push({ y: element.component.so2, x: new Date(toInteger(element.dt) * 1000) })
          p2.push({ y: element.component.pm2_5, x: new Date(toInteger(element.dt) * 1000) })
          p10.push({ y: element.component.pm10, x: new Date(toInteger(element.dt) * 1000) })
          nh3.push({ y: element.component.nh3, x: new Date(toInteger(element.dt) * 1000) })

        });
        setData1(responese);
        setData1NO(no);
        setData1NO2(no2);
        setData1O3(o3);
        setData1SO2(so2);
        setData1P2(p2);
        setData1P10(p10);
        setData1NH3(nh3);
      }
    };
    const datastation2 = async () => {
      const res = await Apis.get(`${endpoints.station}/station2`, {
        headers: {
          Authorization: `Bearer ${cookie.load('token')}`,
        },
      });
      if (res.data === '') {
        setGlobalState('isAuthorized', false);
      } else {
        const responese = [];
        const no = [];
        const no2 = [];
        const o3 = [];
        const so2 = [];
        const p2 = [];
        const p10 = [];
        const nh3 = [];
        res.data.forEach((element) => {
          responese.push({ y: element.component.co, x: new Date(toInteger(element.dt) * 1000) });
          no.push({ y: element.component.no, x: new Date(toInteger(element.dt) * 1000) })
          no2.push({ y: element.component.no2, x: new Date(toInteger(element.dt) * 1000) })
          o3.push({ y: element.component.o3, x: new Date(toInteger(element.dt) * 1000) })
          so2.push({ y: element.component.so2, x: new Date(toInteger(element.dt) * 1000) })
          p2.push({ y: element.component.pm2_5, x: new Date(toInteger(element.dt) * 1000) })
          p10.push({ y: element.component.pm10, x: new Date(toInteger(element.dt) * 1000) })
          nh3.push({ y: element.component.nh3, x: new Date(toInteger(element.dt) * 1000) })
        });
        setData2(responese);
        setData2NO(no);
        setData2NO2(no2);
        setData2O3(o3);
        setData2SO2(so2);
        setData2P2(p2);
        setData2P10(p10);
        setData2NH3(nh3);
      }
    };
    const datastation3 = async () => {
      const res = await Apis.get(`${endpoints.station}/station3`, {
        headers: {
          Authorization: `Bearer ${cookie.load('token')}`,
        },
      });
      if (res.data === '') {
        setGlobalState('isAuthorized', false);
      } else {
        const responese = [];
        const no = [];
        const no2 = [];
        const o3 = [];
        const so2 = [];
        const p2 = [];
        const p10 = [];
        const nh3 = [];
        
        res.data.forEach((element) => {
          responese.push({ y: element.component.co, x: new Date(toInteger(element.dt) * 1000) });
          no.push({ y: element.component.no, x: new Date(toInteger(element.dt) * 1000) })
          no2.push({ y: element.component.no2, x: new Date(toInteger(element.dt) * 1000) })
          o3.push({ y: element.component.o3, x: new Date(toInteger(element.dt) * 1000) })
          so2.push({ y: element.component.so2, x: new Date(toInteger(element.dt) * 1000) })
          p2.push({ y: element.component.pm2_5, x: new Date(toInteger(element.dt) * 1000) })
          p10.push({ y: element.component.pm10, x: new Date(toInteger(element.dt) * 1000) })
          nh3.push({ y: element.component.nh3, x: new Date(toInteger(element.dt) * 1000) })
        });
        setData3(responese);
        setData3NO(no);
        setData3NO2(no2);
        setData3O3(o3);
        setData3SO2(so2);
        setData3P2(p2);
        setData3P10(p10);
        setData3NH3(nh3);
      }
    };
    const datastation4 = async () => {
      const res = await Apis.get(`${endpoints.station}/station4`, {
        headers: {
          Authorization: `Bearer ${cookie.load('token')}`,
        },
      });
      if (res.data === '') {
        setGlobalState('isAuthorized', false);
      } else {
        const responese = [];
        const no = [];
        const no2 = [];
        const o3 = [];
        const so2 = [];
        const p2 = [];
        const p10 = [];
        const nh3 = [];
        console.log(data);
        res.data.forEach((element) => {
          responese.push({ y: element.component.co, x: new Date(toInteger(element.dt) * 1000) });
          no.push({ y: element.component.no, x: new Date(toInteger(element.dt) * 1000) })
          no2.push({ y: element.component.no2, x: new Date(toInteger(element.dt) * 1000) })
          o3.push({ y: element.component.o3, x: new Date(toInteger(element.dt) * 1000) })
          so2.push({ y: element.component.so2, x: new Date(toInteger(element.dt) * 1000) })
          p2.push({ y: element.component.pm2_5, x: new Date(toInteger(element.dt) * 1000) })
          p10.push({ y: element.component.pm10, x: new Date(toInteger(element.dt) * 1000) })
          nh3.push({ y: element.component.nh3, x: new Date(toInteger(element.dt) * 1000) })
        });
        setData4(responese);
        setData4NO(no);
        setData4NO2(no2);
        setData4O3(o3);
        setData4SO2(so2);
        setData4P2(p2);
        setData4P10(p10);
        setData4NH3(nh3);
      }
    };
    const datastation5 = async () => {
      const res = await Apis.get(`${endpoints.station}/station5`, {
        headers: {
          Authorization: `Bearer ${cookie.load('token')}`,
        },
      });
      if (res.data === '') {
        setGlobalState('isAuthorized', false);
      } else {
        const responese = [];
        const no = [];
        const no2 = [];
        const o3 = [];
        const so2 = [];
        const p2 = [];
        const p10 = [];
        const nh3 = [];
        res.data.forEach((element) => {
          responese.push({ y: element.component.co, x: new Date(toInteger(element.dt) * 1000) });
          no.push({ y: element.component.no, x: new Date(toInteger(element.dt) * 1000) })
          no2.push({ y: element.component.no2, x: new Date(toInteger(element.dt) * 1000) })
          o3.push({ y: element.component.o3, x: new Date(toInteger(element.dt) * 1000) })
          so2.push({ y: element.component.so2, x: new Date(toInteger(element.dt) * 1000) })
          p2.push({ y: element.component.pm2_5, x: new Date(toInteger(element.dt) * 1000) })
          p10.push({ y: element.component.pm10, x: new Date(toInteger(element.dt) * 1000) })
          nh3.push({ y: element.component.nh3, x: new Date(toInteger(element.dt) * 1000) })
        });
        setData5(responese);
        setData5NO(no);
        setData5NO2(no2);
        setData5O3(o3);
        setData5SO2(so2);
        setData5P2(p2);
        setData5P10(p10);
        setData5NH3(nh3);
      }
    };

    datastation1();
    datastation2();
    datastation3();
    datastation4();
    datastation5();
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
  // data chart
  const options = {
    animationEnabled: true,
    title: {
      text: 'Dữ liệu CO trong vòng 24h của các trạm',
    },
    axisY: {
      title: 'µg/m³',
    },
    toolTip: {
      shared: true,
    },
    data: [
      {
        type: 'spline',
        name: 'Station1',
        showInLegend: true,
        dataPoints: data1,
      },
      {
        type: 'spline',
        name: 'Station2',
        showInLegend: true,
        dataPoints: data2,
      },
      {
        type: 'spline',
        name: 'Station3',
        showInLegend: true,
        dataPoints: data3,
      },
      {
        type: 'spline',
        name: 'Station4',
        showInLegend: true,
        dataPoints: data4,
      },
      {
        type: 'spline',
        name: 'Station5',
        showInLegend: true,
        dataPoints: data5,
      },
    ],
  };
  const optionsNO = {
    animationEnabled: true,
    title: {
      text: 'Dữ liệu NO trong vòng 24h của các trạm',
    },
    axisY: {
      title: 'µg/m³',
    },
    toolTip: {
      shared: true,
    },
    data: [
      {
        type: 'spline',
        name: 'Station1',
        showInLegend: true,
        dataPoints: data1NO,
      },
      {
        type: 'spline',
        name: 'Station2',
        showInLegend: true,
        dataPoints: data2NO,
      },
      {
        type: 'spline',
        name: 'Station3',
        showInLegend: true,
        dataPoints: data3NO,
      },
      {
        type: 'spline',
        name: 'Station4',
        showInLegend: true,
        dataPoints: data4NO,
      },
      {
        type: 'spline',
        name: 'Station5',
        showInLegend: true,
        dataPoints: data5NO,
      },
    ],
  };
  
  const optionsNO2 = {
    animationEnabled: true,
    title: {
      text: 'Dữ liệu NO2 trong vòng 24h của các trạm',
    },
    axisY: {
      title: 'µg/m³',
    },
    toolTip: {
      shared: true,
    },
    data: [
      {
        type: 'spline',
        name: 'Station1',
        showInLegend: true,
        dataPoints: data1NO2,
      },
      {
        type: 'spline',
        name: 'Station2',
        showInLegend: true,
        dataPoints: data2NO2,
      },
      {
        type: 'spline',
        name: 'Station3',
        showInLegend: true,
        dataPoints: data3NO2,
      },
      {
        type: 'spline',
        name: 'Station4',
        showInLegend: true,
        dataPoints: data4NO2,
      },
      {
        type: 'spline',
        name: 'Station5',
        showInLegend: true,
        dataPoints: data5NO2,
      },
    ],
  };

  const optionsO3 = {
    animationEnabled: true,
    title: {
      text: 'Dữ liệu O3 trong vòng 24h của các trạm',
    },
    axisY: {
      title: 'µg/m³',
    },
    toolTip: {
      shared: true,
    },
    data: [
      {
        type: 'spline',
        name: 'Station1',
        showInLegend: true,
        dataPoints: data1O3,
      },
      {
        type: 'spline',
        name: 'Station2',
        showInLegend: true,
        dataPoints: data2O3,
      },
      {
        type: 'spline',
        name: 'Station3',
        showInLegend: true,
        dataPoints: data3O3,
      },
      {
        type: 'spline',
        name: 'Station4',
        showInLegend: true,
        dataPoints: data4O3,
      },
      {
        type: 'spline',
        name: 'Station5',
        showInLegend: true,
        dataPoints: data5O3,
      },
    ],
  };
  const optionsSO2 = {
    animationEnabled: true,
    title: {
      text: 'Dữ liệu SO2 trong vòng 24h của các trạm',
    },
    axisY: {
      title: 'µg/m³',
    },
    toolTip: {
      shared: true,
    },
    data: [
      {
        type: 'spline',
        name: 'Station1',
        showInLegend: true,
        dataPoints: data1SO2,
      },
      {
        type: 'spline',
        name: 'Station2',
        showInLegend: true,
        dataPoints: data2SO2,
      },
      {
        type: 'spline',
        name: 'Station3',
        showInLegend: true,
        dataPoints: data3SO2,
      },
      {
        type: 'spline',
        name: 'Station4',
        showInLegend: true,
        dataPoints: data4SO2,
      },
      {
        type: 'spline',
        name: 'Station5',
        showInLegend: true,
        dataPoints: data5SO2,
      },
    ],
  };
  const optionsPM25 = {
    animationEnabled: true,
    title: {
      text: 'Dữ liệu PM2_5 trong vòng 24h của các trạm',
    },
    axisY: {
      title: 'µg/m³',
    },
    toolTip: {
      shared: true,
    },
    data: [
      {
        type: 'spline',
        name: 'Station1',
        showInLegend: true,
        dataPoints: data1P2,
      },
      {
        type: 'spline',
        name: 'Station2',
        showInLegend: true,
        dataPoints: data2P2,
      },
      {
        type: 'spline',
        name: 'Station3',
        showInLegend: true,
        dataPoints: data3P2,
      },
      {
        type: 'spline',
        name: 'Station4',
        showInLegend: true,
        dataPoints: data4P2,
      },
      {
        type: 'spline',
        name: 'Station5',
        showInLegend: true,
        dataPoints: data5P2,
      },
    ],
  };
  const optionsPM10= {
    animationEnabled: true,
    title: {
      text: 'Dữ liệu PM10 trong vòng 24h của các trạm',
    },
    axisY: {
      title: 'µg/m³',
    },
    toolTip: {
      shared: true,
    },
    data: [
      {
        type: 'spline',
        name: 'Station1',
        showInLegend: true,
        dataPoints: data1P10,
      },
      {
        type: 'spline',
        name: 'Station2',
        showInLegend: true,
        dataPoints: data2P10,
      },
      {
        type: 'spline',
        name: 'Station3',
        showInLegend: true,
        dataPoints: data3P10,
      },
      {
        type: 'spline',
        name: 'Station4',
        showInLegend: true,
        dataPoints: data4P10,
      },
      {
        type: 'spline',
        name: 'Station5',
        showInLegend: true,
        dataPoints: data5P10,
      },
    ],
  };

  const optionsNH3 = {
    animationEnabled: true,
    title: {
      text: 'Dữ liệu NH3 trong vòng 24h của các trạm',
    },
    axisY: {
      title: 'µg/m³',
    },
    toolTip: {
      shared: true,
    },
    data: [
      {
        type: 'spline',
        name: 'Station1',
        showInLegend: true,
        dataPoints: data1NH3,
      },
      {
        type: 'spline',
        name: 'Station2',
        showInLegend: true,
        dataPoints: data2NH3,
      },
      {
        type: 'spline',
        name: 'Station3',
        showInLegend: true,
        dataPoints: data3NH3,
      },
      {
        type: 'spline',
        name: 'Station4',
        showInLegend: true,
        dataPoints: data4NH3,
      },
      {
        type: 'spline',
        name: 'Station5',
        showInLegend: true,
        dataPoints: data5NH3,
      },
    ],
  };
  if(data == null)
  return(<></>)
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
                <Link style={{ textDecoration: 'none' }} to={`/dashboard/info/${element.id}`}>
                  <AppWidgetSummary
                    title={element.name}
                    color="success"
                    icon={'ant-design:desktop-outlined'}
                  />
                </Link>
              </Grid>
            );
          })}
        </Grid>
        <div>
          <CanvasJSChart options={options} />
          <br/>
          <CanvasJSChart options={optionsNO} />
          <br/>
          <CanvasJSChart options={optionsNO2} />
          <br/>
          <CanvasJSChart options={optionsO3} />
          <br/>
          <CanvasJSChart options={optionsSO2} />
          <br/>
          <CanvasJSChart options={optionsPM25} />
          <br/>
          <CanvasJSChart options={optionsPM10} />
          <br/>
          <CanvasJSChart options={optionsNH3} />
          {}
        </div>
      </Container>
    </>
  );
}
