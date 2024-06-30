import { useEffect, useRef, useState } from "react";
import { Form, Table } from "react-bootstrap"
import cookie from 'react-cookies';
import Apis, { endpoints } from "../configs/Apis";
import { setGlobalState, useGlobalState } from "..";
import MySpinner from "../layouts/Spinner";
import ExpiredAdmin from "../pages/ExpiredAdmin";


export default function DataMinMax(id) {

    const listener = useGlobalState('message')[0];
    const [data, setData] = useState();
    const [date, setDate] = useState(formatDate());
    const [dataMax, setDataMax] = useState({});
    const [dataMin, setDataMin] = useState({});
    const formatdDte = (e) => {
        if (e != null)
            return `Date:${e.split("T")[0]}, Time${e.split("T")[1]}`
        return ""
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
    const displayDate = (date) => {
        const dateArr = date.split("-");
        return `${dateArr[2]}-${dateArr[1]}-${dateArr[0]}`
    }
    const now = new Date();
    const currentDate = now.toISOString().split('T')[0];
    const currentHour = now.getHours();

    // Initialize objects to track the minimum and maximum values for each sensor
    const sensorMinValues = {};
    const sensorMaxValues = {};
    useEffect(() => {
        const process = async () => {
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
            console.log(date)
            const res = await Apis.post(`${endpoints.allMinMax}/${id.id}`,
                {
                    "date": `${date}`,
                },
                {
                    headers: {
                        Authorization: `Bearer ${cookie.load('token')}`,
                    },
                });

            if (res.data === '') {
                setGlobalState('isAuthorized', false);
            } else {

                setData(res.data.sensorMinMaxes)
                res.data.sensorMinMaxes.forEach(sensorData => {
                    const { sensor } = sensorData;
                   
                    sensorData.data.forEach(record => {
                        const recordDate = record.minAt ? record.minAt.split('T')[0] : null;
                        const recordHour = parseInt(record.hour, 10);
                        console.log(recordDate === currentDate && recordHour <= currentHour)
                        
                            const minRecordValue = parseFloat(record.min);
                            const maxRecordValue = parseFloat(record.max);

                            // Update min values
                            if (record.minAt&&(!sensorMinValues[sensor] || minRecordValue < sensorMinValues[sensor].min)) {
                                const { minAt, min } = record;
                                sensorMinValues[sensor] = { hour: recordHour, minAt, min };
                            }

                            // Update max values
                            if (record.maxAt&&(!sensorMaxValues[sensor] || maxRecordValue > sensorMaxValues[sensor].max)) {
                                const { maxAt, max } = record;
                                sensorMaxValues[sensor] = { hour: recordHour, maxAt, max };
                            }
                        }
                    );
                });
                setDataMax(sensorMaxValues);
                setDataMin(sensorMinValues);
                console.log(res.data.sensorMinMaxes)
            }

            // Update the previous listener value
            prevListener.current = listener;
            prevId.current = id;
        }
        process();

    }, [listener, id, date]);

    // Define a ref to store the previous value of listener
    const prevListener = useRef();
    const prevId = useRef();


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
    return (<>
        <div>
            {/* <h2>Max of all sensor in {date}</h2> */}

            <div className="App container" style={{ width: "300px", float: "left" }}>
                <Form.Control
                    type="date"
                    name="datepic"
                    placeholder="DateRange"
                    value={date}
                    onChange={(e) => {
                        setDate(e.target.value)
                    }}
                />
            </div>
            <br /><br /><br />
            <br /><br /><br />
            <div>
      <h2>Summary</h2>
      <Table striped bordered hover style={{ marginTop: "50px" }}>
        <thead>
          <tr>
            <th>Sensor</th>
            <th>Min</th>
            <th>Min Hour</th>
            <th>Min At</th>
            <th>Max</th>
            <th>Max Hour</th>
            <th>Max At</th>
          </tr>
        </thead>
        <tbody>
            {console.log(dataMax)}
          {Object.keys(dataMax).map(sensor => (
            <tr key={sensor}>
              <td>{sensor}</td>
              <td>{dataMin[sensor]?.min}</td>
              <td>{dataMin[sensor]?.hour}</td>
              <td>{dataMin[sensor]?.minAt}</td>
              <td>{dataMax[sensor]?.max}</td>
              <td>{dataMax[sensor]?.hour}</td>
              <td>{dataMax[sensor]?.maxAt}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
            <h2 className="text-center">Max of all sensors at {displayDate(date)}</h2>
            <Table striped bordered hover style={{ marginTop: "50px" }}>
                <thead>

                    <tr>
                        <th>#</th>
                        <th>00</th>
                        <th>01</th>
                        <th>02</th>
                        <th>03</th>
                        <th>04</th>
                        <th>05</th>
                        <th>06</th>
                        <th>07</th>
                        <th>08</th>
                        <th>09</th>
                        <th>10</th>
                        <th>11</th>
                        <th>12</th>
                        <th>13</th>
                        <th>14</th>
                        <th>15</th>
                        <th>16</th>
                        <th>17</th>
                        <th>18</th>
                        <th>19</th>
                        <th>20</th>
                        <th>21</th>
                        <th>22</th>
                        <th>23</th>

                    </tr>
                </thead>
                <tbody>

                    {data.map((element) => {
                        return (
                            <tr>
                                <td>{element.sensor}</td>
                                <td title={`Data max at: ${formatdDte(element.data[0].maxAt)}`}>{element.data[0].max}</td>
                                <td title={`Data max at: ${formatdDte(element.data[1].maxAt)}`}>{element.data[1].max}</td>
                                <td title={`Data max at: ${formatdDte(element.data[2].maxAt)}`}>{element.data[2].max}</td>
                                <td title={`Data max at: ${formatdDte(element.data[3].maxAt)}`}>{element.data[3].max}</td>
                                <td title={`Data max at: ${formatdDte(element.data[4].maxAt)}`}>{element.data[4].max}</td>
                                <td title={`Data max at: ${formatdDte(element.data[5].maxAt)}`}>{element.data[5].max}</td>
                                <td title={`Data max at: ${formatdDte(element.data[6].maxAt)}`}>{element.data[6].max}</td>
                                <td title={`Data max at: ${formatdDte(element.data[7].maxAt)}`}>{element.data[7].max}</td>
                                <td title={`Data max at: ${formatdDte(element.data[8].maxAt)}`}>{element.data[8].max}</td>
                                <td title={`Data max at: ${formatdDte(element.data[9].maxAt)}`}>{element.data[9].max}</td>
                                <td title={`Data max at: ${formatdDte(element.data[10].maxAt)}`}>{element.data[10].max}</td>
                                <td title={`Data max at: ${formatdDte(element.data[11].maxAt)}`}>{element.data[11].max}</td>
                                <td title={`Data max at: ${formatdDte(element.data[12].maxAt)}`}>{element.data[12].max}</td>
                                <td title={`Data max at: ${formatdDte(element.data[13].maxAt)}`}>{element.data[13].max}</td>
                                <td title={`Data max at: ${formatdDte(element.data[14].maxAt)}`}>{element.data[14].max}</td>
                                <td title={`Data max at: ${formatdDte(element.data[15].maxAt)}`}>{element.data[15].max}</td>
                                <td title={`Data max at: ${formatdDte(element.data[16].maxAt)}`}>{element.data[16].max}</td>
                                <td title={`Data max at: ${formatdDte(element.data[17].maxAt)}`}>{element.data[17].max}</td>
                                <td title={`Data max at: ${formatdDte(element.data[18].maxAt)}`}>{element.data[18].max}</td>
                                <td title={`Data max at: ${formatdDte(element.data[19].maxAt)}`}>{element.data[19].max}</td>
                                <td title={`Data max at: ${formatdDte(element.data[20].maxAt)}`}>{element.data[20].max}</td>
                                <td title={`Data max at: ${formatdDte(element.data[21].maxAt)}`}>{element.data[21].max}</td>
                                <td title={`Data max at: ${formatdDte(element.data[22].maxAt)}`}>{element.data[22].max}</td>
                                <td title={`Data max at: ${formatdDte(element.data[23].maxAt)}`}>{element.data[23].max}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            <br /><br />

            {/* <h2>Min of all sensor in {date}</h2> */}
            <h2 className="text-center">Min of all sensors at {displayDate(date)}    </h2>
            <Table striped bordered hover style={{ marginTop: "50px" }}>
                <thead>

                    <tr>
                        <th>#</th>
                        <th>00</th>
                        <th>01</th>
                        <th>02</th>
                        <th>03</th>
                        <th>04</th>
                        <th>05</th>
                        <th>06</th>
                        <th>07</th>
                        <th>08</th>
                        <th>09</th>
                        <th>10</th>
                        <th>11</th>
                        <th>12</th>
                        <th>13</th>
                        <th>14</th>
                        <th>15</th>
                        <th>16</th>
                        <th>17</th>
                        <th>18</th>
                        <th>19</th>
                        <th>20</th>
                        <th>21</th>
                        <th>22</th>
                        <th>23</th>

                    </tr>
                </thead>
                <tbody>

                    {data.map((element) => {
                        return (
                            <>
                                <tr>
                                    <td>{element.sensor}</td>
                                    <td title={`Data min at: ${formatdDte(element.data[0].minAt)}`}>{element.data[0].min}</td>
                                    <td title={`Data min at: ${formatdDte(element.data[1].minAt)}`}> {element.data[1].min}</td>
                                    <td title={`Data min at: ${formatdDte(element.data[2].minAt)}`}>{element.data[2].min}</td>
                                    <td title={`Data min at: ${formatdDte(element.data[3].minAt)}`}>{element.data[3].min}</td>
                                    <td title={`Data min at: ${formatdDte(element.data[4].minAt)}`}>{element.data[4].min}</td>
                                    <td title={`Data min at: ${formatdDte(element.data[5].minAt)}`}>{element.data[5].min}</td>
                                    <td title={`Data min at: ${formatdDte(element.data[6].minAt)}`}>{element.data[6].min}</td>
                                    <td title={`Data min at: ${formatdDte(element.data[7].minAt)}`}>{element.data[7].min}</td>
                                    <td title={`Data min at: ${formatdDte(element.data[8].minAt)}`}>{element.data[8].min}</td>
                                    <td title={`Data min at: ${formatdDte(element.data[9].minAt)}`}> {element.data[9].min}</td>
                                    <td title={`Data min at: ${formatdDte(element.data[10].minAt)}`}>{element.data[10].min}</td>
                                    <td title={`Data min at: ${formatdDte(element.data[11].minAt)}`}>{element.data[11].min}</td>
                                    <td title={`Data min at: ${formatdDte(element.data[12].minAt)}`}>{element.data[12].min}</td>
                                    <td title={`Data min at: ${formatdDte(element.data[13].minAt)}`}>{element.data[13].min}</td>
                                    <td title={`Data min at: ${formatdDte(element.data[14].minAt)}`}>{element.data[14].min}</td>
                                    <td title={`Data min at: ${formatdDte(element.data[15].minAt)}`}>{element.data[15].min}</td>
                                    <td title={`Data min at: ${formatdDte(element.data[16].minAt)}`}>{element.data[16].min}</td>
                                    <td title={`Data min at: ${formatdDte(element.data[17].minAt)}`}>{element.data[17].min}</td>
                                    <td title={`Data min at: ${formatdDte(element.data[18].minAt)}`}>{element.data[18].min}</td>
                                    <td title={`Data min at: ${formatdDte(element.data[19].minAt)}`}>{element.data[19].min}</td>
                                    <td title={`Data min at: ${formatdDte(element.data[20].minAt)}`}>{element.data[20].min}</td>
                                    <td title={`Data min at: ${formatdDte(element.data[21].minAt)}`}>{element.data[21].min}</td>
                                    <td title={`Data min at: ${formatdDte(element.data[22].minAt)}`}>{element.data[22].min}</td>
                                    <td title={`Data min at: ${formatdDte(element.data[23].minAt)}`}>{element.data[23].min}</td>
                                </tr>
                            </>

                        );
                    })}
                </tbody>
            </Table>
        </div>

    </>)
}