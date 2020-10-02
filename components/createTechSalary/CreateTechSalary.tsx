import React, { useState } from 'react';
import Button from '@material-ui/core/Button';

import NextHead from '../nextHead/NextHead';
import CustomSnackBar from '../customSnackBar/CustomSnackBar';

function CreateTechSalary(props: any): JSX.Element {
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [description, setDescription] = useState('');
  const [totalCompensation, setTotalCompensation] = useState('');

  const [submitButtonClicked, setSubmitButtonClicked] = useState(false);

  const [snackBarStatus, setSnackBarStatus] = useState(false);
  const [snackBarType, setSnackBarType] = useState('success');
  const [snackBarMessage, setSnackBarMessage] = useState('');

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

  const handleOnKeyUp = (e: any) => {
    if (e.key === 'Enter') {
      if (jobTitle && company && description && totalCompensation) {
        handleSubmitButtonClick(jobTitle, company, description, totalCompensation);
      } else {
        setSnackBarStatus(true);
        setSnackBarType('error');
        setSnackBarMessage('Please enter job title, company, description, total compensation');
      }
    }
  };

  const handleSubmitButtonClick = (
    jobTitle: string,
    company: string,
    description: string,
    totalCompensation: string,
  ) => {
    if (jobTitle && company && description && totalCompensation) {
      setSubmitButtonClicked(true);

      createTechSalary(jobTitle, company, description, totalCompensation);
      setSubmitButtonClicked(false);
    }
  };

  const createTechSalary = async (
    jobTitle: string,
    company: string,
    description: string,
    totalCompensation: string,
  ) => {
    const token = localStorage.getItem('token');

    const response = await fetch(`/api/tech-salary/create-tech-salary`, {
      method: 'POST',
      body: JSON.stringify({
        jobTitle: jobTitle,
        company: company,
        description: description,
        totalCompensation: totalCompensation,
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

      <div className="d-flex justify-content-end" style={{ display: 'flex', flexDirection: 'row' }}>
        <Button className="mr-3" variant="contained" color="primary" onClick={() => handleBackClick()}>
          Back
        </Button>

        <Button
          variant="contained"
          color="secondary"
          disabled={submitButtonClicked ? true : false}
          onClick={() => handleSubmitButtonClick(jobTitle, company, description, totalCompensation)}
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
