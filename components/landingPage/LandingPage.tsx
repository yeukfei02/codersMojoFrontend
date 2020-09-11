import React, { useState } from 'react';
import { useRouter } from 'next/router';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import { pink, blue } from '@material-ui/core/colors';

import CustomSnackBar from '../customSnackBar/CustomSnackBar';

function LandingPage(): JSX.Element {
  const router = useRouter();

  const [email, setEmail] = useState('');

  const [snackBarStatus, setSnackBarStatus] = useState(false);
  const [snackBarType, setSnackBarType] = useState('success');
  const [snackBarMessage, setSnackBarMessage] = useState('');

  const weAreLaunchingSoonText = `<We are Launching Soon>`;

  const handleTechBlogClick = () => {
    router.push(`/tech-blog`);
  };

  const handleBecomeAStudentTechAmbassadorClick = () => {
    window.open(`https://forms.gle/gCJGap2dpENuwhYi8`);
  };

  const handleLoginOrSignupClick = () => {
    router.push(`/login`);
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

  return (
    <div className="landing-page">
      <div className="text-center">
        <span style={{ background: 'lightblue' }}>Student Tech Ambassdor Applications are now open. Apply here</span>
      </div>

      <nav className="navbar navbar-expand-lg navbar-light mx-3 my-3">
        <a className="navbar-brand" href="/">
          <img src="/logo_transparent.png" width="150" height="150" alt="" loading="lazy" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto"></ul>
          <form className="form-inline my-2 my-lg-0">
            <div className="d-flex justify-content-end">
              <div onClick={() => handleTechBlogClick()} className="mx-5 pointer header-item">
                <small>Tech Blog</small>
              </div>
              <div onClick={() => handleBecomeAStudentTechAmbassadorClick()} className="pointer header-item">
                <span style={{ background: 'lightblue' }}>
                  <small>Become a Student Tech Ambassador</small>
                </span>
              </div>
              <div onClick={() => handleLoginOrSignupClick()} className="mx-5 pointer header-item">
                <small>Login/Signup</small>
              </div>
            </div>
          </form>
        </div>
      </nav>

      <div style={{ margin: '2em 0' }}>
        <h4 className="text-center font-weight-bold">
          CodersMojo is an AI-based Peer-to-Peer Interactive Tech Interview Platform for Women
        </h4>
      </div>

      <div style={{ margin: '4em 0' }}>
        <h1 className="text-center font-weight-bold quantico display-3">{weAreLaunchingSoonText}</h1>
      </div>

      <div className="text-center font-weight-bold" style={{ margin: '1em 0' }}>
        Girls, let’s break the tech glass ceiling.
      </div>

      <div className="text-center font-weight-bold" style={{ margin: '1em 0' }}>
        Subscribe / Join us for updates
      </div>

      <div className="d-flex justify-content-center" style={{ marginTop: '3em' }}>
        <div className="w-25">
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Email"
              aria-describedby="emailHelp"
              onChange={(e) => handleEmailInputChange(e)}
            />
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center" style={{ marginTop: '2em' }}>
        <button type="submit" className="btn btn-primary" onClick={() => handleSubscribeButtonClick()}>
          Subscribe
        </button>
      </div>

      <div className="d-flex justify-content-center" style={{ position: 'fixed', bottom: 0, width: '100%' }}>
        <div className="mb-3" style={{ display: 'flex', flexDirection: 'row' }}>
          <span>Follow us :</span>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <InstagramIcon
              className="mx-2 pointer"
              style={{ fontSize: 25, color: pink[500] }}
              onClick={() => handleInstagramClick()}
            />
            <TwitterIcon
              className="mx-2 pointer"
              style={{ fontSize: 25, color: blue[500] }}
              onClick={() => handleTwitterClick()}
            />
          </div>
        </div>
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

export default LandingPage;
