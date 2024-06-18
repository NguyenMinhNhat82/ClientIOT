import { useEffect, useState } from "react";
import cookie from 'react-cookies';
import { Box, ThemeProvider } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { setGlobalState, useGlobalState } from "..";
import MySpinner from "../layouts/Spinner";
import Apis, { endpoints } from "../configs/Apis";
import ExpiredAdmin from "../pages/ExpiredAdmin";
import MinMax from "./MinMax";





export default function CurrentContent(id) {
    const [state, setState] = useState();
    const [valueChange, setValueChange] = useState();
    const [temp, setTemp] = useState();
    const [humi, setHumi] = useState();
    const [ph, setPH] = useState();
    const [ec, setEC] = useState();
    const [kali, setKali] = useState();
    const [photpho, setPhotpho] = useState();
    const [nito, setNito] = useState();
    const listener = useGlobalState('message')[0];
    const [indexValue, setIndexValue] = useState(1);
    const [nameValue, setNameValue] = useState(1);
    const [idSensor, setIdSensor] = useState(id.id);
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
    const [unit, setUnit] = useState("°C");

    const handleChildClick = (event, sensorId, value, classPic, unitSensor, statevSensor, valueC,idS) => {
        event.preventDefault();
        // Cập nhật giá trị của indexSensor thành giá trị của childSensor
        setPic(classPic)
        setUnit(unitSensor)
        setIndexValue(value);
        setNameValue(sensorId);
        setState(statevSensor)
        setValueChange(valueC)
        setIdSensor(idS)
        console.log(idSensor)

    };
    const indexSensor = {
        width: '100%',
        height: '150px',
        display: 'flex',
        gap: "30px",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F2EFDE'
    };
    const childSensor = {
        width: '25%',
        height: '150px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    useEffect(() => {
        const loadData = async () => {
            const res = await Apis.get(`${endpoints.current_data}/${id.id}`, {
                headers: {
                    Authorization: `Bearer ${cookie.load('token')}`,
                },
            });
    
            if (res.data === '') {
                setGlobalState('isAuthorized', false);
            } else {
                setTemp(res.data.tempValue);
                setState(res.data.tempValue[0].state)
                setValueChange(res.data.tempValue[0].changeValue)
                setNameValue(`Nhiệt độ ${res.data.tempValue[0].name.split("_")[1]}`);
                setIndexValue(res.data.tempValue[0].value)
                setHumi(res.data.humiValue);
                setPH(res.data.phValue)
                setEC(res.data.ecValue)
                setKali(res.data.kaliValue)
                setNito(res.data.nitoValue)
                setPhotpho(res.data.photphoValue)
            }

        }
        loadData();

    }, [listener])
    console.log(temp)

    const isAuthorized = useGlobalState('isAuthorized')[0];
    if (isAuthorized === false) {
        return (
            <>
                <ExpiredAdmin />
            </>
        );
    }

    if (temp == null || humi == null || ph == null || ec == null || kali == null || photpho == null
        || nito == null)
        return (<>
            <div className="text-center">
                <MySpinner />
            </div>

        </>)
    return (
        <>
            <ThemeProvider
                theme={{
                    palette: {
                        primary: {
                            main: '#007FFF',
                            dark: '#0066CC',
                        },
                    },
                }}
            />
            <div className="SenSorInfor" style={{ backgroundColor: '#ffffff', marginTop: '20px', marginLeft: '8px' }}>
                <div className="indexSensor" style={indexSensor}>
                   

                    <div>
                        {pic}
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <h5>{nameValue}</h5>
                        <h1>{indexValue} {unit}</h1>


                    </div>
                    <div style={{ display: "flex" }}>

                        {
                            state === 1 ? (<>
                                <FaArrowUp style={{ color: "lightgreen" }} />
                                <h3 style={{ color: "lightgreen" }}>{(+valueChange).toFixed(4)} {unit}</h3>
                            </>) : (state === -1 ? (<>
                                <FaArrowDown style={{ color: "red", textShadow: "0 0 10px black" }} />
                                <h3 style={{ color: "red" }}>{(+valueChange).toFixed(4)} {unit}</h3>
                            </>) : <></>)
                        }

                    </div>


                </div>
                <div className="ortherSensor" style={{ display: 'flex', flexWrap: 'wrap', cursor: 'pointer' }}>
                    {temp.map((element) => {
                        const color = element.active === false?"grey": element.state === 1 ? "green" : (element.state === -1 ? "red" : "lightgrey  ")
                        return (
                            <button
                                className="childSensor"
                                style={{
                                    width: '25%',
                                    height: '150px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: color
                                }}
            
                                onClick={(event) =>
                                    handleChildClick(event, `nhiệt điện ${element.name.split('_')[1]}`, element.active === true? element.value:"Inactive", <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="50"
                                        height="50"
                                        fill="currentColor"
                                        className="bi bi-thermometer-sun"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M5 12.5a1.5 1.5 0 1 1-2-1.415V2.5a.5.5 0 0 1 1 0v8.585A1.5 1.5 0 0 1 5 12.5" />
                                        <path d="M1 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0zM3.5 1A1.5 1.5 0 0 0 2 2.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0L5 10.486V2.5A1.5 1.5 0 0 0 3.5 1m5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5m4.243 1.757a.5.5 0 0 1 0 .707l-.707.708a.5.5 0 1 1-.708-.708l.708-.707a.5.5 0 0 1 .707 0M8 5.5a.5.5 0 0 1 .5-.5 3 3 0 1 1 0 6 .5.5 0 0 1 0-1 2 2 0 0 0 0-4 .5.5 0 0 1-.5-.5M12.5 8a.5.5 0 0 1 .5-.5h1a.5.5 0 1 1 0 1h-1a.5.5 0 0 1-.5-.5m-1.172 2.828a.5.5 0 0 1 .708 0l.707.708a.5.5 0 0 1-.707.707l-.708-.707a.5.5 0 0 1 0-.708M8.5 12a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5" />
                                    </svg>,  element.active === true?"°C":"", element.active === true?element.state:"", element.active === true?element.changeValue:"", element.name)
                                }
                                tabIndex={() => {
                                    console.log(1);
                                }}
                            >
                                <div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="50"
                                        height="50"
                                        fill="currentColor"
                                        className="bi bi-thermometer-sun"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M5 12.5a1.5 1.5 0 1 1-2-1.415V2.5a.5.5 0 0 1 1 0v8.585A1.5 1.5 0 0 1 5 12.5" />
                                        <path d="M1 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0zM3.5 1A1.5 1.5 0 0 0 2 2.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0L5 10.486V2.5A1.5 1.5 0 0 0 3.5 1m5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5m4.243 1.757a.5.5 0 0 1 0 .707l-.707.708a.5.5 0 1 1-.708-.708l.708-.707a.5.5 0 0 1 .707 0M8 5.5a.5.5 0 0 1 .5-.5 3 3 0 1 1 0 6 .5.5 0 0 1 0-1 2 2 0 0 0 0-4 .5.5 0 0 1-.5-.5M12.5 8a.5.5 0 0 1 .5-.5h1a.5.5 0 1 1 0 1h-1a.5.5 0 0 1-.5-.5m-1.172 2.828a.5.5 0 0 1 .708 0l.707.708a.5.5 0 0 1-.707.707l-.708-.707a.5.5 0 0 1 0-.708M8.5 12a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5" />
                                    </svg>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <h5>nhiệt độ {element.name.split('_')[1]} </h5>
                                    <div style={{ display: "flex", gap: "5px" }}>
                                        <div>{element.active === true? <>
                                            {element.value} °C
                                            {
                                            element.state === 1 ? <FaArrowUp /> : (element.state === -1 ? <FaArrowDown /> : <></>)
                                            }
                                        </>:<span style={{"fontWeight":"bold"}}>InActive</span>} </div>
                                        

                                    </div>

                                </div>

                            </button>
                        );
                    })}
                    {humi.map((element) => {
                         const color = element.active === false?"grey": element.state === 1 ? "green" : (element.state === -1 ? "red" : "lightgrey  ")
                        return (
                            <button
                                className="childSensor"
                                style={{
                                    width: '25%',
                                    height: '150px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: color
                                }}
                                onClick={ (event) => handleChildClick(event, `Độ ẩm${element.name.split('_')[1]}`, element.active === true? element.value:"Inactive", <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="50"
                                    height="50"
                                    fill="currentColor"
                                    className="bi bi-droplet-half"
                                    viewBox="0 0 16 16"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M7.21.8C7.69.295 8 0 8 0q.164.544.371 1.038c.812 1.946 2.073 3.35 3.197 4.6C12.878 7.096 14 8.345 14 10a6 6 0 0 1-12 0C2 6.668 5.58 2.517 7.21.8m.413 1.021A31 31 0 0 0 5.794 3.99c-.726.95-1.436 2.008-1.96 3.07C3.304 8.133 3 9.138 3 10c0 0 2.5 1.5 5 .5s5-.5 5-.5c0-1.201-.796-2.157-2.181-3.7l-.03-.032C9.75 5.11 8.5 3.72 7.623 1.82z"
                                    />
                                    <path
                                        fillRule="evenodd"
                                        d="M4.553 7.776c.82-1.641 1.717-2.753 2.093-3.13l.708.708c-.29.29-1.128 1.311-1.907 2.87z"
                                    />
                                </svg>, element.active === true?"g/m³":"", element.active === true?element.state:"", element.active === true?element.changeValue:"", element.name)}
                            >
                                <div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="50"
                                        height="50"
                                        fill="currentColor"
                                        className="bi bi-droplet-half"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M7.21.8C7.69.295 8 0 8 0q.164.544.371 1.038c.812 1.946 2.073 3.35 3.197 4.6C12.878 7.096 14 8.345 14 10a6 6 0 0 1-12 0C2 6.668 5.58 2.517 7.21.8m.413 1.021A31 31 0 0 0 5.794 3.99c-.726.95-1.436 2.008-1.96 3.07C3.304 8.133 3 9.138 3 10c0 0 2.5 1.5 5 .5s5-.5 5-.5c0-1.201-.796-2.157-2.181-3.7l-.03-.032C9.75 5.11 8.5 3.72 7.623 1.82z"
                                        />
                                        <path
                                            fillRule="evenodd"
                                            d="M4.553 7.776c.82-1.641 1.717-2.753 2.093-3.13l.708.708c-.29.29-1.128 1.311-1.907 2.87z"
                                        />
                                    </svg>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <h5>Độ ẩm {element.name.split('_')[1]}</h5>
                                    <div style={{ display: "flex", gap: "5px" }}>
                                    <div>{element.active === true? <>
                                            {element.value} g/m³
                                            {
                                            element.state === 1 ? <FaArrowUp /> : (element.state === -1 ? <FaArrowDown /> : <></>)
                                            }
                                        </>:<span style={{"fontWeight":"bold"}}>InActive</span>} </div>
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                    {ph.map((element) => {
                        const color = element.active === false?"grey": element.state === 1 ? "green" : (element.state === -1 ? "red" : "lightgrey  ")
                        return (
                            <button
                                className="childSensor"
                                style={{
                                    width: '25%',
                                    height: '150px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: color
                                }}
                                onClick={  (event) => handleChildClick(event, `Độ PH${element.name.split('_')[1]}`, element.active === true? element.value:"Inactive", <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="50"
                                    height="50"
                                    fill="currentColor"
                                    className="bi bi-moisture"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M13.5 0a.5.5 0 0 0 0 1H15v2.75h-.5a.5.5 0 0 0 0 1h.5V7.5h-1.5a.5.5 0 0 0 0 1H15v2.75h-.5a.5.5 0 0 0 0 1h.5V15h-1.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 .5-.5V.5a.5.5 0 0 0-.5-.5zM7 1.5l.364-.343a.5.5 0 0 0-.728 0l-.002.002-.006.007-.022.023-.08.088a29 29 0 0 0-1.274 1.517c-.769.983-1.714 2.325-2.385 3.727C2.368 7.564 2 8.682 2 9.733 2 12.614 4.212 15 7 15s5-2.386 5-5.267c0-1.05-.368-2.169-.867-3.212-.671-1.402-1.616-2.744-2.385-3.727a29 29 0 0 0-1.354-1.605l-.022-.023-.006-.007-.002-.001zm0 0-.364-.343zm-.016.766L7 2.247l.016.019c.24.274.572.667.944 1.144.611.781 1.32 1.776 1.901 2.827H4.14c.58-1.051 1.29-2.046 1.9-2.827.373-.477.706-.87.945-1.144zM3 9.733c0-.755.244-1.612.638-2.496h6.724c.395.884.638 1.741.638 2.496C11 12.117 9.182 14 7 14s-4-1.883-4-4.267" />
                                </svg>, "", element.active === true?element.state:"", element.active === true?element.changeValue:"", element.name)}
                            >
                                <div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="50"
                                        height="50"
                                        fill="currentColor"
                                        className="bi bi-moisture"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M13.5 0a.5.5 0 0 0 0 1H15v2.75h-.5a.5.5 0 0 0 0 1h.5V7.5h-1.5a.5.5 0 0 0 0 1H15v2.75h-.5a.5.5 0 0 0 0 1h.5V15h-1.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 .5-.5V.5a.5.5 0 0 0-.5-.5zM7 1.5l.364-.343a.5.5 0 0 0-.728 0l-.002.002-.006.007-.022.023-.08.088a29 29 0 0 0-1.274 1.517c-.769.983-1.714 2.325-2.385 3.727C2.368 7.564 2 8.682 2 9.733 2 12.614 4.212 15 7 15s5-2.386 5-5.267c0-1.05-.368-2.169-.867-3.212-.671-1.402-1.616-2.744-2.385-3.727a29 29 0 0 0-1.354-1.605l-.022-.023-.006-.007-.002-.001zm0 0-.364-.343zm-.016.766L7 2.247l.016.019c.24.274.572.667.944 1.144.611.781 1.32 1.776 1.901 2.827H4.14c.58-1.051 1.29-2.046 1.9-2.827.373-.477.706-.87.945-1.144zM3 9.733c0-.755.244-1.612.638-2.496h6.724c.395.884.638 1.741.638 2.496C11 12.117 9.182 14 7 14s-4-1.883-4-4.267" />
                                    </svg>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <h5>Độ PH {element.name.split('_')[1]}</h5>

                                    <div style={{ display: "flex", gap: "5px" }}>
                                    <div>{element.active === true? <>
                                            {element.value}
                                            {
                                            element.state === 1 ? <FaArrowUp /> : (element.state === -1 ? <FaArrowDown /> : <></>)
                                            }
                                        </>:<span style={{"fontWeight":"bold"}}>InActive</span>} </div>
                                    </div>
                                </div>
                            </button>
                        );
                    })}

                    {ec.map((element) => {
                        const color = element.active === false?"grey": element.state === 1 ? "green" : (element.state === -1 ? "red" : "lightgrey  ")
                        return (
                            <button
                                className="childSensor"
                                style={{
                                    width: '25%',
                                    height: '150px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: color
                                }}
                                onClick={(event) =>
                                    handleChildClick(event, `Độ dẫn điện${element.name.split('_')[1]}`, element.active === true? element.value:"Inactive", <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="50"
                                        height="50"
                                        fill="currentColor"
                                        className="bi bi-fire"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16m0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15" />
                                    </svg>, element.active === true?"S":"",element.active === true? element.state:"", element.active === true?element.changeValue:"",element.name)
                                }
                            >
                                <div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="50"
                                        height="50"
                                        fill="currentColor"
                                        className="bi bi-fire"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16m0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15" />
                                    </svg>
                                </div>
                                <div style={{ textAlign: 'center' }}>

                                    <h5>Độ dẫn điện {element.name.split('_')[1]} </h5>

                                    <div style={{ display: "flex", gap: "5px" }}>
                                    <div>{element.active === true? <>
                                            {element.value} S
                                            {
                                            element.state === 1 ? <FaArrowUp /> : (element.state === -1 ? <FaArrowDown /> : <></>)
                                            }
                                        </>:<span style={{"fontWeight":"bold"}}>InActive</span>} </div>
                                    </div>

                                </div>
                            </button>
                        );
                    })}
                    {kali.map((element) => {
                        const color = element.active === false?"grey": element.state === 1 ? "green" : (element.state === -1 ? "red" : "lightgrey  ")
                        return (
                            <button
                                className="childSensor"
                                style={{
                                    width: '25%',
                                    height: '150px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: color
                                }}
                                onClick={(event) => handleChildClick(event, `Kali${element.name.split('_')[1]}`, element.active === true? element.value:"Inactive", <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="50" height="50">
                                    <path d="M311 86.3c12.3-12.7 12-32.9-.7-45.2s-32.9-12-45.2 .7l-155.2 160L64 249V64c0-17.7-14.3-32-32-32S0 46.3 0 64V328 448c0 17.7 14.3 32 32 32s32-14.3 32-32V341l64.7-66.7 133 192c10.1 14.5 30 18.1 44.5 8.1s18.1-30 8.1-44.5L174.1 227.4 311 86.3z" />
                                </svg>, element.active === true?"mg/m³":"", element.active === true?element.state:"", element.active === true?element.changeValue:"",element.name)}
                            >
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="50" height="50">
                                        <path d="M311 86.3c12.3-12.7 12-32.9-.7-45.2s-32.9-12-45.2 .7l-155.2 160L64 249V64c0-17.7-14.3-32-32-32S0 46.3 0 64V328 448c0 17.7 14.3 32 32 32s32-14.3 32-32V341l64.7-66.7 133 192c10.1 14.5 30 18.1 44.5 8.1s18.1-30 8.1-44.5L174.1 227.4 311 86.3z" />
                                    </svg>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <h5>Kali {element.name.split('_')[1]}</h5>

                                    <div style={{ display: "flex", gap: "5px" }}>
                                    <div>{element.active === true? <>
                                            {element.value} mg/m³                                           {
                                            element.state === 1 ? <FaArrowUp /> : (element.state === -1 ? <FaArrowDown /> : <></>)
                                            }
                                        </>:<span style={{"fontWeight":"bold"}}>InActive</span>} </div>
                                        
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                    {nito.map((element) => {
                        const color = element.active === false?"grey": element.state === 1 ? "green" : (element.state === -1 ? "red" : "lightgrey  ")
                        return (
                            <button
                                className="childSensor"
                                style={{
                                    width: '25%',
                                    height: '150px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: color
                                }}
                                onClick={(event) => handleChildClick(event, `Nito${element.name.split('_')[1]}`, element.active === true? element.value:"Inactive", <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="50" height="50">
                                    <path d="M21.1 33.9c12.7-4.6 26.9-.7 35.5 9.6L320 359.6V64c0-17.7 14.3-32 32-32s32 14.3 32 32V448c0 13.5-8.4 25.5-21.1 30.1s-26.9 .7-35.5-9.6L64 152.4V448c0 17.7-14.3 32-32 32s-32-14.3-32-32V64C0 50.5 8.4 38.5 21.1 33.9z" />
                                </svg>, element.active === true?"mg/m³":"",element.active === true? element.state:"", element.active === true?element.changeValue:"",element.name)}
                            >
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="50" height="50">
                                        <path d="M21.1 33.9c12.7-4.6 26.9-.7 35.5 9.6L320 359.6V64c0-17.7 14.3-32 32-32s32 14.3 32 32V448c0 13.5-8.4 25.5-21.1 30.1s-26.9 .7-35.5-9.6L64 152.4V448c0 17.7-14.3 32-32 32s-32-14.3-32-32V64C0 50.5 8.4 38.5 21.1 33.9z" />
                                    </svg>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <h5>Nito {element.name.split('_')[1]}</h5>

                                    <div style={{ display: "flex", gap: "5px" }}>
                                    <div>{element.active === true? <>
                                            {element.value} mg/m³                                           {
                                            element.state === 1 ? <FaArrowUp /> : (element.state === -1 ? <FaArrowDown /> : <></>)
                                            }
                                        </>:<span style={{"fontWeight":"bold"}}>InActive</span>} </div>
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                    {photpho.map((element) => {
                       const color = element.active === false?"grey": element.state === 1 ? "green" : (element.state === -1 ? "red" : "lightgrey  ")
                        return (
                            <button
                                className="childSensor"
                                style={{
                                    width: '25%',
                                    height: '150px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: color
                                }}
                                onClick={(event) =>
                                    handleChildClick(event, `Photpho${element.name.split('_')[1]}`, element.active === true? element.value:"Inactive", <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="50" height="50">
                                        <path d="M0 96C0 60.7 28.7 32 64 32h96c88.4 0 160 71.6 160 160s-71.6 160-160 160H64v96c0 17.7-14.3 32-32 32s-32-14.3-32-32V320 96zM64 288h96c53 0 96-43 96-96s-43-96-96-96H64V288z" />
                                    </svg>, element.active === true?"mg/m³":"", element.active === true?element.state:"", element.active === true?element.changeValue:"",element.name)
                                }
                            >
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="50" height="50">
                                        <path d="M0 96C0 60.7 28.7 32 64 32h96c88.4 0 160 71.6 160 160s-71.6 160-160 160H64v96c0 17.7-14.3 32-32 32s-32-14.3-32-32V320 96zM64 288h96c53 0 96-43 96-96s-43-96-96-96H64V288z" />
                                    </svg>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <h5>Photpho {element.name.split('_')[1]}</h5>

                                    <div style={{ display: "flex", gap: "5px" }}>
                                    <div>{element.active === true? <>
                                            {element.value} mg/m³                                           {
                                            element.state === 1 ? <FaArrowUp /> : (element.state === -1 ? <FaArrowDown /> : <></>)
                                            }
                                        </>:<span style={{"fontWeight":"bold"}}>InActive</span>} </div>
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
            <MinMax id = {idSensor}/>
        </>
    )
}