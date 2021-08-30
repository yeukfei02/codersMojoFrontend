import React from 'react';
import { useRouter } from 'next/router';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import NextHead from '../nextHead/NextHead';

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

function Pricing(): JSX.Element {
  const router = useRouter();

  const handleFindANewJobClick = () => {
    router.push(`/login`);
  };

  const handleInviteYourFriendsClick = () => {
    router.push(`/login`);
  };

  const handleSubscribeButtonClick = () => {
    console.log(123);
  };

  const handleLoginOrSignupClick = () => {
    router.push(`/login`);
  };

  return (
    <MuiThemeProvider theme={theme}>
      <div>
        <NextHead />

        <nav className="navbar navbar-expand-lg navbar-light">
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
              <div onClick={() => handleFindANewJobClick()} className="mx-3 pointer hover-item">
                Find a New Job
              </div>
              <div onClick={() => handleInviteYourFriendsClick()} className="mx-3 pointer hover-item">
                Invite Your Friends
              </div>
              <div onClick={() => handleLoginOrSignupClick()} className="mx-3 pointer hover-item">
                Login/Signup
              </div>
            </form>
          </div>
        </nav>

        <div className="my-3" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="d-flex justify-content-center mb-5" style={{ fontSize: 25 }}>
            Get started with a Eduwingly subscription that works for you.
          </div>

          <div className="row mx-5">
            <div className="col-sm d-flex justify-content-center align-items-stretch">
              <div className="card" style={{ width: 450, height: 350 }}>
                <div className="card-header" style={{ backgroundColor: '#eaeff5', color: 'black' }}>
                  <div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                      <div style={{ fontSize: 35 }}>Monthly</div>
                      <div className="d-flex align-items-center">$19.99/month</div>
                    </div>
                    <div className="my-1">Subscription</div>
                  </div>
                </div>
                <div className="card-body">
                  <h5 className="card-title">Down from $29.99/month</h5>
                  <p className="card-text">
                    Our monthly plan grants access to <b>all premium features</b>, the best plan for short-term
                    subscribers.
                  </p>
                  <p className="card-text" style={{ fontSize: 13, color: 'gray' }}>
                    (prices are marked in USD)
                  </p>
                </div>
                <div className="card-footer mb-2" style={{ borderTop: 'none', backgroundColor: 'transparent' }}>
                  <Button variant="contained" color="primary" onClick={() => handleSubscribeButtonClick()}>
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
            <div className="col-sm d-flex justify-content-center align-items-stretch">
              <div className="card" style={{ width: 450, height: 350 }}>
                <div className="card-header" style={{ backgroundColor: '#6f42c1', color: 'white' }}>
                  <div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                      <div style={{ fontSize: 35 }}>Yearly</div>
                      <div className="d-flex align-items-center">$119.99/yr</div>
                    </div>
                    <div className="my-1">Subscription</div>
                  </div>
                </div>
                <div className="card-body">
                  <p className="card-text">
                    This plan <b>saves you over 50%</b> in comparison to the monthly plan.
                  </p>
                  <p className="card-text" style={{ fontSize: 13, color: 'gray' }}>
                    (prices are marked in USD)
                  </p>
                </div>
                <div className="card-footer mb-2" style={{ borderTop: 'none', backgroundColor: 'transparent' }}>
                  <Button variant="contained" color="secondary" onClick={() => handleSubscribeButtonClick()}>
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MuiThemeProvider>
  );
}

export default Pricing;
