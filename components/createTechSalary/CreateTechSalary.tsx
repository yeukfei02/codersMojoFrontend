import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import Button from '@material-ui/core/Button';

import NextHead from '../nextHead/NextHead';
import CustomSnackBar from '../customSnackBar/CustomSnackBar';

const selectStyles = {
  container: (base: any, state: any) => ({
    ...base,
    opacity: state.isDisabled ? '.5' : '1',
    backgroundColor: 'transparent',
    zIndex: '999',
  }),
};

function CreateTechSalary(props: any): JSX.Element {
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [description, setDescription] = useState('');
  const [totalCompensation, setTotalCompensation] = useState('');
  const [location, setLocation] = useState('');

  const [selectedLocationList, setSelectedLocationList] = useState<any[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);

  const [submitButtonClicked, setSubmitButtonClicked] = useState(false);

  const [snackBarStatus, setSnackBarStatus] = useState(false);
  const [snackBarType, setSnackBarType] = useState('success');
  const [snackBarMessage, setSnackBarMessage] = useState('');

  useEffect(() => {
    getSelectedLocationList();
  }, []);

  const getSelectedLocationList = async () => {
    const response = await fetch(`/api/country`);
    if (response) {
      const responseData = await response.json();
      console.log('response.status = ', response.status);
      console.log('responseData = ', responseData);

      if (response.status === 200) {
        const selectedLocationList = responseData.result.result.map((item: any, _: number) => {
          const obj = {
            label: item.nicename,
            value: item.nicename,
          };
          return obj;
        });
        setSelectedLocationList(selectedLocationList);
      }
    }
  };

  const handleJobTitleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setJobTitle(e.target.value);
    }
  };

  const handleCompanyInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setCompany(e.target.value);
    }
  };

  const handleDescriptionInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value) {
      setDescription(e.target.value);
    }
  };

  const handleTotalCompensationInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setTotalCompensation(e.target.value);
    }
  };

  const handleLocationDropdownChange = (selectedLocation: any) => {
    if (selectedLocation) {
      setSelectedLocation(selectedLocation);
      setLocation(selectedLocation.value);
    } else {
      setSelectedLocation(null);
      setLocation('');
    }
  };

  const handleOnKeyUp = (e: any) => {
    if (e.key === 'Enter') {
      if (jobTitle && company && description && totalCompensation && location) {
        handleSubmitButtonClick(jobTitle, company, description, totalCompensation, location);
      } else {
        setSnackBarStatus(true);
        setSnackBarType('error');
        setSnackBarMessage('Please enter job title, company, description, total compensation, location');
      }
    }
  };

  const handleSubmitButtonClick = (
    jobTitle: string,
    company: string,
    description: string,
    totalCompensation: string,
    location: string,
  ) => {
    if (jobTitle && company && description && totalCompensation && location) {
      setSubmitButtonClicked(true);

      createTechSalary(jobTitle, company, description, totalCompensation, location);
      setSubmitButtonClicked(false);
    }
  };

  const createTechSalary = async (
    jobTitle: string,
    company: string,
    description: string,
    totalCompensation: string,
    location: string,
  ) => {
    const token = localStorage.getItem('token');

    const response = await fetch(`/api/tech-salary/create-tech-salary`, {
      method: 'POST',
      body: JSON.stringify({
        jobTitle: jobTitle,
        company: company,
        description: description,
        totalCompensation: totalCompensation,
        location: location,
        token: token,
      }),
    });
    if (response) {
      const responseData = await response.json();
      console.log('response status = ', response.status);
      console.log('responseData = ', responseData);

      if (response.status === 200) {
        setSnackBarStatus(true);
        setSnackBarType('success');
        setSnackBarMessage('create tech salary success');

        setTimeout(() => {
          props.techSalariesClick();
        }, 1000);
      } else {
        setSnackBarStatus(true);
        setSnackBarType('error');
        setSnackBarMessage('create tech salary error');
      }
    }
  };

  const handleCloseSnackBar = () => {
    setSnackBarStatus(false);
  };

  const handleBackClick = () => {
    props.techSalariesClick();
  };

  return (
    <div>
      <NextHead />

      <div className="d-flex justify-content-center my-4">
        <h5 className="text-center">Create tech salary</h5>
      </div>

      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Job Title"
          id="jobTitle"
          onChange={(e) => handleJobTitleInputChange(e)}
          onKeyUp={(e) => handleOnKeyUp(e)}
        />
      </div>

      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Company"
          id="company"
          onChange={(e) => handleCompanyInputChange(e)}
          onKeyUp={(e) => handleOnKeyUp(e)}
        />
      </div>

      <div className="form-group">
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          placeholder="Write your description here..."
          rows={10}
          onChange={(e) => handleDescriptionInputChange(e)}
        ></textarea>
      </div>

      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Total Compensation"
          id="totalCompensation"
          onChange={(e) => handleTotalCompensationInputChange(e)}
          onKeyUp={(e) => handleOnKeyUp(e)}
        />
      </div>

      <div className="mt-1 mb-3">
        <Select
          styles={selectStyles}
          placeholder={'Select location'}
          value={selectedLocation}
          onChange={handleLocationDropdownChange}
          options={selectedLocationList}
          isClearable={true}
        />
      </div>

      <div className="d-flex justify-content-end" style={{ display: 'flex', flexDirection: 'row' }}>
        <Button className="mr-3" variant="contained" color="primary" onClick={() => handleBackClick()}>
          Back
        </Button>

        <Button
          variant="contained"
          color="secondary"
          disabled={submitButtonClicked ? true : false}
          onClick={() => handleSubmitButtonClick(jobTitle, company, description, totalCompensation, location)}
        >
          Submit
        </Button>
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

export default CreateTechSalary;
