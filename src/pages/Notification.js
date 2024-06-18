import React, { useContext, useEffect, useState, Component } from 'react';
import "./Notification.css"
import { Helmet } from 'react-helmet-async';
import DateTimePicker from 'react-datetime-picker';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import cookie from 'react-cookies';
// @mui
import { Form } from "react-bootstrap";
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Button, Stack, TextField, listItemTextClasses, Select, MenuItem } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Apis, { endpoints } from '../configs/Apis';
import { setGlobalState, useGlobalState } from '..';
import { AdminContext, MyUserContext } from '../App';
import 'bootstrap/dist/css/bootstrap.min.css';


// components
import Iconify from '../components/iconify';
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';
import Expired from './Expired';
import ExpiredAdmin from './ExpiredAdmin';
import MySpinner from '../layouts/Spinner';







// sections

// ----------------------------------------------------------------------

export default function Notification() {

   
    const [from,setFrom] = useState(new Date());
    const [to,setTo] = useState(new Date());
  const [user, dispatch] = useContext(AdminContext);
  const [data, setData] = useState(null);
  const [refresh, setRefresh] = useState(false)
  const [id, setid] = useState("");
  const [kw, setKw] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("USER");
  const theme = useTheme();
  const navigate = useNavigate();
  const [q] = useSearchParams();
  const choose = (id) => {
    navigate(`/app/${id}`);
  };
  const onchaneFromDate = (e) =>{
        setFrom(e.target.value)
  }
  const search = (evt) => {
    evt.preventDefault();
    navigate(`/admin/notification?from=${selectedDateFrom}&to=${selectedDateFrom}&kw=${kw}`)
  }
  const handleRefesh =() =>{
    document.getElementById("name").value = ""
    document.getElementById("email").value = ""
    document.getElementById("id").value = ""
    setRole("USER")
    navigate(`/admin/home`)
  }
  
  const notification  = document.querySelector("#root > div > nav > div > div > div > div > div.simplebar-wrapper > div.simplebar-mask > div > div > div > div.MuiBox-root.css-0 > ul > a:nth-child(4)");
  if(notification != null){
    console.log(notification.childNodes.length)
    if(notification.childNodes.length > 2){
      if (notification.lastChild) {
        while(notification.childNodes.length > 2){
          notification.removeChild(notification.lastChild);
        }
      }
      
    }
    const spanElement = document.createElement("span");
    
  
    // Set the inner HTML content to "0"
    spanElement.innerHTML = "0"
    spanElement.style.padding = "4px 13px";
    spanElement.style.backgroundColor = "red";
    spanElement.style.color = "white";
    spanElement.style.borderRadius = "10px";
    
    notification.appendChild(spanElement)
  }


  const listener = useGlobalState('message')[0];


  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'state', headerName: 'Level', width: 100 },
    { field: 'notification', headerName: 'Content', width: 700 },
    { field: 'value', headerName: 'Value', width: 300 },
    { field: 'time', headerName: 'Time', width: 300 },
    // {
    //   field: 'action',
    //   headerName: 'Action',
    //   width: 180,
    //   sortable: false,
    //   disableClickEventBubbling: true,

    //   renderCell: (params) => {
    //     const deleteUser = () => {
    //       const c = window.confirm("Bạn có chắc muốn xóa người dùng này?");
    //       if(c === true){
    //         const currentRow = params.row;
    //         const removeUser = async () => {
    //           const res = await Apis.delete(`${endpoints.deletUser}?idUSer=${currentRow.id}`, {
    //             headers: {
    //               Authorization: `Bearer ${cookie.load('token')}`,
    //             },
    //           })
              
    //           if (res.data === "Success") {
    //             if (refresh) {
    //               setRefresh(false)
    //             }
    //             else {
    //               setRefresh(true)
    //             }
    //           }
    //           else {
    //             alert(res.data)
    //           }
    //         }
    //         removeUser();
    //       }
          
    //     }
    //     const onClick = (e) => {
    //       const currentRow = params.row;
    //       navigate(`/admin/user/${currentRow.id}`)
    //     };

    //     return (
    //       <Stack direction="row" spacing={2}>
    //         <Button variant="outlined" color="warning" size="small" onClick={onClick}>Edit</Button>
    //         <Button variant="outlined" color="error" size="small" onClick={deleteUser}>Delete</Button>
    //       </Stack>
    //     );
    //   },
    // },
  ];


  const [selectedDateTo, setSelectedDateTo] = React.useState();
  const [selectedDateFrom, setSelectedDateFrom] = React.useState();

  const handleDateChangeFrom = (date) => {
    setSelectedDateFrom(date);
  };
  const handleDateChangeTo = (date) => {
    setSelectedDateTo(date);
  };
  const isAuthorized = useGlobalState('isAuthorized')[0];
  const formatTitle = (str) => {
    return str
      .slice(0, 1)
      .toUpperCase()
      .concat(str.slice(1, 7).concat(` ${str.substring(7, 9)}`));
  };
  const getRowClassName = (params) => {
    const isReaded = params.row.isRead;
    console.log(params.row)
    return isReaded ? '' : 'unread-row';
  };
  const renderLevelCell = (params) => {
    const state = params.row.state;
    let color = '';

    // Determine color based on the value of the "state" field
    switch (state) {
      case 'Low':
        color = 'yellow';
        break;
      case 'High':
        color = 'orange';
        break;
      case 'Very high':
        color = 'red';
        break;
      default:
        color = 'black'; // Default color if state does not match any case
        break;
    }

    // JSX representing colored circles based on state
    return (
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <div
          style={{
            width: 16,
            height: 16,
            borderRadius: '50%',
            backgroundColor: color,
            marginLeft:"-50px"
          }}
        />
      </div>
    );
  };    
  const customColumns = columns.map((col) => {
    if (col.field === 'state') {
      return {
        ...col,
        renderCell: renderLevelCell,
      };
    }
    return col;
  });
  Apis.get(endpoints.readAllNotification, {
    headers: {
      Authorization: `Bearer ${cookie.load('token')}`,
    },
  })
  useEffect(() => {
    const loadUser = async () => {

      const fromParam = q.get("from")
      const toParam = q.get("to")
      const kwParam = q.get("kw")

      const e = `${endpoints.getAllNotification}?from=${fromParam === null ? "" : fromParam}&to=${toParam === null ? "" : toParam}&kw=${kwParam === null ? "" : kwParam}`
      const res = await Apis.get(endpoints.getAllNotification, {
        headers: {
          Authorization: `Bearer ${cookie.load('token')}`,
        },
      })
      if (res.data === '') {
        setGlobalState('isAuthorized', false);
      } else {
        const row1 = [];
        res.data.forEach((element) => {
          row1.push({id: element.id ,state:element.state, notification: element.content, value: element.value, isRead:element.isRead, time:element.time });
        }
        )
        setData(row1);
        
      }


      
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
    }
    loadUser();
  }, [refresh, q])

  const handleChange = (event) => {
    setRole(event.target.value)

  };
  //   if (user == null) return <Navigate to="/login" />;
  if (isAuthorized === false) {
    return (
      <>
        <ExpiredAdmin />
      </>
    );
  }
  if (data === null) {
    return (
      <>
        <div className='text-center'>
          <MySpinner />
        </div>
      </>
    )
  }
  // data chart
  if (user == null) return <Navigate to="/admin/login" />;

  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

        
            
    

      {/* <DateTimePicker onChange={onchaneFromDate} value={from} /> */}
      <Container maxWidth="xl">
            
        {/* <Form onSubmit={search} inline>
          <div className="d-flex flex-row mb-3 gap-5">
    
            <div className="search">
            <h6>From:</h6>
            <Datetime
                value={selectedDateFrom}
                onChange={handleDateChangeFrom}
            />
            </div>
            <div className="search">
            <h6>To:</h6>
            <Datetime
                label = "To"
                value={selectedDateTo}
                onChange={handleDateChangeTo}
            />
            </div>
            <div className="search">
              <TextField
                id="kw"
                variant="outlined"
                fullWidth
                label="Sensor"
                onChange={e => setKw(e.target.value)}
              />
            </div>
            <Button variant="contained" type="submit">
              Search
            </Button>
            <Button variant="contained" onClick={handleRefesh} >
              Refresh
            </Button>
          </div>
        </Form> */}


        <div style={{ height: 700, width: '100%' }}>
          <DataGrid
            rows={data}
            columns={customColumns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            getRowClassName={getRowClassName}
          />
        </div>
      </Container>
    </>
  );
}
