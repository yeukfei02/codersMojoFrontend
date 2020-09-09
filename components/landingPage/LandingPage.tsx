import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter, faMedium } from '@fortawesome/free-brands-svg-icons';

function LandingPage(): JSX.Element {
  const [email, setEmail] = useState('');

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
    console.log('email = ', email);
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
        <div className="form-group w-50">
          <input
            type="text"
            className="form-control"
            id=""
            placeholder="Email"
            onChange={(e) => handleEmailInputChange(e)}
          />
        </div>
      </div>

      <div className="my-3 d-flex justify-content-center">
        <button type="button" className="btn btn-primary btn-lg" onClick={() => handleSubscribeButtonClick()}>
          Subscribe
        </button>
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
    </div>
  );
}

export default LandingPage;
