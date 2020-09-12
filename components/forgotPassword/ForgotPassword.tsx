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

function ForgotPassword(): JSX.Element {
  const classes = useStyles();
  const router = useRouter();

  const [email, setEmail] = useState('');

  const [snackBarStatus, setSnackBarStatus] = useState(false);
  const [snackBarType, setSnackBarType] = useState('success');
  const [snackBarMessage, setSnackBarMessage] = useState('');

  const handleEmailInputChange = (e: any) => {
    if (e.target.value) {
      setEmail(e.target.value);
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
    const response = await fetch(`/api/user/forgot-password`, {
      method: 'POST',
      body: JSON.stringify({ email: email }),
    });
    if (response) {
      const responseData = await response.json();
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
    <div style={{ margin: '5em auto' }}>
      <Head>
        <title>CodersMojo</title>
        <link rel="shortcut icon" href="/favicon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      </Head>

      <div className="container d-flex justify-content-center">
        <Card className={classes.root} variant="outlined">
          <div className="d-flex justify-content-center">
            <img src="/logo_transparent.png" width="180" height="180" alt="" loading="lazy" />
          </div>

          <h4 className="text-center mt-3 mb-5 font-weight-bold">Forgot Password</h4>

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
          <button
            type="submit"
            className="btn btn-success btn-lg w-100 my-3"
            onClick={() => handleSubmitButtonClick(email)}
          >
            Submit
          </button>

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
  );
}

export default ForgotPassword;
