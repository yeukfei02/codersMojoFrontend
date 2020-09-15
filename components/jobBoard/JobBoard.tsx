import React, { useEffect, useState } from 'react';
import Select from 'react-select';

import NextHead from '../nextHead/NextHead';

const selectStyles = {
  container: (base: any, state: any) => ({
    ...base,
    opacity: state.isDisabled ? '.5' : '1',
    backgroundColor: 'transparent',
    zIndex: '999',
  }),
};

function JobBoard(): JSX.Element {
  const [countryList, setCountryList] = useState<any[]>([]);

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
    getCountryList();

    getSelectedTypeList();
    getSelectedDepartmentList();

    getJobsList(type, department, location);
  }, []);

  useEffect(() => {
    getSelectedLocationList(countryList);
  }, [countryList]);

  const getCountryList = async () => {
    const response = await fetch(`/api/country`);
    if (response) {
      const responseData = await response.json();
      console.log('response.status = ', response.status);
      console.log('responseData = ', responseData);

      if (responseData) {
        setCountryList(responseData.result.result);
      }
    }
  };

  const getSelectedTypeList = () => {
    const typeList = [
      {
        label: 'Full time',
        value: 'Full time',
      },
      {
        label: 'Part time',
        value: 'Part time',
      },
      {
        label: 'Remote',
        value: 'Remote',
      },
    ];
    setSelectedTypeList(typeList);
  };

  const getSelectedDepartmentList = () => {
    const departmentList = [
      {
        label: 'Frontend Developer',
        value: 'Frontend Developer',
      },
      {
        label: 'Backend Developer',
        value: 'Backend Developer',
      },
      {
        label: 'Full Stack Developer',
        value: 'Full Stack Developer',
      },
      {
        label: 'Mobile Developer',
        value: 'Mobile Developer',
      },
      {
        label: 'iOS Developer',
        value: 'iOS Developer',
      },
      {
        label: 'Android Developer',
        value: 'Android Developer',
      },
      {
        label: 'Data Engineer',
        value: 'Data Engineer',
      },
      {
        label: 'Data Scientist',
        value: 'Data Scientist',
      },
      {
        label: 'DevOps Engineer',
        value: 'DevOps Engineer',
      },
      {
        label: 'QA Engineer',
        value: 'QA Engineer',
      },
    ];
    setSelectedDepartmentList(departmentList);
  };

  const getSelectedLocationList = (countryList: any[]) => {
    if (countryList) {
      const formateedLocationList = countryList.map((item: any, _: number) => {
        const obj = {
          label: item.nicename,
          value: item.nicename,
        };
        return obj;
      });
      setSelectedLocationList(formateedLocationList);
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
        return (
          <tr key={i}>
            <td>
              <div className="my-2">
                <b>Title:</b> {item.title}
              </div>
              <div className="my-2">
                <b>Description:</b> {item.description}
              </div>
              <div className="my-2">
                <b>Department:</b> {item.department}
              </div>
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
              <button
                type="submit"
                className="btn btn-success btn w-100 my-3"
                onClick={() => handleSearchButtonClick(type, department, location)}
              >
                Search
              </button>
            </div>
          </div>
        </div>

        <table className="table table-hover text-center">
          <thead>
            <tr>
              <th scope="col">Jobs</th>
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

export default JobBoard;
