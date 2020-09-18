import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';

import NextHead from '../nextHead/NextHead';
import CustomSnackBar from '../customSnackBar/CustomSnackBar';

function AccountSettings(): JSX.Element {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [notificationStatus, setNotificationStatus] = useState(true);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [snackBarStatus, setSnackBarStatus] = useState(false);
  const [snackBarType, setSnackBarType] = useState('success');
  const [snackBarMessage, setSnackBarMessage] = useState('');

  useEffect(() => {
    setDefaultUserCredentials();
  }, []);

  const setDefaultUserCredentials = () => {
    const firstName = localStorage.getItem('firstName');
    if (firstName) {
      setFirstName(firstName);
    }

    const lastName = localStorage.getItem('lastName');
    if (lastName) {
      setLastName(lastName);
    }
  };

  const subscribeTopic = async () => {
    const firebaseCurrentToken = localStorage.getItem('firebaseCurrentToken');
    const users_id = localStorage.getItem('usersId');

    if (users_id) {
      const response = await fetch(`/api/firebase/subscribe-topic`, {
        method: 'POST',
        body: JSON.stringify({
          registrationTokenList: [firebaseCurrentToken],
          topic: 'all',
          users_id: users_id,
        }),
      });
      if (response) {
        const responseData = await response.json();
        console.log('response.status = ', response.status);
        console.log('responseData = ', responseData);

        if (response.status === 200) {
          setSnackBarStatus(true);
          setSnackBarType('success');
          setSnackBarMessage('subscribe topic success');
        } else {
          setSnackBarStatus(true);
          setSnackBarType('error');
          setSnackBarMessage('subscribe topic error');
        }
      }
    }
  };

  const unsubscribeTopic = async () => {
    const firebaseCurrentToken = localStorage.getItem('firebaseCurrentToken');
    const users_id = localStorage.getItem('usersId');

    if (users_id) {
      const response = await fetch(`/api/firebase/unsubscribe-topic`, {
        method: 'POST',
        body: JSON.stringify({
          registrationTokenList: [firebaseCurrentToken],
          topic: 'all',
          users_id: users_id,
        }),
      });
      if (response) {
        const responseData = await response.json();
        console.log('response.status = ', response.status);
        console.log('responseData = ', responseData);

        if (response.status === 200) {
          setSnackBarStatus(true);
          setSnackBarType('success');
          setSnackBarMessage('unsubscribe topic success');
        } else {
          setSnackBarStatus(true);
          setSnackBarType('error');
          setSnackBarMessage('unsubscribe topic error');
        }
      }
    }
  };

  const handleFirstNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setFirstName(e.target.value);
    }
  };

  const handleLastNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setLastName(e.target.value);
    }
  };

  const handleOldPasswordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setOldPassword(e.target.value);
    }
  };

  const handleNewPasswordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setNewPassword(e.target.value);
    }
  };

  const handleChangeUserCredentialsButtonClick = async (firstName: string, lastName: string) => {
    if (firstName && lastName) {
      const usersId = localStorage.getItem('usersId');
      const token = localStorage.getItem('token');

      const response = await fetch(`/api/user/change-user-credentials`, {
        method: 'PUT',
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          usersId: usersId,
          token: token,
        }),
      });
      if (response) {
        const responseData = await response.json();
        console.log('response.status = ', response.status);
        console.log('responseData = ', responseData);

        if (response.status === 200) {
          setSnackBarStatus(true);
          setSnackBarType('success');
          setSnackBarMessage('change user credentials success');
        } else {
          setSnackBarStatus(true);
          setSnackBarType('error');
          setSnackBarMessage('change user credentials error');
        }
      }
    }
  };

  const handleChangePasswordButtonClick = async (oldPassword: string, newPassword: string) => {
    if (oldPassword && newPassword) {
      const usersId = localStorage.getItem('usersId');
      const token = localStorage.getItem('token');

      const response = await fetch(`/api/user/change-password`, {
        method: 'PUT',
        body: JSON.stringify({
          oldPassword: oldPassword,
          newPassword: newPassword,
          usersId: usersId,
          token: token,
        }),
      });
      if (response) {
        const responseData = await response.json();
        console.log('response.status = ', response.status);
        console.log('responseData = ', responseData);

        if (response.status === 200) {
          setSnackBarStatus(true);
          setSnackBarType('success');
          setSnackBarMessage('change password success');
        } else {
          setSnackBarStatus(true);
          setSnackBarType('error');
          setSnackBarMessage('change password error');
        }
      }
    }
  };

  const handleCloseSnackBar = () => {
    setSnackBarStatus(false);
  };

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNotificationStatus(e.target.checked);

    if (e.target.checked) {
      subscribeTopic();
    } else {
      unsubscribeTopic();
    }
  };

  return (
    <div style={{ margin: '3em auto' }}>
      <NextHead />

      <div className="container d-flex justify-content-center">
        <Card style={{ width: window.innerWidth > 600 ? 600 : 370, padding: '3em' }} variant="outlined">
          <div className="my-2 d-flex justify-content-center">
            <img src="/logo.png" width="200" height="65" alt="" loading="lazy" />
          </div>

          <h4 className="text-center my-5 font-weight-bold">Change user credientials</h4>

          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              value={firstName}
              onChange={(e) => handleFirstNameInputChange(e)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              value={lastName}
              onChange={(e) => handleLastNameInputChange(e)}
            />
          </div>

          <Button
            className="w-100 my-3"
            variant="contained"
            color="secondary"
            onClick={() => handleChangeUserCredentialsButtonClick(firstName, lastName)}
          >
            Change User Credentials
          </Button>
        </Card>
      </div>

      <div className="my-5 container d-flex justify-content-center">
        <Card style={{ width: window.innerWidth > 600 ? 600 : 370, padding: '3em' }} variant="outlined">
          <h4 className="text-center mt-3 mb-5 font-weight-bold">Integrations</h4>

          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <div className="mx-2">
              <button type="button" className="btn btn-outline-primary">
                Google Calendar
              </button>
            </div>
            <div className="mx-2">
              <button type="button" className="btn btn-outline-success">
                Outlook Calendar
              </button>
            </div>
          </div>
        </Card>
      </div>

      <div className="my-5 container d-flex justify-content-center">
        <Card style={{ width: window.innerWidth > 600 ? 600 : 370, padding: '3em' }} variant="outlined">
          <h4 className="text-center mt-3 mb-5 font-weight-bold">Notifications</h4>

          <div className="d-flex justify-content-center">
            <FormGroup row>
              <FormControlLabel
                control={
                  <Switch
                    checked={notificationStatus}
                    onChange={handleSwitchChange}
                    name="Notifications"
                    color="primary"
                  />
                }
                label={notificationStatus ? 'Notifications (on)' : 'Notifications (off)'}
              />
            </FormGroup>
          </div>
        </Card>
      </div>

      <div className="my-5 container d-flex justify-content-center">
        <Card style={{ width: window.innerWidth > 600 ? 600 : 370, padding: '3em' }} variant="outlined">
          <h4 className="text-center mt-3 mb-5 font-weight-bold">Change password</h4>

          <div className="form-group">
            <label htmlFor="oldPassword">Old Password</label>
            <input
              type="password"
              className="form-control"
              id="oldPassword"
              onChange={(e) => handleOldPasswordInputChange(e)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              className="form-control"
              id="newPassword"
              onChange={(e) => handleNewPasswordInputChange(e)}
            />
          </div>

          <Button
            className="w-100 my-3"
            variant="contained"
            color="secondary"
            onClick={() => handleChangePasswordButtonClick(oldPassword, newPassword)}
          >
            Change Password
          </Button>
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

export default AccountSettings;
