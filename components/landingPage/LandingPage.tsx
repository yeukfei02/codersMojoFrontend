import React, { useState } from 'react';
import { useRouter } from 'next/router';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import YouTubeIcon from '@material-ui/icons/YouTube';
import { pink, blue, red } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';

import NextHead from '../nextHead/NextHead';
import CustomSnackBar from '../customSnackBar/CustomSnackBar';
import { validateEmail } from '../../common/common';

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

  const handleEmailInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setEmail(e.target.value);
    }
  };

  const handleLearnMoreButtonClick = () => {
    console.log(123);
  };

  const handleSubscribeButtonClick = () => {
    if (email) {
      const isEmail = validateEmail(email);
      if (isEmail) {
        subscribeContactInMailchimp(email);
      } else {
        setSnackBarStatus(true);
        setSnackBarType('error');
        setSnackBarMessage('Wrong email format');
      }
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

  const handleFacebookClick = () => {
    window.open('https://www.google.com.hk');
  };

  const handleInstagramClick = () => {
    window.open('https://www.instagram.com/codersmojo');
  };

  const handleTwitterClick = () => {
    window.open('https://twitter.com/CodersMojo');
  };

  const handleYoutubeClick = () => {
    window.open('https://www.youtube.com/channel/UCgz0D7C3yuueyeNxTLXWF9Q');
  };

  return (
    <div>
      <NextHead />

      <div className="text-center font-weight-bold">Student Tech Ambassdor Applications are now open. Apply here</div>

      <nav className="my-3 navbar navbar-expand-lg navbar-light">
        <a className="navbar-brand" href="/">
          <img src="/logo.png" width="200" height="65" alt="" loading="lazy" />
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
            <div onClick={() => handleTechBlogClick()} className="mx-3 pointer hover-item">
              Tech Blog
            </div>
            <div onClick={() => handleBecomeAStudentTechAmbassadorClick()} className="mx-3 pointer hover-item">
              Become a Student Tech Ambassador
            </div>
            <div onClick={() => handleLoginOrSignupClick()} className="mx-3 pointer hover-item">
              Login/Signup
            </div>
          </form>
        </div>
      </nav>

      <div style={{ margin: '2em 4em' }}>
        <div className="row">
          <div className="col-sm-8 d-flex justify-content-center">
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h4 className="text-center font-weight-bold my-3">
                CodersMojo is an AI-based Peer-to-Peer Interactive Tech Interview Platform for Women
              </h4>

              <div className="text-center font-weight-bold quantico display-4" style={{ color: '#28ACEA' }}>
                {weAreLaunchingSoonText}
              </div>

              <div className="my-4" style={{ display: 'flex', flexDirection: 'row' }}>
                <div className="row">
                  <div className="col-sm-4">
                    <div className="card p-3">
                      <div className="card-body">
                        <h5>For Developers</h5>

                        <h6 className="my-4">Community</h6>
                        <div className="my-3">
                          Practice programming, prepare for interviews, and level up your coding skills with a community
                          of 4M+ developers
                        </div>
                        <Button
                          className="my-3"
                          variant="contained"
                          color="secondary"
                          onClick={() => handleLearnMoreButtonClick()}
                        >
                          Learn more
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-8">
                    <div className="card p-3">
                      <div className="card-body">
                        <h5>For Businesses</h5>

                        <div className="row">
                          <div className="col-sm">
                            <h6 className="my-4">Assessments</h6>
                            <div className="my-3">
                              Remotely assess, interview, and hire developers across all roles based on skills and
                              nothing else
                            </div>
                            <Button
                              className="my-3"
                              variant="contained"
                              color="secondary"
                              onClick={() => handleLearnMoreButtonClick()}
                            >
                              Learn more
                            </Button>
                          </div>
                          <div className="col-sm">
                            <h6 className="my-4">Hackathons</h6>
                            <div className="my-3">
                              Host virtual hackathons and bring together people with diverse skills and solve business
                              challenges
                            </div>
                            <Button
                              className="my-3"
                              variant="contained"
                              color="secondary"
                              onClick={() => handleLearnMoreButtonClick()}
                            >
                              Learn more
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-4 d-flex justify-content-center align-items-center">
            <img src="/landing-page-image.jpg" style={{ width: '100%', borderRadius: '0.5em' }} alt="" />
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center" style={{ marginTop: '3em' }}>
        <div className="w-50">
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
        <Button variant="contained" color="secondary" onClick={() => handleSubscribeButtonClick()}>
          Subscribe
        </Button>
      </div>

      <div className="d-flex justify-content-center" style={{ marginTop: '5em' }}>
        <div className="mb-3" style={{ display: 'flex', flexDirection: 'row' }}>
          <span>Follow us :</span>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <FacebookIcon
              className="mx-2 pointer"
              style={{ fontSize: 25, color: blue[700] }}
              onClick={() => handleFacebookClick()}
            />
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
            <YouTubeIcon
              className="mx-2 pointer"
              style={{ fontSize: 25, color: red[500] }}
              onClick={() => handleYoutubeClick()}
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
