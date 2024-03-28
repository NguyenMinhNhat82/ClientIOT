import axios from 'axios';
import cookie from 'react-cookies';

const SERVER = 'http://localhost:9000';

export const endpoints = {
  login: '/authenticate',
  current_user: '/api/current-user',
  register: '/sign-up',
  loaddata: '/data',
  getExpirationDate: '/expirationOfToken',
  historyOFStation: '/api/history',
  current_data: '/api/value-sensor',
  allStation: '/api/all-station',
  minCo: '/api/minCO',
  maxCo: '/api/maxCO',
  station: '/api/datastation',
  checkemail: "/checkusername/",
  generateOTP :"/generateOtp",
  validateOTP:'/validateOtp',
  adminLogin:"/admin-authenticate",
  listUser :"/api/user/get0-all",
  deletUser:"/api/user/delete",
  getUser:"/api/user",
  editUser :"/api/user/edit-user",
  createUser:"/api/user/create-user"
};
export const authApi = () => {
  return axios.create({
    baseURL: SERVER,
    headers: {
      Authorization: `Bearer ${cookie.load('token')}`,
    },
  });
};


export default axios.create({
  baseURL: SERVER,
});
