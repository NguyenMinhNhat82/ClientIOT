import { useContext, useEffect, useState } from "react";
import { Form, Table } from "react-bootstrap";
import { Grid, Container, Typography, Button } from '@mui/material';
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




export default function StatisticalReports() {
    const [data, setData] = useState(null);
    const [user, dispatch] = useContext(AdminContext);
    const listener = useGlobalState('message')[0];
    const exportData = async () => {

        const config = {
            headers: { Authorization: `Bearer ${cookie.load('token')}` }
        };
        axios({
            url: "",
            method: 'GET',
            responseType: 'blob',

        }).then((response) => {
            fileDownload(response.data, 'report.csv');
        });

    }

    useEffect(() => {
        const loaddata = async () => {
            setData(null)
            const resNotification = await Apis.get(endpoints.getNumberUnread, {
                headers: {
                    Authorization: `Bearer ${cookie.load('token')}`,
                },
            });
            if (resNotification.data === '') {
                setGlobalState('isAuthorized', false);
            } else {
         
              const notification  = document.querySelector("#root > div > nav > div > div > div > div > div.simplebar-wrapper > div.simplebar-mask > div > div > div > div.MuiBox-root.css-0 > ul > a:nth-child(4)");
              if(notification != null){
                console.log(notification.childNodes.length)
                if(notification.childNodes.length > 2){
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
            const res = await Apis.get(endpoints.allStation, {
                headers: {
                    Authorization: `Bearer ${cookie.load('token')}`,
                },
            });
            if (res.data === '') {
                setGlobalState('isAuthorized', false);
            } else {
                setData(res.data);
                console.log(data)
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
    if (data == null)

        return (
            <div className="text-center">
                <MySpinner />
            </div>
        )
    return (<>



        <Container maxWidth="xl">
            <a href="https://serveriot-ob37.onrender.com/export">
                <Button variant="contained"  >
                    Export all data
                </Button>
            </a>

            <br />
            <br />
            <br />

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