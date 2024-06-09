import { useEffect, useRef, useState } from "react"
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
    const prevId = useRef();

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
            if(prevId.current!= null){
                if(prevId.current.id !== id.id){
                    setData1Hour(null);
                    setData1Day(null);
                    setData1Mont(null);
                    setData1Week(null)
                }
            }
            
            const loadAllData = async () => {
                const res = await Apis.get(`${endpoints.historyOfSensor}/${id.id}`, {
                    headers: {
                        Authorization: `Bearer ${cookie.load('token')}`,
                    },
                });
    

                if (res.data === '') {
                    setGlobalState('isAuthorized', false);
                } else {
                    for (let i = 0; i < res.data.values1h.length; i += 1) {
                        data1h.push({
                            name: `${formatdDte(res.data.values1h[i].timeUpdate)}`,
                            value: res.data.values1h[i].value,
                        });
                    }
                    setData1Hour(data1h);

                    for (let i = 0; i < res.data.values1m.length; i += 1) {
                        data1m.push({
                            name: `${formatdDte(res.data.values1m[i].timeUpdate)}`,
                            value: res.data.values1m[i].value,
                        });
                    }
                    setData1Mont(data1m);

                    for (let i = 0; i < res.data.values1d.length; i += 1) {
                        data1d.push({
                            name: `${formatdDte(res.data.values1d[i].timeUpdate)}`,
                            value: res.data.values1d[i].value,
                        });
                    }
                    setData1Day(data1d);

                    for (let i = 0; i < res.data.values1w.length; i += 1) {
                        data1w.push({
                            name: `${formatdDte(res.data.values1w[i].timeUpdate)}`,
                            value: res.data.values1w[i].value,
                        });
                    }
                    setData1Week(data1w);
                }

            };

            loadAllData();
        }
        loadData();
        prevId.current = id

    }, [listener, id])

    const isAuthorized = useGlobalState('isAuthorized')[0];
    if (isAuthorized === false) {
        return (
            <>
                <ExpiredAdmin />
            </>
        );
    }
    if (data1Hour == null || data1Day == null || data1Week == null || data1Month == null) {
        return (<>
            <div className="text-center">
                <MySpinner />
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
                <LineChart data={data1Hour}>
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
                <LineChart data={data1Day} >
                    <CartesianGrid />
                    <XAxis hide dataKey="name" interval={'preserveStartEnd'} />
                    <YAxis />
                    <Legend />
                    <Tooltip />
                    <Line dataKey="value" stroke="black" activeDot={{ r: 8 }} dot={false} />
                </LineChart>
            </ResponsiveContainer>
            <br />
            <br />
            <br />
            <h3 className="text-center">Giá trị trong vòng 7 ngày qua</h3>
            <ResponsiveContainer width="100%" aspect={3}>
                <LineChart data={data1Week} >
                    <CartesianGrid />
                    <XAxis hide dataKey="name" interval={'preserveStartEnd'} />
                    <YAxis />
                    <Legend />
                    <Tooltip />
                    <Line dataKey="value" stroke="black" activeDot={{ r: 8 }} dot={false} />
                </LineChart>
            </ResponsiveContainer>
            <br />
            <br />
            <br />
            <h3 className="text-center">Giá trị trong vòng 31 ngày qua</h3>
            <ResponsiveContainer width="100%" aspect={3}>
                <LineChart data={data1Month} >
                    <CartesianGrid />
                    <XAxis hide dataKey="name" interval={'preserveStartEnd'} />
                    <YAxis />
                    <Legend />
                    <Tooltip />
                    <Line dataKey="value" stroke="black" activeDot={{ r: 8 }} dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </>
    )

}