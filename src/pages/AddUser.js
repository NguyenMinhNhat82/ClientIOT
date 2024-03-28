import cookie from 'react-cookies';
import { LoadingButton } from '@mui/lab';
import { Container, IconButton, InputAdornment, InputLabel, MenuItem, Select, Stack, TextField, Typography, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router-dom';
import Iconify from '../components/iconify';
import Apis, { endpoints } from '../configs/Apis';



function AddUser() {
    const path = useParams();
    const navigate = useNavigate();
    const [id, setID] = useState();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [role, setRole] = useState();
    const [password, setPassword] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const [refresh, setRefresh] = useState(false)
    const handleNameChange = (event) => {
        setName(event.target.value)
    }
    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
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
            const res = await Apis.post(endpoints.createUser,
                {
                    "name": `${name}`,
                    "email": `${email}`,
                    "password":`${password}`,
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
            
        };
        editUser();
    }
    return (
        <Container maxWidth="sm">

            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
                Thêm người dùng
            </Typography>
            <Stack spacing={3}>
                
                <TextField id='name' name="name" label="Name"  onChange={handleNameChange} required/>
                <TextField type='email' id='email' name="email" label="Email address" onChange={handleEmailChange} required/>
                <TextField
                    id='password'
                    name="password"
                    label="Password"
                    onChange={handlePasswordChange}
                    type={showPassword ? 'text' : 'password'}
                    required
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                            <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                          </IconButton>
                        </InputAdornment>

                      ),
                    }}
                  />
                
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Age"
                    onChange={handleChange}
                    required
                    value={"2"}
                >
                    <MenuItem value={"1"}>Quản trị viên</MenuItem>
                    <MenuItem value={"2"}>Người dùng</MenuItem>

                </Select>
            </Stack>
            <br />
            <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleEdit} >
                Add
            </LoadingButton>

        </Container>
    );
}

export default AddUser;