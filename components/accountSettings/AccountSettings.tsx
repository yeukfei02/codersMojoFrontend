import React, { useState } from 'react';
import Card from '@material-ui/core/Card';

import NextHead from '../nextHead/NextHead';
import CustomSnackBar from '../customSnackBar/CustomSnackBar';

function AccountSettings(): JSX.Element {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [snackBarStatus, setSnackBarStatus] = useState(false);
  const [snackBarType, setSnackBarType] = useState('success');
  const [snackBarMessage, setSnackBarMessage] = useState('');

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

  const handleSubmitButtonClick = async (oldPassword: string, newPassword: string) => {
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

  return (
    <div style={{ margin: '3em auto' }}>
      <NextHead />

      <div className="container d-flex justify-content-center">
        <Card style={{ width: window.innerWidth > 600 ? 600 : 370, padding: '3em' }} variant="outlined">
          <div className="my-2 d-flex justify-content-center">
            <img src="/logo.png" width="200" height="65" alt="" loading="lazy" />
          </div>

          <h4 className="text-center my-5 font-weight-bold">Change password</h4>

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

          <button
            type="submit"
            className="btn btn-success btn-lg w-100 my-3"
            onClick={() => handleSubmitButtonClick(oldPassword, newPassword)}
          >
            Submit
          </button>
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
