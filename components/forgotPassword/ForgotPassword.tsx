import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { makeStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import axios from 'axios';

import NextHead from '../nextHead/NextHead';
import CustomSnackBar from '../customSnackBar/CustomSnackBar';
import { validateEmail } from '../../common/common';

import { getRootUrl } from '../../common/common';

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
    width: 600,
    padding: 35,
  },
});

function ForgotPassword(): JSX.Element {
  const classes = useStyles();
  const router = useRouter();

  const [email, setEmail] = useState('');

  const [snackBarStatus, setSnackBarStatus] = useState(false);
  const [snackBarType, setSnackBarType] = useState('success');
  const [snackBarMessage, setSnackBarMessage] = useState('');

  const handleEmailInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setEmail(e.target.value);
    }
  };

  const handleOnKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (email) {
        handleSubmitButtonClick(email);
      } else {
        setSnackBarStatus(true);
        setSnackBarType('error');
        setSnackBarMessage('Please enter email');
      }
    }
  };

  const handleSubmitButtonClick = (email: string) => {
    if (email) {
      const isEmail = validateEmail(email);
      if (isEmail) {
        forgotPassword(email);
      } else {
        setSnackBarStatus(true);
        setSnackBarType('error');
        setSnackBarMessage('Wrong email format');
      }
    }
  };

  const forgotPassword = async (email: string) => {
    const response = await axios.post(`${ROOT_URL}/user/forgot-password`, {
      email: email,
    });
    if (response) {
      const responseData = response.data;
      console.log('response status = ', response.status);
      console.log('responseData = ', responseData);

      if (response.status === 200) {
        setSnackBarStatus(true);
        setSnackBarType('success');
        setSnackBarMessage('forgot password success');
      } else {
        setSnackBarStatus(true);
        setSnackBarType('error');
        setSnackBarMessage('forgot password error');
      }
    }
  };

  const handleCloseSnackBar = () => {
    setSnackBarStatus(false);
  };

  const handleBackClick = () => {
    router.push(`/login`);
  };

  return (
    <MuiThemeProvider theme={theme}>
      <div style={{ margin: '5em auto' }}>
        <NextHead />

        <div className="container d-flex justify-content-center">
          <Card className={classes.root} variant="outlined">
            <div className="my-2 d-flex justify-content-center">
              <img src="/logo.png" width="200" height="65" alt="" loading="lazy" />
            </div>

            <h4 className="text-center my-5 font-weight-bold">Forgot Password</h4>

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
            <Button
              className="w-100 my-3"
              variant="contained"
              color="secondary"
              onClick={() => handleSubmitButtonClick(email)}
            >
              Submit
            </Button>

            <div className="d-flex justify-content-center mt-5">
              <span className="pointer hover-item" onClick={() => handleBackClick()}>
                Back
              </span>
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

export default ForgotPassword;
