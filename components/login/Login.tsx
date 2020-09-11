import React, { useState } from 'react';
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

  return (
    <div style={{ margin: '5em 3em' }}>
      <Card className={classes.root} variant="outlined">
        <div className="row">
          <div className="col-sm p-5">
            <div className="d-flex justify-content-center">
              <img src="/login-image.jpg" width="500" height="500" alt="" />
            </div>
          </div>
          <div className="col-sm p-5">
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
              className="btn btn-success w-100 my-3"
              onClick={() => handleLoginButtonClick(email, password)}
            >
              Login
            </button>
            <div className="d-flex justify-content-center my-3">
              <span className="pointer hover-item" onClick={() => handleForgotPasswordClick()}>
                Forgot Password?
              </span>
            </div>
            <div className="d-flex justify-content-center" style={{ marginTop: '7em' }}>
              <span className="pointer hover-item" onClick={() => handleCreateYourAccountClick()}>
                Create your account &rarr;
              </span>
            </div>
          </div>
        </div>
      </Card>

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
