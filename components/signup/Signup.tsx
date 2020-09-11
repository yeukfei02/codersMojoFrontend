import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import CustomSnackBar from '../customSnackBar/CustomSnackBar';
import { validateEmail } from '../../common/common';

const useStyles = makeStyles({
  root: {
    width: 600,
    padding: 35,
  },
});

function Signup(): JSX.Element {
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

  const handleSignupButtonClick = (email: string, password: string) => {
    if (email && password) {
      const isEmail = validateEmail(email);
      if (isEmail) {
        signup(email, password);
      } else {
        setSnackBarStatus(true);
        setSnackBarType('error');
        setSnackBarMessage('Wrong email format');
      }
    }
  };

  const signup = async (email: string, password: string) => {
    const response = await fetch(`/api/user/signup`, {
      method: 'POST',
      body: JSON.stringify({ email: email, password: password }),
    });
    if (response) {
      const responseData = await response.json();
      console.log('response status = ', response.status);
      console.log('responseData = ', responseData);

      if (response.status === 200) {
        setSnackBarStatus(true);
        setSnackBarType('success');
        setSnackBarMessage('create account success');

        setTimeout(() => {
          router.push(`/login`);
        }, 1000);
      } else {
        setSnackBarStatus(true);
        setSnackBarType('error');
        setSnackBarMessage('create account error');
      }
    }
  };

  const handleCloseSnackBar = () => {
    setSnackBarStatus(false);
  };

  const handleAlreadyHaveAnAccountClick = () => {
    router.push(`/login`);
  };

  return (
    <div style={{ margin: '5em auto' }}>
      <Head>
        <title>CodersMojo</title>
        <link rel="shortcut icon" href="/favicon.png" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className="container d-flex justify-content-center">
        <Card className={classes.root} variant="outlined">
          <h4 className="text-center mb-5 font-weight-bold">Create Account</h4>
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
            onClick={() => handleSignupButtonClick(email, password)}
          >
            Signup
          </button>
          <div className="d-flex justify-content-center mt-5">
            <span className="pointer hover-item" onClick={() => handleAlreadyHaveAnAccountClick()}>
              Already have an account? Login here
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
  );
}

export default Signup;
