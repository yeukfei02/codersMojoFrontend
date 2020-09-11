import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import LandingPage from '../components/landingPage/LandingPage';
import MainView from '../components/mainView/MainView';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#fdbdb8',
    },
    secondary: {
      main: '#F6820D',
    },
  },
});

function MainPage(): JSX.Element {
  const [token, setToken] = useState('');

  useEffect(() => {
    getToken();
  }, []);

  const getToken = () => {
    const token = localStorage.getItem('token');
    if (token && token !== 'undefined') {
      setToken(token);
    }
  };

  const renderDiv = (token: string) => {
    let resultDiv = <LandingPage />;

    if (token) {
      resultDiv = <MainView />;
    }

    return resultDiv;
  };

  return (
    <MuiThemeProvider theme={theme}>
      <Head>
        <title>CodersMojo</title>
        <link rel="shortcut icon" href="/favicon.png" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
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
      {renderDiv(token)}
    </MuiThemeProvider>
  );
}

export default MainPage;
