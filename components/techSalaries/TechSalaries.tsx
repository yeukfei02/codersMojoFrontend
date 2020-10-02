import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import Button from '@material-ui/core/Button';

import NextHead from '../nextHead/NextHead';

const selectStyles = {
  container: (base: any, state: any) => ({
    ...base,
    opacity: state.isDisabled ? '.5' : '1',
    backgroundColor: 'transparent',
    zIndex: '999',
  }),
};

function TechSalaries(): JSX.Element {
  const [selectedJobTitleList, setSelectedJobTitleList] = useState<any[]>([]);
  const [selectedJobTitle, setSelectedJobTitle] = useState<any>(null);

  const [selectedCompanyList, setSelectedCompanyList] = useState<any[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<any>(null);

  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');

  const [techSalaryList, setTechSalaryList] = useState<any[]>([]);

  // useEffect(() => {
  //   getTechSalaryList(jobTitle, company);
  // }, [jobTitle, company]);

  useEffect(() => {
    if (techSalaryList) {
      getSelectedJobTitleList(techSalaryList);
      getSelectedCompanyList(techSalaryList);
    }
  }, [techSalaryList]);

  const getSelectedJobTitleList = (techSalaryList: any[]) => {
    console.log('techSalaryList = ', techSalaryList);

    const selectedJobTitleList: any[] = [];
    setSelectedJobTitleList(selectedJobTitleList);
  };

  const getSelectedCompanyList = (techSalaryList: any[]) => {
    console.log('techSalaryList = ', techSalaryList);

    const selectedCompanyList: any[] = [];
    setSelectedCompanyList(selectedCompanyList);
  };

  const handleJobTitleDropdownChange = (selectedJobTitle: any) => {
    if (selectedJobTitle) {
      setSelectedJobTitle(selectedJobTitle);
      setJobTitle(selectedJobTitle.value);
    } else {
      setSelectedJobTitle(null);
      setJobTitle('');
    }
  };

  const handleCompanyDropdownChange = (selectedCompany: any) => {
    if (selectedCompany) {
      setSelectedCompany(selectedCompany);
      setCompany(selectedCompany.value);
    } else {
      setSelectedCompany(null);
      setCompany('');
    }
  };

  const handleSearchButtonClick = (jobTitle: string, company: string) => {
    getTechSalaryList(jobTitle, company);
  };

  const handleAddTechSalaryButtonClick = () => {
    console.log(123);
  };

  const getTechSalaryList = async (jobTitle: string, company: string) => {
    const token = localStorage.getItem('token');
    if (token) {
      let queryString = null;
      if (!jobTitle && !company) {
        queryString = new URLSearchParams({
          token: token,
        });
      } else {
        queryString = new URLSearchParams({
          jobTitle: jobTitle,
          company: company,
          token: token,
        });
      }

      const response = await fetch(`/api/tech-salaries?${queryString}`);
      if (response) {
        const responseData = await response.json();
        console.log('response.status = ', response.status);
        console.log('responseData = ', responseData);

        if (response.status === 200) {
          setTechSalaryList(responseData.result.result);
        }
      }
    }
  };

  return (
    <div>
      <NextHead />

      <div className="mx-3">
        <div className="container my-4">
          <div className="row">
            <div className="col-sm p-3">
              <Select
                styles={selectStyles}
                placeholder={'Select job title'}
                value={selectedJobTitle}
                onChange={handleJobTitleDropdownChange}
                options={selectedJobTitleList}
                isClearable={true}
              />
            </div>
            <div className="col-sm p-3">
              <Select
                styles={selectStyles}
                placeholder={'Select company'}
                value={selectedCompany}
                onChange={handleCompanyDropdownChange}
                options={selectedCompanyList}
                isClearable={true}
              />
            </div>
            <div className="col-sm">
              <Button
                className="w-100 my-3"
                variant="contained"
                color="secondary"
                onClick={() => handleSearchButtonClick(jobTitle, company)}
              >
                Search
              </Button>
            </div>
            <div className="col-sm">
              <Button
                className="w-100 my-3"
                variant="contained"
                color="secondary"
                onClick={() => handleAddTechSalaryButtonClick()}
              >
                Add Tech Salary
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TechSalaries;
