import { useContext, useEffect, useState } from "react";
import { Form, Table } from "react-bootstrap";
import { Grid, Container, Typography } from '@mui/material';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import cookie from 'react-cookies';
import { AppWidgetSummary } from '../sections/@dashboard/app';
import { AdminContext } from "../App";
import { setGlobalState, useGlobalState } from "..";
import Apis, { endpoints } from "../configs/Apis";
import ExpiredAdmin from "./ExpiredAdmin";


export default function StatisticalReports() {
    const [date, setDate] = useState(new Date());
    const [data, setData] = useState([]);
    const [user, dispatch] = useContext(AdminContext);
    const listener = useGlobalState('message')[0];

    useEffect(() => {
        const loaddata = async () => {
    
            const res = await Apis.get(endpoints.allStation, {
                headers: {
                    Authorization: `Bearer ${cookie.load('token')}`,
                },
            });
            console.log(res);
            if (res.data === '') {
                setGlobalState('isAuthorized', false);
            } else {
                setData(res.data);
            }
        };
        loaddata();
    }, [listener]);

    const isAuthorized = useGlobalState('isAuthorized')[0];
    if (user == null) return <Navigate to="/admin/login" />;
    if (isAuthorized === false) {
        return (
            <>
                <ExpiredAdmin />
            </>
        );
    }
    return (<>

        <Container maxWidth="xl">

            <Grid container spacing={3}>
                {data.map((element) => {
                    return (
                        <Grid item xs={12} sm={6} md={3}>
                            <Link style={{ textDecoration: 'none' }} to={`/admin/report/${element.id}`}>
                                <AppWidgetSummary title={element.name} color="success" icon={'ant-design:desktop-outlined'} />
                            </Link>
                        </Grid>
                    );
                })}
            </Grid>
        </Container>
    
    </>)
}