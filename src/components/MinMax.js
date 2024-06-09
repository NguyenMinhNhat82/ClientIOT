import { useEffect, useState } from "react";
import cookie from 'react-cookies';
import { setGlobalState, useGlobalState } from "..";
import Apis, { endpoints } from "../configs/Apis";
import MySpinner from "../layouts/Spinner";
import RenderAllData from "./RenderAllData";
import ExpiredAdmin from "../pages/ExpiredAdmin";

export default function MinMax(id) {
    const [sensor, setSensor] = useState();
    const [minMax, setMinMax] = useState();
    const [sensorID, setSensorID] = useState();
    const listener = useGlobalState('message')[0];
    const [data1Hour, setData1Hour] = useState();
    const [data1Day, setData1Day] = useState();
    const [data1Week, setData1Week] = useState();
    const [data1Month, setData1Mont] = useState();

    const formatdDte = (e) => {

        return `Date:${e.split("T")[0]}, Time${e.split("T")[1]}`
    }

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
    const handleOnChangeSensor = (e) => {
        setSensorID(e);
        const loadDataMinMax = async () => {
            const resMinMax = await Apis.get(`${endpoints.valueMinMax}/${e}`, {
                headers: {
                    Authorization: `Bearer ${cookie.load('token')}`,
                },
            });
            if (resMinMax.data === '') {
                setGlobalState('isAuthorized', false);
            } else {
                setMinMax(resMinMax.data);
            }
        }
        loadDataMinMax();
    };


    useEffect(() => {

        const loadData = async () => {
            const resSensor = await Apis.get(`${endpoints.listSensor}/${id.id}`, {
                headers: {
                    Authorization: `Bearer ${cookie.load('token')}`,
                },
            });
            const sensorSelected = document.getElementById('selectedSensor');
            handleOnChangeSensor(sensorSelected === null ? resSensor.data[0].id : sensorSelected.value);
            setSensorID(sensorSelected === null ? resSensor.data[0].id : sensorSelected.value);
            setSensor(resSensor.data);

            const resMinMax = await Apis.get(`${endpoints.valueMinMax}/${sensorSelected === null ? resSensor.data[0].id : sensorSelected.value
                }`, {
                headers: {
                    Authorization: `Bearer ${cookie.load('token')}`,
                },
            });

            if (resMinMax.data === '') {
                setGlobalState('isAuthorized', false);
            } else {
                setMinMax(resMinMax.data);
            }
        }
        loadData();

    }
    , [listener])


    const isAuthorized = useGlobalState('isAuthorized')[0];
    if (isAuthorized === false) {
        return (
            <>
                <ExpiredAdmin />
            </>
        );
    }

    if (sensorID == null || sensor == null || minMax == null) {
        return (
            <>
                <div className="text-center">
                    <MySpinner />
                </div>
            </>
        )
    }
    return (<>
        <div className="MinMaxSensor" style={{ marginTop: '20px', marginLeft: '8px' }}>
            <select
                id="selectedSensor"
                style={{ width: '30%', height: '25px', border: '0.2px', boxShadow: '5px 5px 10px 0 rgba(0, 0, 0, 0.1)' }}
                onChange={(e) => {
                    handleOnChangeSensor(e.target.value);
                }}
            >
                {sensor.map((element) => {
                    return <option value={element.id}>{element.id}</option>;
                })}
            </select>
            <table style={{ borderCollapse: 'collapse', width: '100%', marginTop: '5px', backgroundColor: '#ffffff' }}>
                <thead>
                    <tr>
                        <th style={styles.headerCell}> </th>
                        <th style={styles.headerCell}>Trong vòng 1 giờ qua</th>
                        <th style={styles.headerCell}>Trong vòng 24 giờ qua</th>
                        <th style={styles.headerCell}>Trong vòng 7 ngày qua</th>
                        <th style={styles.headerCell}>Trong vòng 31 ngày qua</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={styles.dataCell}>Giá trị lớn nhất</td>
                        <td style={styles.dataCell}>{minMax.max1h}</td>
                        <td style={styles.dataCell}>{minMax.max1d}</td>
                        <td style={styles.dataCell}>{minMax.max1w}</td>
                        <td style={styles.dataCell}>{minMax.max1m}</td>
                    </tr>
                    <tr>
                        <td style={styles.dataCell}>Giá trị nhỏ nhất</td>
                        <td style={styles.dataCell}>{minMax.min1h}</td>
                        <td style={styles.dataCell}>{minMax.min1d}</td>
                        <td style={styles.dataCell}>{minMax.min1w}</td>
                        <td style={styles.dataCell}>{minMax.min1m}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <RenderAllData id={sensorID} />


    </>)
}