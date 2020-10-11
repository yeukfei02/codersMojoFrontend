import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import Button from '@material-ui/core/Button';
import { DropzoneArea } from 'material-ui-dropzone';
import axios from 'axios';

import NextHead from '../nextHead/NextHead';
import CustomSnackBar from '../customSnackBar/CustomSnackBar';

import { getRootUrl } from '../../common/common';

const ROOT_URL = getRootUrl();

const selectStyles = {
  container: (base: any, state: any) => ({
    ...base,
    opacity: state.isDisabled ? '.5' : '1',
    backgroundColor: 'transparent',
    zIndex: '999',
  }),
};

function CreateWomenInvestorsCommunity(props: any): JSX.Element {
  const [imageFile, setImageFile] = useState(null);
  const [name, setName] = useState('');
  const [investorType, setInvestorType] = useState('');
  const [areaOfInvestment, setAreaOfInvestment] = useState('');
  const [expertise, setExpertise] = useState('');
  const [location, setLocation] = useState('');
  const [connectStatus, setConnectStatus] = useState('');

  const [selectedLocationList, setSelectedLocationList] = useState<any[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);

  const [selectedConnectStatusList, setSelectedConnectStatusList] = useState<any[]>([]);
  const [selectedConnectStatus, setSelectedConnectStatus] = useState<any>(null);

  const [submitButtonClicked, setSubmitButtonClicked] = useState(false);

  const [snackBarStatus, setSnackBarStatus] = useState(false);
  const [snackBarType, setSnackBarType] = useState('success');
  const [snackBarMessage, setSnackBarMessage] = useState('');

  useEffect(() => {
    getSelectedLocationList();
    getSelectedConnectStatusList();
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

  const getSelectedConnectStatusList = () => {
    const selectedConnectStatusList = [
      {
        label: 'Not Connected',
        value: 'Not Connected',
      },
      {
        label: 'Connected',
        value: 'Connected',
      },
    ];
    setSelectedConnectStatusList(selectedConnectStatusList);
  };

  const handleFilesUpload = (files: any[]) => {
    if (files && files.length === 1) {
      setImageFile(files[0]);
    }
  };

  const handleNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setName(e.target.value);
    }
  };

  const handleInvestorTypeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setInvestorType(e.target.value);
    }
  };

  const handleAreaOfInvestmentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setAreaOfInvestment(e.target.value);
    }
  };

  const handleExpertiseInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setExpertise(e.target.value);
    }
  };

  const handleOnKeyUp = (e: any) => {
    if (e.key === 'Enter') {
      if (imageFile && name && investorType && areaOfInvestment && expertise && location && connectStatus) {
        handleSubmitButtonClick(imageFile, name, investorType, areaOfInvestment, expertise, location, connectStatus);
      } else {
        setSnackBarStatus(true);
        setSnackBarType('error');
        setSnackBarMessage('Please enter job title, company, description, total compensation');
      }
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

  const handleConnectStatusDropdownChange = (selectedConnectStatus: any) => {
    if (selectedConnectStatus) {
      setSelectedConnectStatus(selectedConnectStatus);
      setConnectStatus(selectedConnectStatus.value);
    } else {
      setSelectedConnectStatus(null);
      setConnectStatus('');
    }
  };

  const handleSubmitButtonClick = async (
    imageFile: any,
    name: string,
    investorType: string,
    areaOfInvestment: string,
    expertise: string,
    location: string,
    connectStatus: string,
  ) => {
    if (imageFile && name && investorType && areaOfInvestment && expertise && location && connectStatus) {
      setSubmitButtonClicked(true);

      const imageUrl = await uploadWomenInvestorCommunityFile(imageFile);
      await createWomenInvestorCommunity(
        imageUrl,
        name,
        investorType,
        areaOfInvestment,
        expertise,
        location,
        connectStatus,
      );
      setSubmitButtonClicked(false);
    }
  };

  const uploadWomenInvestorCommunityFile = async (imageFile: any) => {
    const token = localStorage.getItem('token');

    const bodyFormData = new FormData();
    bodyFormData.append('file', imageFile);

    const response = await axios({
      method: 'post',
      url: `${ROOT_URL}/women-investor-community/upload-file`,
      data: bodyFormData,
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
    });

    let imageUrl = '';
    if (response.status === 201) {
      const responseData = response.data;
      imageUrl = responseData.imageUrl;
    }

    return imageUrl;
  };

  const createWomenInvestorCommunity = async (
    image: string,
    name: string,
    investorType: string,
    areaOfInvestment: string,
    expertise: string,
    location: string,
    connectStatus: string,
  ) => {
    const token = localStorage.getItem('token');

    const response = await fetch(`/api/women-investor-community/create-women-investor-community`, {
      method: 'POST',
      body: JSON.stringify({
        image: image,
        name: name,
        investorType: investorType,
        areaOfInvestment: areaOfInvestment,
        expertise: expertise,
        location: location,
        connectStatus: connectStatus,
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
        setSnackBarMessage('create women investor community success');

        setTimeout(() => {
          props.womenInvestorsCommunityClick();
        }, 1000);
      } else {
        setSnackBarStatus(true);
        setSnackBarType('error');
        setSnackBarMessage('create women investor community error');
      }
    }
  };

  const handleCloseSnackBar = () => {
    setSnackBarStatus(false);
  };

  const handleBackClick = () => {
    props.womenInvestorsCommunityClick();
  };

  return (
    <div>
      <NextHead />

      <div className="d-flex justify-content-center my-4">
        <h5 className="text-center">Create women investor community</h5>
      </div>

      <div className="my-4">
        <DropzoneArea
          acceptedFiles={['image/*']}
          dropzoneText={'Drag and drop an image here or click'}
          filesLimit={1}
          onChange={handleFilesUpload}
          alertSnackbarProps={{
            anchorOrigin: {
              horizontal: 'center',
              vertical: 'top',
            },
          }}
        />
      </div>

      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Name"
          id="name"
          onChange={(e) => handleNameInputChange(e)}
          onKeyUp={(e) => handleOnKeyUp(e)}
        />
      </div>

      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Investor Type"
          id="investorType"
          onChange={(e) => handleInvestorTypeInputChange(e)}
          onKeyUp={(e) => handleOnKeyUp(e)}
        />
      </div>

      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Area of Investment"
          id="areaOfInvestment"
          onChange={(e) => handleAreaOfInvestmentInputChange(e)}
          onKeyUp={(e) => handleOnKeyUp(e)}
        />
      </div>

      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Expertise"
          id="expertise"
          onChange={(e) => handleExpertiseInputChange(e)}
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

      <div className="mt-1 mb-3">
        <Select
          styles={selectStyles}
          placeholder={'Select connect status'}
          value={selectedConnectStatus}
          onChange={handleConnectStatusDropdownChange}
          options={selectedConnectStatusList}
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
          onClick={() =>
            handleSubmitButtonClick(imageFile, name, investorType, areaOfInvestment, expertise, location, connectStatus)
          }
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

export default CreateWomenInvestorsCommunity;
