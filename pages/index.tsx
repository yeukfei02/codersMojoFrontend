import React, { useState, useEffect } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import * as firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/messaging';
import is from 'is_js';
import axios from 'axios';

import { getFirebaseConfig, getRootUrl } from '../common/common';

import LandingPage from '../components/landingPage/LandingPage';
import NextHead from '../components/nextHead/NextHead';
import MainView from '../components/mainView/MainView';

const ROOT_URL = getRootUrl();

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#eaeff5',
    },
    secondary: {
      main: '#6f42c1',
    },
  },
});

// firebase
let messaging: any = null;
const isDesktop = is.desktop();
const isAndroid = is.android();
if (isDesktop || isAndroid) {
  // chrome or firefox
  const isNotSafari = is.not.safari();
  if (isNotSafari) {
    if (typeof self !== 'undefined' && typeof window !== 'undefined') {
      if (!firebase.apps.length) {
        const firebaseConfig = getFirebaseConfig();
        firebase.initializeApp(firebaseConfig);

        messaging = firebase.messaging();
        messaging.usePublicVapidKey(process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_VAPID_KEY as string);
      }
    }
  }
}

function IndexPage(): JSX.Element {
  const [users_id, setUsers_id] = useState('');
  const [token, setToken] = useState('');

  const [firebaseCurrentToken, setFirebaseCurrentToken] = useState('');
  const [firebaseRefreshedToken, setFirebaseRefreshedToken] = useState('');

  useEffect(() => {
    getUsers_id();
    getToken();
    getFirebaseCurrentToken();
    getFirebaseRefreshedToken();
  }, []);

  useEffect(() => {
    if ((firebaseCurrentToken || firebaseRefreshedToken) && users_id) {
      addTokenToFirebaseDetails(firebaseCurrentToken, firebaseRefreshedToken);
      subscribeTopic();
    }
  }, [firebaseCurrentToken, firebaseRefreshedToken, users_id]);

  const getUsers_id = () => {
    const users_id = localStorage.getItem('usersId');
    if (users_id) {
      setUsers_id(users_id);
    }
  };

  const getToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      setToken(token);
    }
  };

  const getFirebaseCurrentToken = async () => {
    try {
      const currentToken = await messaging.getToken();
      if (currentToken) {
        console.log('currentToken = ', currentToken);
        localStorage.setItem('firebaseCurrentToken', currentToken);
        setFirebaseCurrentToken(currentToken);
      } else {
        console.log('No Instance ID token available. Request permission to generate one.');
      }
    } catch (e) {
      console.log('An error occurred while retrieving token. ', e.message);
    }
  };

  const getFirebaseRefreshedToken = async () => {
    try {
      messaging.onTokenRefresh(async () => {
        const refreshedToken = await messaging.getToken();
        if (refreshedToken) {
          console.log('refreshedToken = ', refreshedToken);
          localStorage.setItem('firebaseRefreshedToken', refreshedToken);
          setFirebaseRefreshedToken(refreshedToken);
        }
      });
    } catch (e) {
      console.log('Unable to retrieve refreshed token. ', e.message);
    }
  };

  const addTokenToFirebaseDetails = async (firebaseCurrentToken: string, firebaseRefreshedToken: string) => {
    if (users_id) {
      const response = await axios.post(`${ROOT_URL}/firebase/add-token-to-firebase-details`, {
        currentToken: firebaseCurrentToken,
        refreshedToken: firebaseRefreshedToken,
        users_id: users_id,
      });
      if (response) {
        const responseData = response.data;
        console.log('response.status = ', response.status);
        console.log('responseData = ', responseData);
      }
    }
  };

  const subscribeTopic = async () => {
    if (users_id) {
      const response = await axios.post(`${ROOT_URL}/firebase/subscribe-topic`, {
        registrationTokenList: [firebaseCurrentToken],
        topic: 'all',
        users_id: users_id,
      });
      if (response) {
        const responseData = response.data;
        console.log('response.status = ', response.status);
        console.log('responseData = ', responseData);
      }
    }
  };

  const renderDiv = (users_id: string, token: string) => {
    let resultDiv = <LandingPage />;

    if (users_id && token) {
      resultDiv = <MainView />;
    }

    return resultDiv;
  };

  return (
    <MuiThemeProvider theme={theme}>
      <NextHead />
      {renderDiv(users_id, token)}
    </MuiThemeProvider>
  );
}

export default IndexPage;
