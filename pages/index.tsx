import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import * as firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/messaging';

import { getFirebaseConfig } from '../common/common';

import LandingPage from '../components/landingPage/LandingPage';
import MainView from '../components/mainView/MainView';

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
if (typeof self !== 'undefined' && typeof window !== 'undefined') {
  if (!firebase.apps.length) {
    const firebaseConfig = getFirebaseConfig();
    firebase.initializeApp(firebaseConfig);

    messaging = firebase.messaging();
    messaging.usePublicVapidKey(process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_VAPID_KEY as string);
  }
}

function MainPage(): JSX.Element {
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
      const response = await fetch(`/api/firebase/add-token-to-firebase-details`, {
        method: 'POST',
        body: JSON.stringify({
          currentToken: firebaseCurrentToken,
          refreshedToken: firebaseRefreshedToken,
          users_id: users_id,
        }),
      });
      if (response) {
        const responseData = await response.json();
        console.log('response.status = ', response.status);
        console.log('responseData = ', responseData);
      }
    }
  };

  const subscribeTopic = async () => {
    if (users_id) {
      const response = await fetch(`/api/firebase/subscribe-topic`, {
        method: 'POST',
        body: JSON.stringify({
          registrationTokenList: [firebaseCurrentToken],
          topic: 'all',
          users_id: users_id,
        }),
      });
      if (response) {
        const responseData = await response.json();
        console.log('response.status = ', response.status);
        console.log('responseData = ', responseData);

        if (response.status === 200) {
        }
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
      <Head>
        <title>CodersMojo</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <script
          src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
          integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
          crossOrigin="anonymous"
        ></script>
        <script
          src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"
          integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN"
          crossOrigin="anonymous"
        ></script>
        <script
          src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"
          integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV"
          crossOrigin="anonymous"
        ></script>
      </Head>
      {renderDiv(users_id, token)}
    </MuiThemeProvider>
  );
}

export default MainPage;
