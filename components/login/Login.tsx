import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import CustomSnackBar from '../customSnackBar/CustomSnackBar';
import { validateEmail } from '../../common/common';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    padding: 35,
  },
});

function Login(): JSX.Element {
  const classes = useStyles();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [snackBarStatus, setSnackBarStatus] = useState(false);
  const [snackBarType, setSnackBarType] = useState('success');
  const [snackBarMessage, setSnackBarMessage] = useState('');

  const handleEmailInputChange = (e: any) => {
    if (e.target.value) {
      setEmail(e.target.value);
    }
  };

  const handlePasswordInputChange = (e: any) => {
    if (e.target.value) {
      setPassword(e.target.value);
    }
  };

  const handleLoginButtonClick = (email: string, password: string) => {
    if (email && password) {
      const isEmail = validateEmail(email);
      if (isEmail) {
        login(email, password);
      } else {
        setSnackBarStatus(true);
        setSnackBarType('error');
        setSnackBarMessage('Wrong email format');
      }
    }
  };

  const login = async (email: string, password: string) => {
    const response = await fetch(`/api/user/login`, {
      method: 'POST',
      body: JSON.stringify({ email: email, password: password }),
    });
    if (response) {
      const responseData = await response.json();
      console.log('response status = ', response.status);
      console.log('responseData = ', responseData);

      if (response.status === 200) {
        if (responseData && responseData.result) {
          const usersId = responseData.result.user.users_id;
          localStorage.setItem('usersId', usersId);

          const email = responseData.result.user.email;
          localStorage.setItem('email', email);

          const token = responseData.result.token;
          localStorage.setItem('token', token);
        }

        setSnackBarStatus(true);
        setSnackBarType('success');
        setSnackBarMessage('Login success');

        setTimeout(() => {
          router.push(`/`);
        }, 1000);
      } else {
        setSnackBarStatus(true);
        setSnackBarType('error');
        setSnackBarMessage('Login error');
      }
    }
  };

  const handleCloseSnackBar = () => {
    setSnackBarStatus(false);
  };

  const handleForgotPasswordClick = () => {
    router.push(`/forgot-password`);
  };

  const handleCreateYourAccountClick = () => {
    router.push(`/signup`);
  };

  const handleBackClick = () => {
    router.push(`/`);
  };

  return (
    <div style={{ margin: '5em auto' }}>
      <Head>
        <title>CodersMojo</title>
        <link rel="shortcut icon" href="/favicon.png" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className="container">
        <Card className={classes.root} variant="outlined">
          <div className="row">
            <div className="col-sm p-3">
              <div className="d-flex justify-content-center">
                <img src="/login-image.jpg" width="500" height="500" alt="" />
              </div>
            </div>
            <div className="col-sm p-3">
              <h4 className="text-center mb-5 font-weight-bold">Member Login</h4>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={(e) => handleEmailInputChange(e)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  onChange={(e) => handlePasswordInputChange(e)}
                />
              </div>
              <button
                type="submit"
                className="btn btn-success btn-lg w-100 my-3"
                onClick={() => handleLoginButtonClick(email, password)}
              >
                Login
              </button>
              <div className="d-flex justify-content-center my-3">
                <span className="pointer hover-item" onClick={() => handleForgotPasswordClick()}>
                  Forgot Password?
                </span>
              </div>
              <div className="d-flex justify-content-center" style={{ marginTop: '5em' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span className="pointer hover-item" onClick={() => handleCreateYourAccountClick()}>
                    Create your account &rarr;
                  </span>
                  <div className="d-flex justify-content-center my-3">
                    <span className="pointer hover-item" onClick={() => handleBackClick()}>
                      Back
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <CustomSnackBar
        snackBarStatus={snackBarStatus}
        snackBarType={snackBarType}
        snackBarMessage={snackBarMessage}
        closeSnackBar={() => handleCloseSnackBar()}
      />
    </div>
  );
}

export default Login;
