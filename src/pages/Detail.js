import cookie from 'react-cookies';
import { useTheme } from '@mui/material/styles';
import GaugeComponent from 'react-gauge-component';
import { Col, Row, Table } from 'react-bootstrap';
import { Flex } from '@chakra-ui/react';
import React, { Component, useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { set, toInteger } from 'lodash';
import { MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBIcon, MDBRow, MDBTypography } from 'mdb-react-ui-kit';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { setGlobalState, useGlobalState } from '..';
import Expired from './Expired';
import Apis, { endpoints } from '../configs/Apis';
import { MyUserContext } from '../App';
import CurrentContent from '../components/CurrentContent';
import MinMax from '../components/MinMax';
import MySpinner from '../layouts/Spinner';

const indexPage = {
  backgroundColor: '#F0EEEE',
  padding: '10px',
};
const station = {
  display: 'flex',
  justifyContent: 'space-around',
};
const stationBanner = {
  backgroundColor: '#FFFFFF',
  width: '35%',
  height: '100px',
  display: 'flex',
  justifyContent: 'space-between',
  padding: '10px',
};
const stationInfor = {
  backgroundColor: '#CCFFFF',
  width: '30%',
  height: '100px',
  display: 'flex',
  justifyContent: 'center',
  fontSize: '25px',
  alignItems: 'center',
  boxShadow: '5px 5px 10px 0 rgba(0, 0, 0, 0.1)',
};
const styles = {
  headerCell: {
    backgroundColor: '#ffffff',
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
  },
  dataCell: {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'center',
  },
};
const indexSensor = {
  width: '100%',
  height: '150px',
  display: 'flex',
  gap:"30px",
  justifyContent: 'center',
  alignItems: 'center',
};
const childSensor = {
  width: '25%',
  height: '150px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};
const disable = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="60"
    height="30"
    color="blue"
    fill="currentColor"
    className="bi bi-toggle-off"
    viewBox="0 0 16 16"
  >
    <path d="M11 4a4 4 0 0 1 0 8H8a5 5 0 0 0 2-4 5 5 0 0 0-2-4zm-6 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8M0 8a5 5 0 0 0 5 5h6a5 5 0 0 0 0-10H5a5 5 0 0 0-5 5" />
  </svg>
);
const enable = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="60"
    color="blue"
    height="30"
    fill="currentColor"
    className="bi bi-toggle-on"
    viewBox="0 0 16 16"
  >
    <path d="M5 3a5 5 0 0 0 0 10h6a5 5 0 0 0 0-10zm6 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8" />
  </svg>
);

export default function Detail() {
  const [indexValue, setIndexValue] = useState(1);
  const [nameValue, setNameValue] = useState(1);
  const [pic, setPic] = useState(<svg
    xmlns="http://www.w3.org/2000/svg"
    width="50"
    height="50"
    fill="currentColor"
    className="bi bi-thermometer-sun"
    viewBox="0 0 16 16"
  >
    <path d="M5 12.5a1.5 1.5 0 1 1-2-1.415V2.5a.5.5 0 0 1 1 0v8.585A1.5 1.5 0 0 1 5 12.5" />
    <path d="M1 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0zM3.5 1A1.5 1.5 0 0 0 2 2.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0L5 10.486V2.5A1.5 1.5 0 0 0 3.5 1m5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5m4.243 1.757a.5.5 0 0 1 0 .707l-.707.708a.5.5 0 1 1-.708-.708l.708-.707a.5.5 0 0 1 .707 0M8 5.5a.5.5 0 0 1 .5-.5 3 3 0 1 1 0 6 .5.5 0 0 1 0-1 2 2 0 0 0 0-4 .5.5 0 0 1-.5-.5M12.5 8a.5.5 0 0 1 .5-.5h1a.5.5 0 1 1 0 1h-1a.5.5 0 0 1-.5-.5m-1.172 2.828a.5.5 0 0 1 .708 0l.707.708a.5.5 0 0 1-.707.707l-.708-.707a.5.5 0 0 1 0-.708M8.5 12a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5" />
  </svg>);

  // Hàm xử lý sự kiện khi nhấp chuột vào childSensor
  const handleChildClick = (event, sensorId, value, classPic,unitSensor) => {
    event.preventDefault();
    // Cập nhật giá trị của indexSensor thành giá trị của childSensor
    console.log(event);
    console.log(sensorId);
    console.log(value);
    setPic(classPic)
    setUnit(unitSensor)
    setIndexValue(value);
    setNameValue(sensorId);
  };
  const [user, dispatch] = useContext(MyUserContext);
  const [stationInfo, setStationInfo] = useState();

  const [relay, setRelay] = useState();
  const path = useParams();
  const [data, setData] = useState();
  const listener = useGlobalState('message')[0];
  const [data1Hour, setData1Hour] = useState();
  const [data1Day, setData1Day] = useState();
  const [data1Week, setData1Week] = useState();
  const [data1Month, setData1Mont] = useState();
  const [sensorID, setSensorID] = useState();
  const [minMax, setMinMax] = useState();
  const [unit, setUnit] = useState("°C");


  const formatdDte = (e)=>{
   
    return `Date:${e.split("T")[0]}, Time${e.split("T")[1]}`
  }
  const handleOnChangeSensor = (e) => {
    setSensorID(e);
    const data1h = [];
    const data1d = [];
    const data1w = [];
    const data1m = [];
    


    const loadInfoSensor1Hour = async () => {
      const res = await Apis.get(`${endpoints.valueSensor1Hour}/${e}`, {
        headers: {
          Authorization: `Bearer ${cookie.load('token')}`,
        },
      });
      for (let i = 0; i < res.data.length; i += 1) {
        data1h.push({
          name: `${formatdDte(res.data[i].timeUpdate)}`,
          value: res.data[i].value,
        });
      }
      setData1Hour(data1h);
    };
    const loadDataMinMax = async () => {
      const resMinMax = await Apis.get(`${endpoints.valueMinMax}/${e}`, {
        headers: {
          Authorization: `Bearer ${cookie.load('token')}`,
        },
      });
      setMinMax(resMinMax.data)
    }
    const loadInfoSensor1Day = async () => {
      const res = await Apis.get(`${endpoints.valueSensor1Day}/${e}`, {
        headers: {
          Authorization: `Bearer ${cookie.load('token')}`,
        },
      });
      for (let i = 0; i < res.data.length; i += 1) {
        data1d.push({
          name: `${formatdDte(res.data[i].timeUpdate)}`,
          value: res.data[i].value,
        });
      }
      setData1Day(data1d);
    };

    const loadInfoSensor1Week = async () => {
      const res = await Apis.get(`${endpoints.valueSensor1Week}/${e}`, {
        headers: {
          Authorization: `Bearer ${cookie.load('token')}`,
        },
      });
      for (let i = 0; i < res.data.length; i += 1) {
        data1w.push({
          name: `${formatdDte(res.data[i].timeUpdate)}`,
          value: res.data[i].value,
        });
      }
      setData1Week(data1w);
    };

    const loadInfoSensor1Monh = async () => {
      const res = await Apis.get(`${endpoints.valueSensor1Month}/${e}`, {
        headers: {
          Authorization: `Bearer ${cookie.load('token')}`,
        },
      });
      for (let i = 0; i < res.data.length; i += 1) {
        data1m.push({
          name: `${formatdDte(res.data[i].timeUpdate)}`,
          value: res.data[i].value,
        });
      }
      setData1Mont(data1m);
    };
    loadInfoSensor1Hour();
    loadInfoSensor1Week();
    loadInfoSensor1Day();
    loadInfoSensor1Monh();
    loadDataMinMax();
  };
  useEffect(() => {
    const loadInfoStation = async () => {
      const res = await Apis.get(`${endpoints.stationInfo}/${path.id}`, {
        headers: {
          Authorization: `Bearer ${cookie.load('token')}`,
        },
      });
      setStationInfo(res.data);
      console.log(stationInfo);
    };
    const loaddata = async () => {
      const res = await Apis.get(`${endpoints.current_data}/${path.id}`, {
        headers: {
          Authorization: `Bearer ${cookie.load('token')}`,
        },
      });
      const resRelay = await Apis.get(`${endpoints.current_data}/Relay/station/${path.id}`, {
        headers: {
          Authorization: `Bearer ${cookie.load('token')}`,
        },
      });
      setRelay(resRelay.data);
      if (res.data === '') {
        setGlobalState('isAuthorized', false);
      } else {
        setData(res.data);
      }
      console.log(data);
    };
    loaddata();
    loadInfoStation();

  }, [listener]);
  const isAuthorized = useGlobalState('isAuthorized')[0];
  if (isAuthorized === false || user == null) {
    return (
      <>
        <Expired />
      </>
    );
  }

  if (stationInfo == null || relay == null) return <>
   <div className='text-center'>
  <MySpinner/>
  </div>
  </>;
  return (
    <>
      <div className="indexPage" style={indexPage}>
        <div className="Banner" style={station}>
          <div className="StationInfor" style={(stationBanner, stationInfor)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-houses"
              viewBox="0 0 16 16"
            >
              <path d="M5.793 1a1 1 0 0 1 1.414 0l.647.646a.5.5 0 1 1-.708.708L6.5 1.707 2 6.207V12.5a.5.5 0 0 0 .5.5.5.5 0 0 1 0 1A1.5 1.5 0 0 1 1 12.5V7.207l-.146.147a.5.5 0 0 1-.708-.708zm3 1a1 1 0 0 1 1.414 0L12 3.793V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3.293l1.854 1.853a.5.5 0 0 1-.708.708L15 8.207V13.5a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 4 13.5V8.207l-.146.147a.5.5 0 1 1-.708-.708zm.707.707L5 7.207V13.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5V7.207z" />
            </svg>
            {stationInfo.name}
          </div>
          <div className="StationClock" style={(stationBanner, stationInfor)}>
            <iframe
              scrolling="no"
              frameBorder="no"
              title="clock"
              style={{
                overflow: 'hidden',
                border: '0',
                margin: '0',
                padding: '0',
                width: '120px',
                height: '40px',
              }}
              src="https://www.clocklink.com/html5embed.php?clock=004&timezone=GMT0700&color=blue&size=120&Title=&Message=&Target=&From=2024,1,1,0,0,0&Color=blue"
            />
          </div>
          <div className="StationStage" style={stationBanner}>
            {relay.map((element) => {
              return (
                <div style={{ marginTop: '10px' }}>
                  {`${element.sensor.id.split('_')[0]} ${element.sensor.id.split('_')[1]}`}
                  {element.value === 'true' ? enable : disable}
                </div>
              );
            })}
            {/* <div style={{ marginTop: '10px' }}>Relay 0001{enable}</div>
              <div style={{ marginTop: '10px' }}>Relay 0002{disable}</div>
              <div style={{ marginTop: '10px' }}>Relay 0003{disable}</div>
              <div style={{ marginTop: '10px' }}>Relay 0004{disable}</div> */}
          </div>
        </div>
        <CurrentContent id = {path.id} />
        <MinMax id = {path.id}/>
      
      </div>
    </>
  );
}
