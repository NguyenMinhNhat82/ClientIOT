import React, { useContext, useEffect, useState, Component } from 'react';

import { Helmet } from 'react-helmet-async';
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import cookie from 'react-cookies';
// @mui
import { Form } from "react-bootstrap";
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Button, Stack, TextField, listItemTextClasses, Select, MenuItem } from '@mui/material';
import { toInteger } from 'lodash';
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

export default function AdminDashboardAppPage() {
  const [user, dispatch] = useContext(AdminContext);
  const [data, setData] = useState(null);
  const [refresh, setRefresh] = useState(false)
  const [id, setid] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("USER");
  const theme = useTheme();
  const navigate = useNavigate();
  const [q] = useSearchParams();
  const choose = (id) => {
    navigate(`/app/${id}`);
  };

  const search = (evt) => {
    evt.preventDefault();
    navigate(`/admin/home?id=${id}&name=${name}&role=${role}&email=${email}`)
  }
  const handleRefesh =() =>{
    document.getElementById("name").value = ""
    document.getElementById("email").value = ""
    document.getElementById("id").value = ""
    setRole("USER")
    navigate(`/admin/home`)
  }


  const listener = useGlobalState('message')[0];


  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 300 },
    { field: 'email', headerName: 'Email', width: 400 },
    {
      field: 'role',
      headerName: 'Role',
      width: 130,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 180,
      sortable: false,
      disableClickEventBubbling: true,

      renderCell: (params) => {
        const deleteUser = () => {
          const currentRow = params.row;
          const removeUser = async () => {
            const res = await Apis.delete(`${endpoints.deletUser}?idUSer=${currentRow.id}`, {
              headers: {
                Authorization: `Bearer ${cookie.load('token')}`,
              },
            })
            
            if (res.data === "Success") {
              if (refresh) {
                setRefresh(false)
              }
              else {
                setRefresh(true)
              }
            }
            else {
              alert(res.data)
            }
          }
          removeUser();
        }
        const onClick = (e) => {
          const currentRow = params.row;
          navigate(`/admin/user/${currentRow.id}`)
        };

        return (
          <Stack direction="row" spacing={2}>
            <Button variant="outlined" color="warning" size="small" onClick={onClick}>Edit</Button>
            <Button variant="outlined" color="error" size="small" onClick={deleteUser}>Delete</Button>
          </Stack>
        );
      },
    },
  ];


  const isAuthorized = useGlobalState('isAuthorized')[0];
  const formatTitle = (str) => {
    return str
      .slice(0, 1)
      .toUpperCase()
      .concat(str.slice(1, 7).concat(` ${str.substring(7, 9)}`));
  };
  useEffect(() => {
    const loadUser = async () => {

      const idParam = q.get("id")
      const nameParam = q.get("name")
      const emailParam = q.get("email")
      const roleParam = q.get("role")
      const e = `${endpoints.listUser}?id=${idParam === null ? "" : idParam}&name=${nameParam === null ? "" : nameParam}&role=${roleParam === null ? "" : roleParam}&email=${emailParam === null ? "" : emailParam}`
      const res = await Apis.get(e, {
        headers: {
          Authorization: `Bearer ${cookie.load('token')}`,
        },
      })
      if (res.data === '') {
        setGlobalState('isAuthorized', false);
      } else {
        const row1 = [];
        res.data.forEach((element) => {
          row1.push({ id: element.id, name: element.name, email: element.email, role: element.role });
        }
        )
        setData(row1);
        
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

      <Container maxWidth="xl">
        <Button variant="contained" onClick={() => { navigate("/admin/user/add") }}>
          Add
        </Button>
        <br />
        <br />
        <Form onSubmit={search} inline>
          <div className="d-flex flex-row mb-3 gap-5">
            <div className="search">
              <TextField
                id="id"
                variant="outlined"
                fullWidth
                label="Id"
                onChange={e => setid(e.target.value)}
              />
            </div>
            <div className="search">
              <TextField
                id="name"
                variant="outlined"
                fullWidth
                label="Name"
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div className="search">
              <TextField
                id="email"
                variant="outlined"
                fullWidth
                label="Email"
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="search">
              <Select
                labelId="role"
                id="demo-simple-select"
                value={`${role}`}
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value={"ADMIN"}>Quản trị viên</MenuItem>
                <MenuItem value={"USER"}>Người dùng</MenuItem>

              </Select>
            </div>
            <Button variant="contained" type="submit">
              Search
            </Button>
            <Button variant="contained" onClick={handleRefesh} >
              Refresh
            </Button>
          </div>
        </Form>


        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={data}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        </div>
      </Container>
    </>
  );
}
