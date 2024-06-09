import { useContext, useEffect, useState } from "react";
import { Col, Form, ListGroup, Row, Table } from "react-bootstrap";
import { Grid, Container, Typography, Button, TextField } from '@mui/material';
import fileDownload from "js-file-download";
import axios, { Axios } from "axios";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import cookie from 'react-cookies';
import { AppWidgetSummary } from '../sections/@dashboard/app';
import { AdminContext } from "../App";
import { setGlobalState, useGlobalState } from "..";
import Apis, { endpoints } from "../configs/Apis";
import ExpiredAdmin from "./ExpiredAdmin";
import MySpinner from "../layouts/Spinner";
import './ControllerStyle.css';
import Overlay from "../components/Overlay";





export default function Controller() {
    const [data, setData] = useState(null);
    const [user, dispatch] = useContext(AdminContext);
    const listener = useGlobalState('message')[0];
    const [showOverlay, setShowOverlay] = useState(false);
    const [showOverlaySuccess, setShowOverlaySuccess] = useState(false);
    const [showOverlayFail, setShowOverlayFail] = useState(false);

    function Modal({ isOpen, message, onClose }) {
        if (!isOpen) {
          return null; // If modal is not open, don't render anything
        }
      
        return (
            <div className="modal">
            <div className="modal-content">
              {/* Use a button element for the close button */}
              <button className="close" onClick={onClose}>&times;</button>
              <p>{message}</p>
            </div>
          </div>
        );
      }
      const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isOperationSuccessful, setIsOperationSuccessful] = useState(false);





    const handleOverlayClick = () => {
        // Do something when the overlay is clicked
        setShowOverlay(false); // Hide the overlay
    };
    const handleOverlayClickSuccess = () => {
        // Do something when the overlay is clicked
        setShowOverlaySuccess(false); // Hide the overlay

        const loaddata = async () => {
            setData(null)
            const res = await Apis.get(endpoints.getAllStationAndSensor, {
                headers: {
                    Authorization: `Bearer ${cookie.load('token')}`,
                },
            });
            if (res.data === '') {
                setGlobalState('isAuthorized', false);
            } else {
                setData(res.data.data);
            }
        };
        loaddata();
    };
    const handleOverlayClickFail = () => {
        // Do something when the overlay is clicked
        setShowOverlayFail(false); // Hide the overlay
    };
    const onHandleEventStation = (idStation) =>{
        const check = document.getElementById(`check_${idStation}`);
        
        if(check.checked){
            const c = window.confirm("Bạn có chắc muốn bật trạm này?");
            if(c === true){
                
                const turnOnStation = async () => {
                    setShowOverlay(true)
                    const res = await Apis.get(endpoints.actveStation +idStation , {
                        headers: {
                            Authorization: `Bearer ${cookie.load('token')}`,
                        },
                    });
                    console.log(res.data)
                    if (res.data === '') {
                        setGlobalState('isAuthorized', false);
                    }
                        if(res.data === "Success"){
                            setShowOverlay(false);
                            setShowOverlaySuccess(true)
                        }
                        else
                            {
                                setShowOverlay(false);
                                setShowOverlayFail(true)
                            }
                    
                };
                turnOnStation();
            }
        }
        else
            {
                const c = window.confirm("Bạn có chắc muốn tắt trạm này?");
                if(c === true){
                    
                    const turnOffStation = async () => {
                        setShowOverlay(true)
                        const res = await Apis.get(endpoints.inActveStation +idStation , {
                            headers: {
                                Authorization: `Bearer ${cookie.load('token')}`,
                            },
                        });
                        if (res.data === '') {
                            setGlobalState('isAuthorized', false);
                        }
                        console.log(res.data)
                        if(res.data === "Success"){
                            
                            setShowOverlay(false);
                            setShowOverlaySuccess(true)


                        }
                        else
                            {
                                setShowOverlay(false);
                                setShowOverlayFail(true)
                            }
                        
                    };
                    turnOffStation();
                }
            }
    }

    const onHandleEventSensor = (idSensor) =>{
        const check = document.getElementById(`check_${idSensor}`);
        
        if(check.checked){
            const c = window.confirm("Bạn có chắc muốn bật máy cảm biến này?");
            if(c === true){
                
                const turnOnStation = async () => {
                    setShowOverlay(true)
                    const res = await Apis.get(endpoints.activeSensor +idSensor , {
                        headers: {
                            Authorization: `Bearer ${cookie.load('token')}`,
                        },
                    });
                    console.log(res.data)
                    if (res.data === '') {
                        setGlobalState('isAuthorized', false);
                    }
                        if(res.data === "Success"){
                            setShowOverlay(false);
                            setShowOverlaySuccess(true)
                        }
                        else
                            {
                                setShowOverlay(false);
                                setShowOverlayFail(true)
                            }
                    
                };
                turnOnStation();
            }
        }
        else
            {
                const c = window.confirm("Bạn có chắc muốn tắt máy cảm biến này?");
                if(c === true){
                    
                    const turnOffStation = async () => {
                        setShowOverlay(true)
                        const res = await Apis.get(endpoints.inActiveSensor +idSensor , {
                            headers: {
                                Authorization: `Bearer ${cookie.load('token')}`,
                            },
                        });
                        if (res.data === '') {
                            setGlobalState('isAuthorized', false);
                        }
                        console.log(res.data)
                        if(res.data === "Success"){
                            
                            setShowOverlay(false);
                            setShowOverlaySuccess(true)


                        }
                        else
                            {
                                setShowOverlay(false);
                                setShowOverlayFail(true)
                            }
                        
                    };
                    turnOffStation();
                }
            }
    }
    useEffect(() => {
        const loaddata = async () => {
            setData(null)
            const res = await Apis.get(endpoints.getAllStationAndSensor, {
                headers: {
                    Authorization: `Bearer ${cookie.load('token')}`,
                },
            });
            if (res.data === '') {
                setGlobalState('isAuthorized', false);
            } else {
                setData(res.data.data);
            }
        };
        loaddata();
    }, [listener]);

    const search = (evt) => {
        evt.preventDefault();
        // navigate(`/admin/home?id=${id}&name=${name}&role=${role}&email=${email}`)
    }
    const handleRefesh = () => {
        // document.getElementById("name").value = ""
        // document.getElementById("email").value = ""
        // document.getElementById("id").value = ""
        // setRole("USER")
        // navigate(`/admin/home`)
    }
    const showSensor = (id) => {
        const listSenor = document.getElementById(id);
        const styles = window.getComputedStyle(listSenor);

        console.log(styles)
        if (styles.display === 'none') {
            listSenor.style.display = 'block'
            document.getElementById(`btn_${id}`).textContent = "Unshow"
        } else {
            listSenor.style.display = 'none'
            document.getElementById(`btn_${id}`).textContent = "Show"
        }
    }

    const isAuthorized = useGlobalState('isAuthorized')[0];
    if (user == null) return <Navigate to="/admin/login" />;
    if (isAuthorized === false) {
        return (
            <>
                <ExpiredAdmin />
            </>
        );
    }
    console.log(data)
    if (data == null)

        return (
            <div className="text-center">
                <MySpinner />
            </div>
        )
    return (<>



        <Container maxWidth="xl">
            <Form onSubmit={search} inline>

                <div className="d-flex flex-row mb-3 gap-5">
                    <div className="search">
                        <TextField
                            id="id"
                            variant="outlined"
                            fullWidth
                            label="Id"
                        // onChange={e => setid(e.target.value)}
                        />
                    </div>
                    <div className="search">
                        <TextField
                            id="name"
                            variant="outlined"
                            fullWidth
                            label="Name"
                        // onChange={e => setName(e.target.value)}
                        />
                    </div>

                    <Button variant="contained" type="submit">
                        Search
                    </Button>
                    <Button variant="contained" onClick={handleRefesh} >
                        Refresh
                    </Button>
                </div>
            </Form>


            <br />
            <br />
            <br />


            <ListGroup>
                <h2>Danh sách tất cả các trạm</h2>

                {data.map((element) => {
                    return (
                        <>
                            <ListGroup.Item style={{ "background-color": "lightgrey", "border": "1px solid" }}>
                                <Row className="align-items-center">
                                    <Col>
                                        <h3>{element.nameStation}</h3>
                                    </Col>
                                    <Col className="d-flex justify-content-end">
                                        <Button id={`btn_${element.idStation}`} onClick={() => showSensor(`${element.idStation}`)}>Show</Button>
                                        <Form>
                                            <Form.Check // prettier-ignore
                                                type="switch"
                                                className = {`custom-switch`}
                                                id={`check_${element.idStation}`}
                                                size="lg"
                                                defaultChecked={element.active}
                                                style={{ width: '50px', height: '30px' }}
                                                onChange={() => onHandleEventStation(element.idStation)}

                                            />
                                        </Form>
                                    </Col>
                                </Row>


                                <div id={element.idStation} style={{ "display": "none" }}>
                                    <br /><br />
                                    <h3>Danh sách các cảm biến:</h3> 
                                    <ListGroup style={{ "margin-left": "100px", "border": "1px solid" }}>
                                    {element.listSensor.map((sensor) => {
                                    return (
                                        <>
                                        <ListGroup.Item>
                                            <Row className="align-items-center">
                                                <Col>
                                                    <h4>{sensor.idSensor}</h4>
                                                </Col>
                                                <Col className="d-flex justify-content-end">

                                                    <Form>
                                                        <Form.Check // prettier-ignore
                                                            type="switch"
                                                            className="custom-switch"
                                                            id={`check_${sensor.idSensor}`}
                                                            size="lg"
                                                            style={{ width: '50px', height: '30px' }}
                                                            defaultChecked = {sensor.active}
                                                            onChange={() => onHandleEventSensor(sensor.idSensor)}
                                                            
                                                        />
                                                    </Form>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                        </>)})}
                                        
                                    </ListGroup>
                                </div>
                            </ListGroup.Item>
                        </>
                    )
                })}
            </ListGroup>
        </Container>
        <Overlay show={showOverlay} onClick={handleOverlayClick} type={"loading"}/>
        <Overlay show={showOverlaySuccess} onClick={handleOverlayClickSuccess} type={"success"}/>
        <Overlay show={showOverlayFail} onClick={handleOverlayClickFail} type={"fail"}/>

    </>)
}