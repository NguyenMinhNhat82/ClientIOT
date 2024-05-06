import { useEffect, useState } from "react"
import cookie from 'react-cookies';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { setGlobalState, useGlobalState } from "..";
import Apis, { endpoints } from "../configs/Apis";
import MySpinner from "../layouts/Spinner";
import ExpiredAdmin from "../pages/ExpiredAdmin";

export default function RenderAllData(id) {

    const [data1Hour, setData1Hour] = useState();
    const [data1Day, setData1Day] = useState();
    const [data1Week, setData1Week] = useState();
    const [data1Month, setData1Mont] = useState();

    const listener = useGlobalState('message')[0];

    const formatdDte = (e) => {

        return `Date:${e.split("T")[0]}, Time${e.split("T")[1]}`
    }

    useEffect(() => {
        const data1h = [];
        const data1d = [];
        const data1w = [];
        const data1m = [];
        const loadData = async () => {
            const loadInfoSensor1Hour = async () => {
                const res = await Apis.get(`${endpoints.valueSensor1Hour}/${id.id}`, {
                    headers: {
                        Authorization: `Bearer ${cookie.load('token')}`,
                    },
                });
                
                if (res.data === '') {
                    setGlobalState('isAuthorized', false);
                } else {
                    for (let i = 0; i < res.data.length; i += 1) {
                        data1h.push({
                            name: `${formatdDte(res.data[i].timeUpdate)}`,
                            value: res.data[i].value,
                        });
                    }
                    setData1Hour(data1h);
                }
                
            };

            const loadInfoSensor1Day = async () => {
                const res = await Apis.get(`${endpoints.valueSensor1Day}/${id.id}`, {
                    headers: {
                        Authorization: `Bearer ${cookie.load('token')}`,
                    },
                });

                if (res.data === '') {
                    setGlobalState('isAuthorized', false);
                } else {
                    for (let i = 0; i < res.data.length; i += 1) {
                        data1d.push({
                            name: `${formatdDte(res.data[i].timeUpdate)}`,
                            value: res.data[i].value,
                        });
                    }
                    setData1Day(data1d);
                }
                
            };

            const loadInfoSensor1Week = async () => {
                const res = await Apis.get(`${endpoints.valueSensor1Week}/${id.id}`, {
                    headers: {
                        Authorization: `Bearer ${cookie.load('token')}`,
                    },
                });
                if (res.data === '') {
                    setGlobalState('isAuthorized', false);
                } else {
                    for (let i = 0; i < res.data.length; i += 1) {
                        data1w.push({
                            name: `${formatdDte(res.data[i].timeUpdate)}`,
                            value: res.data[i].value,
                        });
                    }
                    setData1Week(data1w);
                }
                
            };

            const loadInfoSensor1Monh = async () => {
                const res = await Apis.get(`${endpoints.valueSensor1Month}/${id.id}`, {
                    headers: {
                        Authorization: `Bearer ${cookie.load('token')}`,
                    },
                });
                if (res.data === '') {
                    setGlobalState('isAuthorized', false);
                } else {
                    for (let i = 0; i < res.data.length; i += 1) {
                        data1m.push({
                            name: `${formatdDte(res.data[i].timeUpdate)}`,
                            value: res.data[i].value,
                        });
                    }
                    setData1Mont(data1m);
                }
            };
            
                loadInfoSensor1Day();
                loadInfoSensor1Hour();
                loadInfoSensor1Monh();
                loadInfoSensor1Week();
        }
        loadData();

    }, [listener, id])

    const isAuthorized = useGlobalState('isAuthorized')[0];
    if (isAuthorized === false) {
        return (
            <>
                <ExpiredAdmin />
            </>
        );
    }
    if(data1Hour == null || data1Day == null || data1Week == null || data1Month == null){
        return(<>
        <div className="text-center">
            <MySpinner/>
        </div>
        </>)
    }
    return (
        <>
            <br />
            <br />
            <br />
            <h1 className="text-center">{id.id}</h1>
            <br />
            <br />
            <h3 className="text-center">Giá trị trong vòng 1 giờ qua</h3>
            <ResponsiveContainer width="100%" aspect={3}>
                <LineChart data={data1Hour} margin={{ right: 300 }}>
                    <CartesianGrid />
                    <XAxis hide dataKey="name" interval={'preserveStartEnd'} />
                    <YAxis />
                    <Legend />
                    <Tooltip />
                    <Line dataKey="value" stroke="black" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
            <br />
            <br />
            <br />
            <h3 className="text-center">Giá trị trong vòng 24 giờ qua</h3>
            <ResponsiveContainer width="100%" aspect={3}>
                <LineChart data={data1Day} margin={{ right: 300 }}>
                    <CartesianGrid />
                    <XAxis hide dataKey="name" interval={'preserveStartEnd'} />
                    <YAxis />
                    <Legend />
                    <Tooltip />
                    <Line dataKey="value" stroke="black" activeDot={{ r: 8 }} dot = {false} />
                </LineChart>
            </ResponsiveContainer>
            <br />
            <br />
            <br />
            <h3 className="text-center">Giá trị trong vòng 7 ngày qua</h3>
            <ResponsiveContainer width="100%" aspect={3}>
                <LineChart data={data1Week} margin={{ right: 300 }}>
                    <CartesianGrid />
                    <XAxis hide dataKey="name" interval={'preserveStartEnd'} />
                    <YAxis />
                    <Legend />
                    <Tooltip />
                    <Line dataKey="value" stroke="black" activeDot={{ r: 8 }} dot = {false} />
                </LineChart>
            </ResponsiveContainer>
            <br />
            <br />
            <br />
            <h3 className="text-center">Giá trị trong vòng 31 ngày qua</h3>
            <ResponsiveContainer width="100%" aspect={3}>
                <LineChart data={data1Month} margin={{ right: 300 }}>
                    <CartesianGrid />
                    <XAxis hide dataKey="name" interval={'preserveStartEnd'} />
                    <YAxis />
                    <Legend />
                    <Tooltip />
                    <Line dataKey="value" stroke="black" activeDot={{ r: 8 }} dot ={false} />
                </LineChart>
            </ResponsiveContainer>
        </>
    )

}