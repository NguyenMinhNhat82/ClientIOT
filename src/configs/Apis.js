import axios from 'axios';
import cookie from 'react-cookies';

// const SERVER = 'https://serveriot-0z1m.onrender.com';
const SERVER = 'https://serveriot-i4o4.onrender.com';

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
  createUser:"/api/user/create-user",
  stationInfo:"/api/staion-info",
  listSensor: "/api/station/sensor",
  valueSensor1Hour:"/api/value-sensor-1h",
  valueSensor1Day:"/api/value-sensor-1d",
  valueSensor1Week:"/api/value-sensor-1w",
  valueSensor1Month:"/api/value-sensor-1m",
  valueMinMax:"/api/min-max-value",
  allMinMax :"/api/all-min-max",
  export:"/export",
  historyOfSensor:"/api/history-of-sensor",
  getAllStationAndSensor :"/api/all-station-and-sensor",
  inActveStation : "/api/station/in-active/",
  actveStation : "/api/station/active/",
  inActiveSensor: '/api/sensor/in-avtive/',
  activeSensor: '/api/sensor/avtive/',
  average : '/api/sensor/average',
  getNumberUnread : "/api/notification/get-num-unread",
  getAllNotification:"/api/notification/get-all",
  readAllNotification: "/api/notification/read-all",
  scheduleInActive :"/api/sensor/schedule-inactive",
  cancelSchedule :"/api/sensor/cancel-schedule/",
  editSchedule :"/api/sensor/edit-schedule-inactive",
  getDataWeekInMonth:"/api/sensor/dataByMonthAndWeek",
  getDataDayInWeek:"/api/sensor/dataByWeek",
  getIndex:"/api/sensor/get-index"






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
