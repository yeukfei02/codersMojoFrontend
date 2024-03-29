import React, { useState } from 'react';
import { useRouter } from 'next/router';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import YouTubeIcon from '@material-ui/icons/YouTube';
import { pink, blue, red } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import axios from 'axios';

import NextHead from '../nextHead/NextHead';
import CustomSnackBar from '../customSnackBar/CustomSnackBar';
import { validateEmail, getRootUrl } from '../../common/common';

const ROOT_URL = getRootUrl();

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

  const handleBecomeAProjectMentorClick = () => {
    window.open(`https://docs.google.com/forms/d/e/1FAIpQLSfYwWOUWDMidNSejVKu_et0kbBhZszMZsA23k_BegBOnfk1Qw/viewform`);
  };

  // const handlePricingClick = () => {
  //   router.push(`/pricing`);
  // };

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
    const response = await axios.post(`${ROOT_URL}/mailchimp/add-contact-to-audience`, {
      email: email,
    });
    if (response) {
      const responseData = response.data;
      console.log('response status = ', response.status);
      console.log('responseData = ', responseData);

      if (response.status === 201) {
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
    window.open('https://www.instagram.com/eduwingly');
  };

  const handleTwitterClick = () => {
    window.open('https://twitter.com/eduwingly');
  };

  const handleYoutubeClick = () => {
    window.open('https://www.youtube.com/channel/UCgz0D7C3yuueyeNxTLXWF9Q');
  };

  return (
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
            <div onClick={() => handleTechBlogClick()} className="mx-3 pointer hover-item">
              Blogly - The learning Tree
            </div>
            <div onClick={() => handleBecomeAProjectMentorClick()} className="mx-3 pointer hover-item">
              Become a Project Mentor
            </div>
            {/* <div onClick={() => handlePricingClick()} className="mx-3 pointer hover-item">
              Pricing
            </div> */}
            <div onClick={() => handleLoginOrSignupClick()} className="mx-3 pointer hover-item">
              Login/Signup
            </div>
          </form>
        </div>
      </nav>

      <div style={{ margin: '3em' }}>
        <div className="my-5">
          <div className="text-center font-weight-bold quantico display-4" style={{ color: '#28ACEA' }}>
            {weAreLaunchingSoonText}
          </div>
        </div>

        <div className="row">
          <div className="col-sm d-flex align-items-stretch">
            <div className="card p-2">
              <div className="card-body">
                <h5>For Students</h5>

                <div className="my-4">
                  <div>- Live Classes : Build Tech Projects ( based on skill) with Project Instructors</div>
                  <div>- Share/Upload your work/project</div>
                  <div>- Write Tech articles and get Paid</div>
                  <div>- Practice Coding on Codersmojo</div>
                  <div>- Join Global Tech Commmunity based on skill</div>
                  <div>- Participate in Hackathons</div>
                  <div>- Earn certifications</div>
                  <div>- Connect with Tech Companies</div>
                  <div>- Share your profile</div>
                  <div>- Q&A Community</div>
                </div>
              </div>
              <div className="card-footer" style={{ borderTop: 'none', backgroundColor: 'transparent' }}>
                <div className="d-flex justify-content-end">
                  <Button variant="contained" color="secondary" onClick={() => handleLearnMoreButtonClick()}>
                    Learn more
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm d-flex align-items-stretch">
            <div className="card p-2">
              <div className="card-body">
                <h5>For Instructors</h5>

                <div className="my-4">
                  <div>- Deliver live project classes and Earn money</div>
                  <div>- Mentor the group</div>
                  <div>- Refer the well performing students</div>
                  <div>- Teach Anyone, Anywhere, Anything, Anytime </div>
                  <div>- Share Tips and Techniques( Coding Interviews)</div>
                  <div>- Help in Resume Building</div>
                  <div>- Connect with other Instructors</div>
                  <div>- Q & A community</div>
                </div>
              </div>
              <div className="card-footer" style={{ borderTop: 'none', backgroundColor: 'transparent' }}>
                <div className="d-flex justify-content-end">
                  <Button variant="contained" color="secondary" onClick={() => handleLearnMoreButtonClick()}>
                    Learn more
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm d-flex align-items-stretch">
            <div className="card p-2">
              <div className="card-body">
                <h5>For Recruiters and Tech Companies</h5>

                <div className="my-4">
                  <div>- Directly connect with Students based on the built projects/hackathons</div>
                  <div>- Create Company Profile</div>
                  <div>- Conduct Recruitment drives/Tech Events Online</div>
                  <div>- Launch Targetted Courses</div>
                  <div>- Directly connect with Instructors</div>
                  <div>- Hire through Eduwingly</div>
                  <div>
                    - Host virtual hackathons and bring together people with diverse skills and solve business
                    challenges
                  </div>
                </div>
              </div>
              <div className="card-footer" style={{ borderTop: 'none', backgroundColor: 'transparent' }}>
                <div className="d-flex justify-content-end">
                  <Button variant="contained" color="secondary" onClick={() => handleLearnMoreButtonClick()}>
                    Learn more
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm">
            <div>
              <img src="/landing-page-image.png" style={{ width: '100%', borderRadius: '0.5em' }} alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center" style={{ marginTop: '5em' }}>
        <div>Let’s build great things together. Subscribe / Join us for updates</div>
      </div>

      <div className="d-flex justify-content-center" style={{ marginTop: '1em' }}>
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

      <div className="d-flex justify-content-center" style={{ marginTop: '8em' }}>
        <span>Partner :</span>
      </div>

      <div className="d-flex justify-content-center" style={{ marginTop: '2em' }}>
        <div className="d-flex align-items-center" style={{ display: 'flex', flexDirection: 'row' }}>
          <div className="mx-3">
            <img className="img-fluid" src="/partner.png" width="280" height="120" alt="" loading="lazy" />
          </div>
          <div className="mx-3">
            <img className="img-fluid" src="/partner2.png" width="280" height="120" alt="" loading="lazy" />
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center" style={{ marginTop: '2em' }}>
        <div className="d-flex align-items-center" style={{ display: 'flex', flexDirection: 'row' }}>
          <div className="mx-3">
            <img className="img-fluid" src="/partner3.png" width="280" height="120" alt="" loading="lazy" />
          </div>
          <div className="mx-3">
            <img className="img-fluid" src="/partner4.png" width="280" height="120" alt="" loading="lazy" />
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center" style={{ marginTop: '3em' }}>
        <span>Start Up Contest Runner Ups and conferences :</span>
      </div>

      <div className="d-flex justify-content-center" style={{ marginTop: '2em' }}>
        <div className="d-flex align-items-center" style={{ display: 'flex', flexDirection: 'row' }}>
          <div className="mx-2">
            <img
              className="img-fluid"
              src="/start-up-contest-runner-ups.png"
              width="350"
              height="80"
              alt=""
              loading="lazy"
            />
          </div>
          <div className="mx-2">
            <img className="img-fluid" src="/wild-digital.png" width="280" height="80" alt="" loading="lazy" />
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center" style={{ marginTop: '2em' }}>
        <div className="d-flex align-items-center" style={{ display: 'flex', flexDirection: 'row' }}>
          <div className="mx-2">
            <img className="img-fluid" src="/startup-summit.png" width="330" height="80" alt="" loading="lazy" />
          </div>
          <div className="mx-2">
            <img
              className="img-fluid"
              src="/google-cloud-for-startup.png"
              width="330"
              height="80"
              alt=""
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center" style={{ marginTop: '2em' }}>
        <div className="d-flex align-items-center" style={{ display: 'flex', flexDirection: 'row' }}>
          <div className="mx-2">
            <img className="img-fluid" src="/africa-tech-festival.png" width="330" height="80" alt="" loading="lazy" />
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center" style={{ marginTop: '3em' }}>
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
