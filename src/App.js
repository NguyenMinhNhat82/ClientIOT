import React, { createContext, useEffect, useReducer } from 'react';
import cookie from "react-cookies";
import { BrowserRouter, Navigate, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import SockJS from 'sockjs-client';
import { over } from 'stompjs';
// routes
// import { over } from 'stompjs'
import { setGlobalState, useGlobalState } from './index';
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import MyUserReducer from './produces/MyUserReducer';
import Apis, { endpoints } from './configs/Apis';
import AdminReducer from './produces/AdminReducer';





// ----------------------------------------------------------------------

export const MyUserContext = createContext();
export const AdminContext = createContext();

export default function App() {
  let stompClient = null;
  const [user, dispatch] = useReducer(MyUserReducer, cookie.load("user") || null);
  const [admin, adminDispatch] = useReducer(AdminReducer, cookie.load("user") || null);

  const expiration = cookie.load("expiration")
  const onPrivateMessage = (payload) => {
    const payloadData = JSON.parse(payload.body);
    setGlobalState("message", payloadData.date)
  }
  const onError = (err) => {
    console.log(err);

  }
  const userJoin = () => {
    const chatMessage = {
      senderName: 'client',
      status: "JOIN"
    };
    stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
  }
  React.useEffect(() => {
    const Sock = new SockJS('http://localhost:9000/ws');
    stompClient = over(Sock);
    stompClient.connect({}, () => {
      stompClient.subscribe('/user/client/private', onPrivateMessage);
      userJoin();
    }, onError)
    dispatch({
      "type": "logout"
    })
  }, []);


  return (
    <MyUserContext.Provider value={[user, dispatch]}>
      <AdminContext.Provider value={[admin,adminDispatch]}>
      <HelmetProvider>
        <BrowserRouter>
          <ThemeProvider>
            <ScrollToTop />
            <StyledChart />
            <Router />
          </ThemeProvider>
        </BrowserRouter>
      </HelmetProvider>
    </AdminContext.Provider>
    </MyUserContext.Provider>
  );
}
