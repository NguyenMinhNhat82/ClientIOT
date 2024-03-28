import cookie from 'react-cookies';
import { useTheme } from '@mui/material/styles';
import GaugeComponent from 'react-gauge-component';
import { Col, Row, Table } from 'react-bootstrap';
import React, { Component, useContext, useEffect, useState } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { set, toInteger } from 'lodash';
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTypography,
} from 'mdb-react-ui-kit';
import Iconify from '../components/iconify';
import { setGlobalState, useGlobalState } from '..';
import Expired from './Expired';
import Apis, { endpoints } from '../configs/Apis';
import { MyUserContext } from '../App';


const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function Detail() {
  const [user, dispatch] = useContext(MyUserContext);

  const path = useParams();
  const [data, setData] = useState();
  const [dataCo, setDataCo] = useState([]);
  const [dataNO, setDataNo] = useState([]);
  const [dataNO2, setDataNO2] = useState([]);
  const [dataO3, setDataO3] = useState([]);
  const [dataSO2, setDataSO2] = useState([]);
  const [dataPM25, setDataPM25] = useState([]);
  const [dataPM10, setDataPM10] = useState([]);
  const [dataNH3, setDataNH3] = useState([]);
  const [minCo, setMinCo] = useState();
  const [maxCo, setMaxCo] = useState();
  const [minNO, setMinNO] = useState();
  const [maxNO, setMaxNO] = useState();
  const [minNO2, setMinNO2] = useState();
  const [maxNO2, setMaxNO2] = useState();
  const [minO3, setMinO3] = useState();
  const [maxO3, setMaxO3] = useState();
  const [minSO2, setMinSO2] = useState();
  const [maxSO2, setMaxSO2] = useState();
  const [minPm25, setMinPm25] = useState();
  const [maxPm25, setMaxPm25] = useState();
  const [minPm10, setMinPm10] = useState();
  const [maxPm10, setMaxPm10] = useState();
  const [minNH3, setMinNH3] = useState();
  const [maxNH3, setMaxNH3] = useState();

  const listener = useGlobalState('message')[0];
  useEffect(() => {
    const loaddata = async () => {
      const res = await Apis.get(`${endpoints.current_data}/${path.id}`, {
        headers: {
          Authorization: `Bearer ${cookie.load('token')}`,
        },
      });
      console.log(res)
      if (res.data === '') {
        setGlobalState('isAuthorized', false);

      } else {
        setData(res.data);
      }
      console.log(data)
    };
    loaddata();
  }, [listener]);
  // const options = {
  //   animationEnabled: true,
  //   theme: 'light2',
  //   title: {
  //     text: 'Dữ liệu CO trong 1 giờ qua',
  //   },
  //   axisX: {
  //     valueFormatString: 'DD/MM/YYYY HH:mm:ss',
  //     crosshair: {
  //       enabled: true,
  //       snapToDataPoint: true,
  //     },
  //   },
  //   axisY: {
  //     title: 'µg/m³',
  //     includeZero: true,
  //     crosshair: {
  //       enabled: true,
  //     },
  //   },
  //   toolTip: {
  //     shared: true,
  //   },
  //   legend: {
  //     cursor: 'pointer',
  //     verticalAlign: 'bottom',
  //     horizontalAlign: 'left',
  //     dockInsidePlotArea: true,
  //   },
  //   data: [
  //     {
  //       type: 'line',
  //       showInLegend: true,
  //       name: 'CO',
  //       markerType: 'square',
  //       xValueFormatString: 'DD/MM/YYYY HH:mm:ss',
  //       color: '#F08080',
  //       dataPoints: dataCo,
  //     },
  //   ],
  // };

  const isAuthorized = useGlobalState('isAuthorized')[0];
  if (isAuthorized === false || user == null) {
    return (
      <>
        <Expired />
      </>
    );
  }
  if (data == null) return (<></>)
  return (
    <>
      <div className="container">
        <h1 className='text-center'>Dữ liệu các máy cảm biến của trạm {path.id}</h1>
        <MDBCardBody className="p-4">
          <section className="vh-100 " style={{ backgroundColor: "#C1CFEA" }}>
            {/* <MDBContainer className="h-100"> */}
            <MDBRow
              className="ps-2 align-items-center h-100"
              style={{ color: "#282828" }}
            >
              <MDBCol className='col-sm-4'>
                <MDBCard
                  className="mb-4 gradient-custom"
                  style={{ borderRadius: "25px" }}
                >
                  <MDBCardBody className="p-4">
                    <div className="d-flex justify-content-between pb-2">
                      <div>
                        <h2 className="display-2">
                          <strong>23°C</strong>
                        </h2>
                        <p className="text-muted mb-0">Nhiệt độ của đất</p>
                      </div>
                      <div>
                        <img
                          src="https://res.cloudinary.com/dexbjwfjg/image/upload/v1711286895/NhietKe_pvcjdl.jpg"
                          width="150px"
                          alt='img'
                          style={{ borderRadius: '10%' }}
                        />
                      </div>
                    </div>
                  </MDBCardBody>
                </MDBCard>
                <MDBCard
                  className="mb-4 gradient-custom"
                  style={{ borderRadius: "25px" }}
                >
                  <MDBCardBody className="p-4">
                    <div className="d-flex justify-content-between pb-2">
                      <div>
                        <h2 className="display-2">
                          <strong>23°C</strong>
                        </h2>
                        <p className="text-muted mb-0">Nhiệt độ của đất</p>
                      </div>
                      <div>
                        <img
                          src="https://res.cloudinary.com/dexbjwfjg/image/upload/v1711286895/NhietKe_pvcjdl.jpg"
                          width="150px"
                          alt='img'
                          style={{ borderRadius: '10%' }}
                        />
                      </div>
                    </div>
                  </MDBCardBody>
                </MDBCard>

                <MDBCard className="mb-4" style={{ borderRadius: "25px" }}>
                  <MDBCardBody className="p-4">
                    <div className="d-flex justify-content-around text-center pb-3 pt-2">
                      <div className="flex-column">
                        <p className="small">
                          <strong>21°C</strong>
                        </p>
                        <MDBIcon
                          fas
                          icon="sun"
                          size="2x"
                          className="mb-3"
                          style={{ color: "#ddd" }}
                        />
                        <p className="mb-0">
                          <strong>12:00</strong>
                        </p>
                        <p
                          className="mb-0 text-muted"
                          style={{ fontSize: ".65rem" }}
                        >
                          PM
                        </p>
                      </div>
                      <div className="flex-column">
                        <p className="small">
                          <strong>2°C</strong>
                        </p>
                        <MDBIcon
                          fas
                          icon="sun"
                          size="2x"
                          className="mb-3"
                          style={{ color: "#ddd" }}
                        />
                        <p className="mb-0">
                          <strong>1:00</strong>
                        </p>
                        <p
                          className="mb-0 text-muted"
                          style={{ fontSize: ".65rem" }}
                        >
                          PM
                        </p>
                      </div>
                      <div className="flex-column">
                        <p className="small">
                          <strong>20°C</strong>
                        </p>
                        <MDBIcon
                          fas
                          icon="cloud"
                          size="2x"
                          className="mb-3"
                          style={{ color: "#ddd" }}
                        />
                        <p className="mb-0">
                          <strong>2:00</strong>
                        </p>
                        <p
                          className="mb-0 text-muted"
                          style={{ fontSize: ".65rem" }}
                        >
                          PM
                        </p>
                      </div>
                      <div className="flex-column">
                        <p className="small">
                          <strong>19°C</strong>
                        </p>
                        <MDBIcon
                          fas
                          icon="cloud"
                          size="2x"
                          className="mb-3"
                          style={{ color: "#ddd" }}
                        />
                        <p className="mb-0">
                          <strong>3:00</strong>
                        </p>
                        <p
                          className="mb-0 text-muted"
                          style={{ fontSize: ".65rem" }}
                        >
                          PM
                        </p>
                      </div>
                      <div className="flex-column">
                        <p className="small">
                          <strong>18°C</strong>
                        </p>
                        <MDBIcon
                          fas
                          icon="cloud-showers-heavy"
                          size="2x"
                          className="mb-3"
                          style={{ color: "#ddd" }}
                        />
                        <p className="mb-0">
                          <strong>4:00</strong>
                        </p>
                        <p
                          className="mb-0 text-muted"
                          style={{ fontSize: ".65rem" }}
                        >
                          PM
                        </p>
                      </div>
                    </div>
                  </MDBCardBody>
                </MDBCard>


                <MDBCard className="mb-4" style={{ borderRadius: "25px" }}>
                  <MDBCardBody className="p-4">
                    <div className="d-flex justify-content-around text-center pb-3 pt-2">
                      <div className="flex-column">
                        <p className="small">
                          <strong>21°C</strong>
                        </p>
                        <MDBIcon
                          fas
                          icon="sun"
                          size="2x"
                          className="mb-3"
                          style={{ color: "#ddd" }}
                        />
                        <p className="mb-0">
                          <strong>Mon</strong>
                        </p>
                      </div>
                      <div className="flex-column">
                        <p className="small">
                          <strong>20°C</strong>
                        </p>
                        <MDBIcon
                          fas
                          icon="sun"
                          size="2x"
                          className="mb-3"
                          style={{ color: "#ddd" }}
                        />
                        <p className="mb-0">
                          <strong>Tue</strong>
                        </p>
                      </div>
                      <div className="flex-column">
                        <p className="small">
                          <strong>16°C</strong>
                        </p>
                        <MDBIcon
                          fas
                          icon="cloud"
                          size="2x"
                          className="mb-3"
                          style={{ color: "#ddd" }}
                        />
                        <p className="mb-0">
                          <strong>Wed</strong>
                        </p>
                      </div>
                      <div className="flex-column">
                        <p className="small">
                          <strong>17°C</strong>
                        </p>
                        <MDBIcon
                          fas
                          icon="cloud"
                          size="2x"
                          className="mb-3"
                          style={{ color: "#ddd" }}
                        />
                        <p className="mb-0">
                          <strong>Thu</strong>
                        </p>
                      </div>
                      <div className="flex-column">
                        <p className="small">
                          <strong>18°C</strong>
                        </p>
                        <MDBIcon
                          fas
                          icon="cloud-showers-heavy"
                          size="2x"
                          className="mb-3"
                          style={{ color: "#ddd" }}
                        />
                        <p className="mb-0">
                          <strong>Fri</strong>
                        </p>
                      </div>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              <MDBCol className='col-sm-8'>
                <Row>
                  {data.map((element) => {
                    console.log(element.value)
                    return (
                      <Col xs={12} md={6} className="mt-2 mb-2">
                        {' '}
                        CO (carbon monoxide)
                        <GaugeComponent
                          type="semicircle"
                          style={{ width: `300px`, height: `150px` }}
                          arc={{
                            width: 0.1,
                            padding: 0.0005,
                            cornerRadius: 1,
                            // gradient: true,
                            subArcs: [
                              {
                                limit: 1000,
                                color: '#5BE12C',
                                showTick: true,
                                tooltip: {
                                  text: 'Nồng độ an toàn',
                                },
                              },
                              {
                                limit: 2000,
                                color: '#b9dd2d',
                                showTick: true,
                                tooltip: {
                                  text: 'Nồng độ chấp nhận',
                                },
                              },
                              {
                                limit: 10000,
                                color: '#F5CD19',
                                showTick: true,
                                tooltip: {
                                  text: 'Ngưỡng độc tính',
                                },
                              },
                              {
                                color: '#EA4228',
                                tooltip: {
                                  text: 'Ngưỡng gây tử vong',
                                },
                              },
                            ],
                          }}
                          pointer={{
                            color: '#E0E0E0',
                            length: 0.8,
                            width: 15,
                            // elastic: true,
                          }}
                          labels={{
                            valueLabel: {
                              formatTextValue: (value) => `${value}µg/m³`,
                              style: {
                                fill: `#000000`,
                              },
                            },
                            tickLabels: {
                              type: 'outer',
                              defaultTickValueConfig: {
                                formatTextValue: (value) => `${value}`,
                                style: {
                                  fill: `#000000`,
                                  textShadow: ``,
                                },
                              },
                              ticks: [{ value: 0 }],
                            },
                          }}
                          value={element.value}
                          minValue={0}
                          maxValue={20000}
                        />
                      </Col>
                    );
                  })}
                </Row>
              </MDBCol>
            </MDBRow>

            {/* </MDBContainer> */}
          </section>
        </MDBCardBody>


      </div>
      {/* <div style={{ width: `calc(100% / ${1})`, height: 50 }}> </div>
     
      <div style={{ width: `calc(100% / ${1})`, height: 50 }}> </div>
     
      <div style={{ width: `calc(100% / ${1})`, height: 50 }}> </div> */}

    </>
  );
}
