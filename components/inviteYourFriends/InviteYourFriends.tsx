import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles, withStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import Grid from '@material-ui/core/Grid';
import { lightBlue, blue, indigo } from '@material-ui/core/colors';

import NextHead from '../nextHead/NextHead';
import CustomSnackBar from '../customSnackBar/CustomSnackBar';
import { validateEmail } from '../../common/common';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
    },
  }),
);

const TwitterColorButton = withStyles(() => ({
  root: {
    color: 'white',
    backgroundColor: lightBlue[500],
    '&:hover': {
      backgroundColor: lightBlue[700],
    },
  },
}))(Button);

const LinkedInColorButton = withStyles((theme: Theme) => ({
  root: {
    color: theme.palette.getContrastText(indigo[500]),
    backgroundColor: indigo[500],
    '&:hover': {
      backgroundColor: indigo[700],
    },
  },
}))(Button);

const FacebookColorButton = withStyles((theme: Theme) => ({
  root: {
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blue[500],
    '&:hover': {
      backgroundColor: blue[700],
    },
  },
}))(Button);

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

  const getInviteLink = () => {
    setInviteLink('https://codersmojo.com/test123');
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
        console.log(123);
      } else {
        setSnackBarStatus(true);
        setSnackBarType('error');
        setSnackBarMessage('Wrong email format');
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
                <TwitterColorButton
                  className="w-100"
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<TwitterIcon />}
                >
                  Twitter
                </TwitterColorButton>
              </Grid>

              <Grid item xs={12} sm={4}>
                <LinkedInColorButton
                  className="w-100"
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<LinkedInIcon />}
                >
                  LinkedIn
                </LinkedInColorButton>
              </Grid>

              <Grid item xs={12} sm={4}>
                <FacebookColorButton
                  className="w-100"
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<FacebookIcon />}
                >
                  Facebook
                </FacebookColorButton>
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
