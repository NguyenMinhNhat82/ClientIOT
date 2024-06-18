import { useEffect, useRef, useState } from "react";
import { Form, Table } from "react-bootstrap"
import cookie from 'react-cookies';
import Apis, { endpoints } from "../configs/Apis";
import { setGlobalState, useGlobalState } from "..";
import MySpinner from "../layouts/Spinner";
import ExpiredAdmin from "../pages/ExpiredAdmin";


export default function DataMinMaxDayInWeek(id) {

    const listener = useGlobalState('message')[0];
    const [data, setData] = useState();
    const [month, setMonth] = useState(monthNow());
    const [year, setYear] = useState(yearNow());
    const [date, setDate] = useState(formatDate());
    const [index, setIndex] = useState(1);
    const formatdDte = (e) => {
        if (e != null)
            return `Date:${e.split("T")[0]}, Time${e.split("T")[1]}`
        return ""
    }
    const onsubmit = () => {
        const dataYear = document.getElementById("valueYear").value;
        const dataMonth = document.getElementById("valueMonth").value;
        const dataIndex = document.getElementById("valueIndex").value;
        console.log(dataYear)
        console.log(dataMonth)
        if (dataYear === "" || dataMonth === "") {
            alert("Tháng hoặc năm hoặc số tuần không được để trống")
        }
        else {
            setMonth(dataMonth);
            setYear(dataYear);
            setIndex(dataIndex)

        }
    }
    function formatDate() {
        const d = new Date();
        let month = `${(d.getMonth() + 1)}`;
        let day = `${d.getDate()}`;
        const year = d.getFullYear();

        if (month.length < 2)
            month = `0${month}`;
        if (day.length < 2)
            day = `0${day}`;
        return `${year}-${month}-${day}`
    }

    function yearNow() {
        const d = new Date();

        const year = d.getFullYear();

        return year;
    }

    function monthNow() {
        const d = new Date();

        const month = (d.getMonth() + 1)

        return month;
    }

    const displayDate = (date) => {
        const dateArr = date.split("-");
        return `${dateArr[2]}-${dateArr[1]}-${dateArr[0]}`
    }
    useEffect(() => {
        const process = async () => {
            setData(null)
            // Only set data to null if listener has changed
            const resNotification = await Apis.get(endpoints.getNumberUnread, {
                headers: {
                    Authorization: `Bearer ${cookie.load('token')}`,
                },
            });
            if (resNotification.data === '') {
                setGlobalState('isAuthorized', false);
            } else {

                const notification = document.querySelector("#root > div > nav > div > div > div > div > div.simplebar-wrapper > div.simplebar-mask > div > div > div > div.MuiBox-root.css-0 > ul > a:nth-child(4)");
                if (notification != null) {
                    console.log(notification.childNodes.length)
                    if (notification.childNodes.length > 2) {
                        if (notification.lastChild) {
                            notification.removeChild(notification.lastChild);
                        }

                    }
                    const spanElement = document.createElement("span");


                    // Set the inner HTML content to "0"
                    spanElement.innerHTML = resNotification.data
                    spanElement.style.padding = "4px 13px";
                    spanElement.style.backgroundColor = "red";
                    spanElement.style.color = "white";
                    spanElement.style.borderRadius = "10px";

                    notification.appendChild(spanElement)
                }
            }
            if (prevListener.current !== listener) {
                console.log(1)
            }
            if (prevId.current != null) {
                if (prevId.current.dateValue !== date) {
                    setData(null)
                }
            }
            const res = await Apis.get(`${endpoints.getDataDayInWeek}/${id.id}?year=${year}&month=${month}&index=${index - 1}`,
                {
                    headers: {
                        Authorization: `Bearer ${cookie.load('token')}`,
                    },
                });
            console.log(res.data)
            if (res.data === '') {
                setGlobalState('isAuthorized', false);
            } else {
                setData(res.data)
            }

            // Update the previous listener value

        }
        process();

    }, [listener, month, year, index]);

    // Define a ref to store the previous value of listener
    const prevListener = useRef();
    const prevId = useRef();
    const dayInWeek = ["Chủ nhật", "Thứ 7", "Thứ 6", "Thứ 5", "Thứ 4", "Thứ 3", "Thứ 2"]


    const isAuthorized = useGlobalState('isAuthorized')[0];
    if (isAuthorized === false) {
        return (
            <>
                <ExpiredAdmin />
            </>
        );
    }
    if (data == null) {
        return (
            <div className="text-center">
                <MySpinner />
            </div>
        )
    }
    const thElements = [];
    console.log(data.numWeek)
    for (let i = data.numberIndex - 1; i >= 0; i -= 1) {
        console.log(i)
        thElements.push(<th key={dayInWeek[i]}>{dayInWeek[i]}</th>);
    }
    console.log(thElements)
    return (<>
        <div>
            {/* <h2>Max of all sensor in {date}</h2> */}

            <div className="App container" style={{ width: "300px", float: "left" }}>
                {/* <Form.Control
                    type="date"
                    name="datepic"
                    placeholder="DateRange"
                    value={date}
                    onChange={(e) => {
                        setDate(e.target.value)
                    }}
                /> */}
                <div className="d-flex">

                    <Form.Group controlId="valueMonth">
                        <Form.Label>Month:</Form.Label>
                        <Form.Control
                            type="number"
                            name="datepic"
                            placeholder="Input month"
                            defaultValue={month}
                            
                        />
                    </Form.Group>
                    <Form.Group controlId="valueYear">
                        <Form.Label>Year:</Form.Label>
                        <Form.Control
                            type="number"
                            name="datepic"
                            placeholder="Input month"
                            defaultValue={year}
                            
                        />
                    </Form.Group>
                    <Form.Group controlId="valueIndex">
                        <Form.Label>Week:</Form.Label>
                        <Form.Control
                            type="number"
                            name="datepic"
                            placeholder="Input week"
                            defaultValue={index}
                            
                        />
                    </Form.Group>
                    
                </div>
                <button onClick={onsubmit} type="button" className="btn btn-primary">OK</button>


            </div>
            <br /><br /><br />
            <h2 className="text-center">Max of all sensors at week {`${index}`} {`${month}/${year}`}</h2>
            <Table striped bordered hover style={{ marginTop: "50px" }}>
                <thead>

                    <tr>
                        <th>#</th>
                        {thElements}
                    </tr>
                </thead>
                <tbody>

                    {data.sensorMinMaxes.map((element) => {
                        return (
                            <tr>
                                <td>{element.sensor}</td>
                                {element.data.reverse().map((el) => {
                                    return (
                                        <td title={`Data max at: ${formatdDte(el.maxAt)}`}>{el.max}</td>
                                    )
                                })}

                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            <br /><br />

            {/* <h2>Min of all sensor in {date}</h2> */}
            <h2 className="text-center">Min of all sensors at week {`${index}`} {`${month}/${year}`}    </h2>
            <Table striped bordered hover style={{ marginTop: "50px" }}>
                <thead>

                    <tr>
                        <th>#</th>
                        {thElements}
                    </tr>
                </thead>
                <tbody>

                    {data.sensorMinMaxes.map((element) => {
                        return (
                            <tr>
                                <td>{element.sensor}</td>
                                {element.data.map((el) => {
                                    return (
                                        <td title={`Data max at: ${formatdDte(el.minAt)}`}>{el.min}</td>
                                    )
                                })}

                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>

    </>)
}