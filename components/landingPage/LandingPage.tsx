import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter, faMedium } from '@fortawesome/free-brands-svg-icons';

import CustomSnackBar from '../customSnackBar/CustomSnackBar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }),
);

function LandingPage(): JSX.Element {
  const classes = useStyles();

  const [email, setEmail] = useState('');

  const [snackBarStatus, setSnackBarStatus] = useState(false);
  const [snackBarType, setSnackBarType] = useState('success');
  const [snackBarMessage, setSnackBarMessage] = useState('');

  const weAreLaunchingSoonText = `<We are Launching Soon>`;

  const handleTechBlogClick = () => {
    window.open('https://www.google.com.hk');
  };

  const handleBecomeAStudentTechAmbassadorClick = () => {
    window.open(`https://forms.gle/gCJGap2dpENuwhYi8`);
  };

  const handleEmailInputChange = (e: any) => {
    if (e.target.value) {
      setEmail(e.target.value);
    }
  };

  const handleSubscribeButtonClick = () => {
    if (email) {
      subscribeContactInMailchimp(email);
    }
  };

  const subscribeContactInMailchimp = async (email: string) => {
    const response = await fetch('/api/mailchimp/add-contact-to-audience', {
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
        setSnackBarMessage('Already subscribe');
      } else {
        setSnackBarStatus(true);
        setSnackBarType('error');
        setSnackBarMessage('Subscribe error');
      }
    }
  };

  const handleCloseSnackBar = () => {
    setSnackBarStatus(false);
  };

  const handleInstagramClick = () => {
    window.open('https://www.instagram.com/codersmojo');
  };

  const handleTwitterClick = () => {
    window.open('https://www.google.com.hk');
  };

  const handleMediumClick = () => {
    window.open('https://www.google.com.hk');
  };

  return (
    <div>
      <div className="text-center">Student Tech Ambassdor Applications are now open. Apply here</div>

      <nav className="navbar navbar-light mx-5 my-3">
        <a className="navbar-brand" href="#">
          <img src="https://reactnative.dev/img/tiny_logo.png" width="80" height="80" alt="" loading="lazy" />
        </a>
        <div className="d-flex justify-content-end">
          <div onClick={() => handleTechBlogClick()} className="mx-5 pointer">
            Tech Blog
          </div>
          <div onClick={() => handleBecomeAStudentTechAmbassadorClick()} className="pointer">
            Become a Student Tech Ambassador
          </div>
        </div>
      </nav>

      <h3 className="text-center font-weight-bold" style={{ marginTop: '3em' }}>
        CodersMojo is an AI-based Peer-to-Peer Interactive Tech Interview Platform for Women
      </h3>

      <h1 className="text-center font-weight-bold weAreLaunchingSoonText" style={{ marginTop: '2em' }}>
        {weAreLaunchingSoonText}
      </h1>

      <div className="text-center font-weight-bold" style={{ marginTop: '5em' }}>
        Girls, let’s break the tech glass ceiling. Subscribe / Join us for updates
      </div>

      <div className="mt-5 d-flex justify-content-center">
        <TextField
          id=""
          className={classes.root}
          style={{ width: '50%' }}
          label="Email"
          placeholder="Email"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          variant="filled"
          onChange={(e) => handleEmailInputChange(e)}
        />
      </div>

      <div className="my-3 d-flex justify-content-center">
        <Button variant="contained" color="primary" size="large" onClick={() => handleSubscribeButtonClick()}>
          Subscribe
        </Button>
      </div>

      <h5
        className="d-flex justify-content-center"
        style={{ position: 'absolute', bottom: 0, display: 'block', width: '100%' }}
      >
        Follow us :{' '}
        <FontAwesomeIcon icon={faInstagram} className="mx-2 pointer" onClick={() => handleInstagramClick()} />{' '}
        <FontAwesomeIcon icon={faTwitter} className="mx-2 pointer" onClick={() => handleTwitterClick()} />{' '}
        <FontAwesomeIcon icon={faMedium} className="mx-2 pointer" onClick={() => handleMediumClick()} />
      </h5>

      <CustomSnackBar
        snackBarStatus={snackBarStatus}
        snackBarType={snackBarType}
        snackBarMessage={snackBarMessage}
        closeSnackBar={() => handleCloseSnackBar()}
      />
    </div>
  );
}

export default LandingPage;
