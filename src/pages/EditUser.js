import cookie from 'react-cookies';
import { LoadingButton } from '@mui/lab';
import { Container, IconButton, InputAdornment, InputLabel, MenuItem, Select, Stack, TextField, Typography, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router-dom';
import Iconify from '../components/iconify';
import Apis, { endpoints } from '../configs/Apis';



function EditUser() {
    const path = useParams();
    const navigate = useNavigate();
    const [id, setID] = useState();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [role, setRole] = useState();
    const [age, setAge] = useState();
    const [refresh, setRefresh] = useState(false)
    const handleNameChange = (event) => {
        setName(event.target.value)
    }
    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }
    const handleChange = (event) => {
        setRole(event.target.value)
        console.log(role)
    };
    const handleEdit = () => {
        const editUser = async () => {
            let roleReq = null;
            if (role === 1)
                roleReq = "ADMIN"
            else
                roleReq = "USER"
            const res = await Apis.put(endpoints.editUser,
                {
                    "id": `${id}`,
                    "name": `${name}`,
                    "email": `${email}`,
                    "role": `${roleReq}`
                },
                {
                    headers: {
                        Authorization: `Bearer ${cookie.load('token')}`,
                    },
                });
            alert(res.data)
            if (res.data === "Success") {
                navigate("/admin/home")
            }
            
                if (refresh) {
                    setRefresh(false)
                }
                else {
                    setRefresh(true)
                }
            
        };
        editUser();
    }



    useEffect(() => {
        const loaddata = async () => {
            const res = await Apis.get(`${endpoints.getUser}/${path.id}`, {
                headers: {
                    Authorization: `Bearer ${cookie.load('token')}`,
                },
            });
            setName(res.data.name)
            setID(res.data.id)
            setEmail(res.data.email)
            if (res.data.role === "ADMIN") {
                setRole(1)
            }
            else {
                setRole(2)
            }
        };
        loaddata();
    }, [refresh])
    return (
        <Container maxWidth="sm">

            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
                Thông tin người dùng
            </Typography>
            <Stack spacing={3}>
                <TextField id='id' name="id" label="ID" value={`${id}`} disabled />
                <TextField id='name' name="name" label="Name" value={`${name}`} onChange={handleNameChange} />
                <TextField type='email' id='email' name="email" label="Email address" value={`${email}`} onChange={handleEmailChange} />
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={`${role}`}
                    label="Age"
                    onChange={handleChange}
                >
                    <MenuItem value={"1"}>Quản trị viên</MenuItem>
                    <MenuItem value={"2"}>Người dùng</MenuItem>

                </Select>
            </Stack>
            <br />
            <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleEdit} >
                Edit
            </LoadingButton>

        </Container>
    );
}

export default EditUser;