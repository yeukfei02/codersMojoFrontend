import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Twitter, Linkedin, Facebook } from 'react-social-sharing';
import axios from 'axios';

import NextHead from '../nextHead/NextHead';
import CustomSnackBar from '../customSnackBar/CustomSnackBar';
import { validateEmail } from '../../common/common';

import { getRootUrl } from '../../common/common';

const ROOT_URL = getRootUrl();

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
    },
  }),
);

function InviteYourFriends(): JSX.Element {
  const classes = useStyles();

  const [inviteYourFriendsEmail, setInviteYourFriendsEmail] = useState('');
  const [inviteLink, setInviteLink] = useState('');

  const [snackBarStatus, setSnackBarStatus] = useState(false);
  const [snackBarType, setSnackBarType] = useState('success');
  const [snackBarMessage, setSnackBarMessage] = useState('');

  useEffect(() => {
    getInviteLink();
  }, []);

  const getInviteLink = async () => {
    const token = localStorage.getItem('token');
    const usersId = localStorage.getItem('usersId');

    if (token && usersId) {
      const response = await axios.get(`${ROOT_URL}/invite-friends/get-share-your-invite-link/${usersId}`, {
        params: {
          hostname: window.location.href,
        },
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response) {
        const responseData = response.data;
        console.log('response.status = ', response.status);
        console.log('responseData = ', responseData);

        setInviteLink(responseData.inviteLink);
      }
    }
  };

  const handleInviteYourFriendsEmailInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setInviteYourFriendsEmail(e.target.value);
    }
  };

  const handleSendButtonClick = (inviteYourFriendsEmail: string) => {
    if (inviteYourFriendsEmail) {
      const isEmail = validateEmail(inviteYourFriendsEmail);
      if (isEmail) {
        const usersId = localStorage.getItem('usersId');
        const token = localStorage.getItem('token');
        if (usersId && token) sendInviteFriendsEmail(inviteYourFriendsEmail, usersId, token);
      } else {
        setSnackBarStatus(true);
        setSnackBarType('error');
        setSnackBarMessage('Wrong email format');
      }
    }
  };

  const sendInviteFriendsEmail = async (inviteYourFriendsEmail: string, usersId: string, token: string) => {
    const response = await axios.post(
      `${ROOT_URL}/invite-friends`,
      {
        email: inviteYourFriendsEmail,
        users_id: usersId,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    if (response) {
      const responseData = response.data;
      console.log('response.status = ', response.status);
      console.log('responseData = ', responseData);

      if (response.status === 200) {
        setSnackBarStatus(true);
        setSnackBarType('success');
        setSnackBarMessage('Invite your friends success');
      } else {
        setSnackBarStatus(true);
        setSnackBarType('error');
        setSnackBarMessage('Invite your friends error');
      }
    }
  };

  const handleCopyButtonClick = (inviteLink: string) => {
    if (inviteLink) navigator.clipboard.writeText(inviteLink);
  };

  const handleCloseSnackBar = () => {
    setSnackBarStatus(false);
  };

  return (
    <div>
      <NextHead />

      <div className="card">
        <div className="card-body">
          <h4 className="text-center my-3">Invite friends & Get Interview Credits</h4>

          <h6 className="text-center mt-4">
            When a friend joins through your invite link, you both get an extra interview credit.
          </h6>
          <h6 className="text-center my-3">
            You can reach <b>unlimited interview credits</b> when three of your friends join.
          </h6>

          <div className="form-group my-5">
            <label className="d-flex justify-content-center" htmlFor="exampleFormControlInput1">
              <h6>
                <b>Invite your friends:</b>
              </h6>
            </label>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <input
                type="email"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Add friends' email addresses"
                onChange={(e) => handleInviteYourFriendsEmailInputChange(e)}
              />
              <Button
                className="ml-3"
                variant="contained"
                color="secondary"
                onClick={() => handleSendButtonClick(inviteYourFriendsEmail)}
              >
                Send
              </Button>
            </div>
          </div>

          <div className="form-group my-4">
            <label className="d-flex justify-content-center" htmlFor="exampleFormControlInput2">
              <h6>
                <b>Share your invite link:</b>
              </h6>
            </label>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput2"
                placeholder={inviteLink}
                disabled={true}
              />
              <Button
                className="ml-3"
                variant="contained"
                color="secondary"
                onClick={() => handleCopyButtonClick(inviteLink)}
              >
                Copy
              </Button>
            </div>
          </div>

          <div className={classes.root} style={{ marginTop: '3em', marginBottom: '1em' }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <div className="d-flex justify-content-center">
                  <Twitter solid big message="Eduwingly" link="https://eduwingly.com/" />
                </div>
              </Grid>

              <Grid item xs={12} sm={4}>
                <div className="d-flex justify-content-center">
                  <Linkedin solid big message="Eduwingly" link="https://eduwingly.com/" />
                </div>
              </Grid>

              <Grid item xs={12} sm={4}>
                <div className="d-flex justify-content-center">
                  <Facebook solid big link="https://eduwingly.com/" />
                </div>
              </Grid>
            </Grid>
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

export default InviteYourFriends;
