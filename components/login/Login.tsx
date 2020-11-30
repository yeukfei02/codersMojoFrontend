import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { makeStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import axios from 'axios';

import NextHead from '../nextHead/NextHead';
import CustomSnackBar from '../customSnackBar/CustomSnackBar';
import { validateEmail, getRootUrl } from '../../common/common';

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

  const handleEmailInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setEmail(e.target.value);
    }
  };

  const handlePasswordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setPassword(e.target.value);
    }
  };

  const handleOnKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (email && password) {
        handleLoginButtonClick(email, password);
      } else {
        setSnackBarStatus(true);
        setSnackBarType('error');
        setSnackBarMessage('Please enter email and password');
      }
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

  const handleSignInAsUniversityStudentButtonClick = (email: string, password: string) => {
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
    const response = await axios.post(`${ROOT_URL}/user/login`, {
      email: email,
      password: password,
    });
    if (response) {
      const responseData = response.data;
      console.log('response status = ', response.status);
      console.log('responseData = ', responseData);

      if (response.status === 200) {
        if (responseData) {
          const usersId = responseData.user.users_id;
          localStorage.setItem('usersId', usersId);

          const firstName = responseData.user.firstName;
          localStorage.setItem('firstName', firstName);

          const lastName = responseData.user.lastName;
          localStorage.setItem('lastName', lastName);

          const email = responseData.user.email;
          localStorage.setItem('email', email);

          const token = responseData.token;
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
    <MuiThemeProvider theme={theme}>
      <div style={{ margin: '5em auto' }}>
        <NextHead />

        <div className="container">
          <Card className={classes.root} variant="outlined">
            <div className="row">
              <div className="col-sm p-3">
                <div className="d-flex justify-content-center">
                  <img src="/login-image.jpg" style={{ width: '100%' }} alt="" />
                </div>
              </div>
              <div className="col-sm p-3">
                <h4 className="text-center mb-5 font-weight-bold">Welcome to Coders Mojo</h4>

                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    onChange={(e) => handleEmailInputChange(e)}
                    onKeyUp={(e) => handleOnKeyUp(e)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    onChange={(e) => handlePasswordInputChange(e)}
                    onKeyUp={(e) => handleOnKeyUp(e)}
                  />
                </div>

                <div className="d-flex justify-content-center">
                  <Button
                    className="w-100 my-3"
                    variant="contained"
                    color="secondary"
                    onClick={() => handleLoginButtonClick(email, password)}
                  >
                    Login
                  </Button>
                </div>

                <div className="d-flex justify-content-center my-3">
                  <span className="pointer hover-item" onClick={() => handleForgotPasswordClick()}>
                    Forgot Password?
                  </span>
                </div>

                <hr />

                <div className="d-flex justify-content-center my-3">
                  <span
                    className="pointer hover-item"
                    style={{ color: '#2b9093' }}
                    onClick={() => handleSignInAsUniversityStudentButtonClick(email, password)}
                  >
                    Sign in as University Student
                  </span>
                </div>

                <div className="d-flex justify-content-center" style={{ marginTop: '5em' }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span className="pointer hover-item" onClick={() => handleCreateYourAccountClick()}>
                      Don’t have an account? Sign up
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
    </MuiThemeProvider>
  );
}

export default Login;
