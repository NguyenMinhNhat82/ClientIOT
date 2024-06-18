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
    const [average, setAverage] = useState();

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

            const resAverage = await Apis.get(`${endpoints.average}/${e}`, {
                headers: {
                    Authorization: `Bearer ${cookie.load('token')}`,
                },
            });
            if (resAverage.data === '') {
                setGlobalState('isAuthorized', false);
            } else {
                setAverage(resAverage.data);
            }
            // if (resMinMax.data === '') {
            //     setGlobalState('isAuthorized', false);
            // } else {
            //     setMinMax(resMinMax.data);
            // }
            
        }
        loadDataMinMax();
    };


    useEffect(() => {
        
        setSensorID(id.id);
        
        const loadData = async () => {
            setAverage(null)
            setMinMax(null)
            const resSensor = await Apis.get(`${endpoints.listSensor}/${id.id}`, {
                headers: {
                    Authorization: `Bearer ${cookie.load('token')}`,
                },
            });
            const sensorSelected = document.getElementById('selectedSensor');
            handleOnChangeSensor(id.id);
            setSensorID(id.id);
            setSensor(resSensor.data);

            const resMinMax = await Apis.get(`${endpoints.valueMinMax}/${id.id
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
            const resAverage = await Apis.get(`${endpoints.average}/${id.id}`, {
                headers: {
                    Authorization: `Bearer ${cookie.load('token')}`,
                },
            });
            if (resAverage.data === '') {
                setGlobalState('isAuthorized', false);
            } else {
                setAverage(resAverage.data);
            }
        }
        loadData();
        

    }
    , [listener,id])


    const isAuthorized = useGlobalState('isAuthorized')[0];
    if (isAuthorized === false) {
        return (
            <>
                <ExpiredAdmin />
            </>
        );
    }

    if (sensorID == null || minMax == null || average ==null) {
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
            {/* <select
                id="selectedSensor"
                style={{ width: '30%', height: '25px', border: '0.2px', boxShadow: '5px 5px 10px 0 rgba(0, 0, 0, 0.1)' }}
                onChange={(e) => {
                    handleOnChangeSensor(e.target.value);
                }}
            >
                {sensor.map((element) => {
                    return <option value={element.id}>{element.id}</option>;
                })}
            </select> */}
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
                    <tr>
                        <td style={styles.dataCell}>Giá trung bình</td>
                        <td style={styles.dataCell}>{average.average1h}</td>
                        <td style={styles.dataCell}>{average.average1d}</td>
                        <td style={styles.dataCell}>{average.average1w}</td>
                        <td style={styles.dataCell}>{average.average1m}</td>
                    </tr>
                    <tr>
                        <td style={styles.dataCell}>Dô lệch trung bình</td>
                        <td style={styles.dataCell}>{average.standardDeviation1h}</td>
                        <td style={styles.dataCell}>{average.standardDeviation1d}</td>
                        <td style={styles.dataCell}>{average.standardDeviation1w}</td>
                        <td style={styles.dataCell}>{average.standardDeviation1m}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <RenderAllData id={sensorID} />


    </>)
}