import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { makeStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Select from 'react-select';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';

import NextHead from '../nextHead/NextHead';
import CustomSnackBar from '../customSnackBar/CustomSnackBar';
import { validateEmail } from '../../common/common';

const selectStyles = {
  container: (base: any, state: any) => ({
    ...base,
    opacity: state.isDisabled ? '.5' : '1',
    backgroundColor: 'transparent',
    zIndex: '999',
  }),
};

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

const useStyles = makeStyles({
  root: {
    width: 600,
    padding: 35,
  },
});

function Signup(): JSX.Element {
  const classes = useStyles();
  const router = useRouter();

  const [selectedMobilePhoneCountryCodeList, setSelectedMobilePhoneCountryCodeList] = useState<any[]>([]);
  const [selectedMobilePhoneCountryCode, setSelectedMobilePhoneCountryCode] = useState<any>(null);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobilePhoneCountryCode, setMobilePhoneCountryCode] = useState('');
  const [mobilePhone, setMobilePhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [snackBarStatus, setSnackBarStatus] = useState(false);
  const [snackBarType, setSnackBarType] = useState('success');
  const [snackBarMessage, setSnackBarMessage] = useState('');

  useEffect(() => {
    getSelectedMobilePhoneCountryCodeList();
  }, []);

  const getSelectedMobilePhoneCountryCodeList = async () => {
    const response = await fetch(`/api/country`);
    if (response) {
      const responseData = await response.json();
      console.log('response.status = ', response.status);
      console.log('responseData = ', responseData);

      const formattedMobilePhoneCountryCodeList = responseData.result.result.map((item: any, i: number) => {
        const nicename = `${item.nicename} (+${item.phonecode})`;
        const phonecode = `+${item.phonecode}`;
        const obj = {
          label: nicename,
          value: phonecode,
        };
        return obj;
      });
      setSelectedMobilePhoneCountryCodeList(formattedMobilePhoneCountryCodeList);
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

  const handleMobilePhoneCountryCodeDropdownChange = (selectedMobilePhoneCountryCode: any) => {
    if (selectedMobilePhoneCountryCode) {
      setSelectedMobilePhoneCountryCode(selectedMobilePhoneCountryCode);
      setMobilePhoneCountryCode(selectedMobilePhoneCountryCode.value);
    } else {
      setSelectedMobilePhoneCountryCode(null);
      setMobilePhoneCountryCode('');
    }
  };

  const handlePhoneInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setMobilePhone(e.target.value);
    }
  };

  const handleEmailInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setEmail(e.target.value);
    }
  };

  const handlePasswordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setPassword(e.target.value);
    }
  };

  const handleOnKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (firstName && lastName && email && password) {
        handleSignupButtonClick(firstName, lastName, email, password);
      } else {
        setSnackBarStatus(true);
        setSnackBarType('error');
        setSnackBarMessage('Please enter first name, last name, email, password');
      }
    }
  };

  const handleSignupButtonClick = (firstName: string, lastName: string, email: string, password: string) => {
    const phone = `${mobilePhoneCountryCode}${mobilePhone}`;

    if (firstName && lastName && phone && email && password) {
      const isEmail = validateEmail(email);
      if (isEmail) {
        signup(firstName, lastName, phone, email, password);
      } else {
        setSnackBarStatus(true);
        setSnackBarType('error');
        setSnackBarMessage('Wrong email format');
      }
    }
  };

  const signup = async (firstName: string, lastName: string, phone: string, email: string, password: string) => {
    const response = await fetch(`/api/user/signup`, {
      method: 'POST',
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        email: email,
        password: password,
      }),
    });
    if (response) {
      const responseData = await response.json();
      console.log('response status = ', response.status);
      console.log('responseData = ', responseData);

      if (response.status === 200) {
        setSnackBarStatus(true);
        setSnackBarType('success');
        setSnackBarMessage('create account success');

        setTimeout(() => {
          router.push(`/`);
        }, 1000);
      } else {
        setSnackBarStatus(true);
        setSnackBarType('error');
        setSnackBarMessage('create account error');
      }
    }
  };

  const handleCloseSnackBar = () => {
    setSnackBarStatus(false);
  };

  const handleAlreadyHaveAnAccountClick = () => {
    router.push(`/login`);
  };

  return (
    <MuiThemeProvider theme={theme}>
      <div style={{ margin: '5em auto' }}>
        <NextHead />

        <div className="container d-flex justify-content-center">
          <Card className={classes.root} variant="outlined">
            <div className="my-2 d-flex justify-content-center">
              <img src="/logo.png" width="200" height="65" alt="" loading="lazy" />
            </div>

            <h4 className="text-center my-5 font-weight-bold">Create Account</h4>

            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                onChange={(e) => handleFirstNameInputChange(e)}
                onKeyUp={(e) => handleOnKeyUp(e)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                onChange={(e) => handleLastNameInputChange(e)}
                onKeyUp={(e) => handleOnKeyUp(e)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Phone</label>
              <Select
                styles={selectStyles}
                placeholder={'Select mobile phone country code'}
                value={selectedMobilePhoneCountryCode}
                onChange={handleMobilePhoneCountryCodeDropdownChange}
                options={selectedMobilePhoneCountryCodeList}
                isClearable={true}
              />
              <div className="my-3">
                <input
                  type="number"
                  className="form-control"
                  id="exampleInputPhone1"
                  onChange={(e) => handlePhoneInputChange(e)}
                  onKeyUp={(e) => handleOnKeyUp(e)}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={(e) => handleEmailInputChange(e)}
                onKeyUp={(e) => handleOnKeyUp(e)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                onChange={(e) => handlePasswordInputChange(e)}
                onKeyUp={(e) => handleOnKeyUp(e)}
              />
            </div>

            <Button
              className="w-100 my-3"
              variant="contained"
              color="secondary"
              onClick={() => handleSignupButtonClick(firstName, lastName, email, password)}
            >
              Signup
            </Button>

            <div className="d-flex justify-content-center mt-5">
              <span className="pointer hover-item" onClick={() => handleAlreadyHaveAnAccountClick()}>
                Already have an account? Login here
              </span>
            </div>
          </Card>
        </div>

        <CustomSnackBar
          snackBarStatus={snackBarStatus}
          snackBarType={snackBarType}
          snackBarMessage={snackBarMessage}
          closeSnackBar={() => handleCloseSnackBar()}
        />
      </div>
    </MuiThemeProvider>
  );
}

export default Signup;
