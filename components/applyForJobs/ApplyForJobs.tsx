import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import Button from '@material-ui/core/Button';
import _ from 'lodash';

import NextHead from '../nextHead/NextHead';

const selectStyles = {
  container: (base: any, state: any) => ({
    ...base,
    opacity: state.isDisabled ? '.5' : '1',
    backgroundColor: 'transparent',
    zIndex: '999',
  }),
};

function ApplyForJobs(): JSX.Element {
  // const [countryList, setCountryList] = useState<any[]>([]);

  const [selectedTypeList, setSelectedTypeList] = useState<any[]>([]);
  const [selectedType, setSelectedType] = useState<any>(null);

  const [selectedDepartmentList, setSelectedDepartmentList] = useState<any[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<any>(null);

  const [selectedLocationList, setSelectedLocationList] = useState<any[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);

  const [type, setType] = useState('');
  const [department, setDepartment] = useState('');
  const [location, setLocation] = useState('');

  const [jobsList, setJobsList] = useState<any[]>([]);

  useEffect(() => {
    // getCountryList();

    getSelectedTypeList();

    getJobsList(type, department, location);
  }, []);

  useEffect(() => {
    if (jobsList) {
      getSelectedDepartmentList(jobsList);
      getSelectedLocationList(jobsList);
    }
  }, [jobsList]);

  // const getCountryList = async () => {
  //   const response = await fetch(`/api/country`);
  //   if (response) {
  //     const responseData = await response.json();
  //     console.log('response.status = ', response.status);
  //     console.log('responseData = ', responseData);

  //     if (responseData) {
  //       setCountryList(responseData.result.result);
  //     }
  //   }
  // };

  const getSelectedTypeList = () => {
    const typeList = [
      {
        label: 'Full Time',
        value: 'Full Time',
      },
      {
        label: 'Part Time',
        value: 'Part Time',
      },
      {
        label: 'Contract',
        value: 'Contract',
      },
      {
        label: 'Remote',
        value: 'Remote',
      },
    ];
    setSelectedTypeList(typeList);
  };

  const getSelectedDepartmentList = (jobsList: any[]) => {
    if (jobsList) {
      const departmentList = jobsList.map((item: any, _: number) => {
        const obj = {
          label: item.title,
          value: item.title,
        };
        return obj;
      });
      setSelectedDepartmentList(departmentList);
    }
  };

  const getSelectedLocationList = (jobsList: any[]) => {
    if (jobsList) {
      const formateedLocationList = jobsList.map((item: any, _: number) => {
        const obj = {
          label: item.location,
          value: item.location,
        };
        return obj;
      });
      const filteredLocationList = _.uniqBy(formateedLocationList, 'label');
      setSelectedLocationList(filteredLocationList);
    }
  };

  const handleTypeDropdownChange = (selectedType: any) => {
    if (selectedType) {
      setSelectedType(selectedType);
      setType(selectedType.value);
    } else {
      setSelectedType(null);
      setType('');
    }
  };

  const handleDepartmentDropdownChange = (selectedDepartment: any) => {
    if (selectedDepartment) {
      setSelectedDepartment(selectedDepartment);
      setDepartment(selectedDepartment.value);
    } else {
      setSelectedDepartment(null);
      setDepartment('');
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

  const handleSearchButtonClick = (type: string, department: string, location: string) => {
    getJobsList(type, department, location);
  };

  const getJobsList = async (type: string, department: string, location: string) => {
    let response = null;

    const token = localStorage.getItem('token');
    if (!type && !department && !location) {
      if (token) {
        const queryString = new URLSearchParams({
          token: token,
        });
        response = await fetch(`/api/jobs?${queryString}`);
      }
    } else {
      if (token) {
        const queryString = new URLSearchParams({
          type: type,
          department: department,
          location: location,
          token: token,
        });
        response = await fetch(`/api/jobs?${queryString}`);
      }
    }

    if (response) {
      const responseData = await response.json();
      console.log('response.status = ', response.status);
      console.log('responseData = ', responseData);

      if (responseData) {
        setJobsList(responseData.result.result);
      }
    }
  };

  const renderJobList = (jobsList: any[]) => {
    let jobsListView = null;

    if (jobsList) {
      jobsListView = jobsList.map((item: any, i: number) => {
        const companyUrl = item.company_url;
        return (
          <tr key={i}>
            <td>
              <div className="my-2 hover-item pointer" onClick={() => handleCompanyNameClick(companyUrl)}>
                <b>{item.company}</b>
              </div>
            </td>
            <td>
              <div className="my-2">{item.title}</div>
            </td>
            <td>
              <div className="my-2">{item.type}</div>
            </td>
            <td>
              <div className="my-2">{item.location}</div>
            </td>
          </tr>
        );
      });
    }

    return jobsListView;
  };

  const handleCompanyNameClick = (companyUrl: string) => {
    window.open(companyUrl);
  };

  return (
    <div>
      <NextHead />

      <div className="mx-3">
        <div className="card">
          <div className="card-body">
            <h5 className="text-center my-1">Find a Job With CodersMojo</h5>
          </div>
        </div>

        <div className="container my-4">
          <div className="row">
            <div className="col-sm p-3">
              <Select
                styles={selectStyles}
                placeholder={'Select type'}
                value={selectedType}
                onChange={handleTypeDropdownChange}
                options={selectedTypeList}
                isClearable={true}
              />
            </div>
            <div className="col-sm p-3">
              <Select
                styles={selectStyles}
                placeholder={'Select department'}
                value={selectedDepartment}
                onChange={handleDepartmentDropdownChange}
                options={selectedDepartmentList}
                isClearable={true}
              />
            </div>
            <div className="col-sm p-3">
              <Select
                styles={selectStyles}
                placeholder={'Select location'}
                value={selectedLocation}
                onChange={handleLocationDropdownChange}
                options={selectedLocationList}
                isClearable={true}
              />
            </div>
            <div className="col-sm">
              <Button
                className="w-100 my-3"
                variant="contained"
                color="secondary"
                onClick={() => handleSearchButtonClick(type, department, location)}
              >
                Search
              </Button>
            </div>
          </div>
        </div>

        <table className="table table-bordered text-center">
          <thead>
            <tr>
              <th scope="col">Company</th>
              <th scope="col">Title</th>
              <th scope="col">Type</th>
              <th scope="col">Location</th>
            </tr>
          </thead>
          <tbody>{renderJobList(jobsList)}</tbody>
        </table>
      </div>
    </div>
  );
}

export default ApplyForJobs;
