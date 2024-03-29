import React, { useEffect, useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Select from 'react-select';
import Button from '@material-ui/core/Button';
import axios from 'axios';

import NextHead from '../nextHead/NextHead';

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

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(3, 2),
    flexGrow: 1,
  },
}));

function ParticipateInHackathons(): JSX.Element {
  const classes = useStyles();

  const [selectedHackathonList, setSelectedHackathonList] = useState<any[]>([]);
  const [selectedHackathon, setSelectedHackathon] = useState<any>(null);

  const [name, setName] = useState('');

  const [hackathonsList, setHackathonsList] = useState<any[]>([]);

  useEffect(() => {
    if (!name) {
      getHackathonsList();
    } else {
      getHackathonsList(name);
    }
  }, [name]);

  useEffect(() => {
    if (hackathonsList) getSelectedHackathonList(hackathonsList);
  }, [hackathonsList]);

  const getHackathonsList = async (name?: string) => {
    const token = localStorage.getItem('token');

    let response = null;
    if (token) {
      if (!name) {
        response = await axios.get(`${ROOT_URL}/hackathons`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        response = await axios.get(`${ROOT_URL}/hackathons`, {
          params: {
            name: name,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    }

    if (response) {
      const responseData = response.data;
      console.log('response.status = ', response.status);
      console.log('responseData = ', responseData);

      if (response.status === 200) {
        setHackathonsList(responseData.result);
      }
    }
  };

  const getSelectedHackathonList = (hackathonsList: any[]) => {
    if (hackathonsList) {
      const hackathonsNameList = hackathonsList.map((item: any, _: number) => {
        const obj = {
          label: item.name,
          value: item.name,
        };
        return obj;
      });
      setSelectedHackathonList(hackathonsNameList);
    }
  };

  const handleHackathonDropdownChange = (selectedHackathon: any) => {
    if (selectedHackathon) {
      setSelectedHackathon(selectedHackathon);
      setName(selectedHackathon.value);
    } else {
      setSelectedHackathon(null);
      setName('');
    }
  };

  const renderHackathonsDiv = (hackathonsList: any[]) => {
    let hackathonsDiv = null;

    if (hackathonsList) {
      hackathonsDiv = hackathonsList.map((item: any, i: number) => {
        return (
          <Grid key={i} item xs={12} sm={4} className="d-flex align-items-stretch">
            <div className="card flex-grow-1">
              <div className="card-body">
                {/* <img src={item.image} className="card-img-top" alt="" /> */}

                <h5 className="mt-2 mb-4">
                  <b>{item.name}</b>
                </h5>
                <h6 className="my-4">
                  <b>Mode:</b> {item.mode}
                </h6>
                <h6 className="my-4">
                  <b>Prize:</b> {item.prize}
                </h6>
                <h6 className="my-4">
                  <b>Details:</b> {item.details}
                </h6>
                <h6 className="my-4">
                  <b>Date:</b> {item.date_time}
                </h6>
              </div>
              <div className="card-footer" style={{ borderTop: 'none', backgroundColor: 'transparent' }}>
                <div className="d-flex justify-content-end">
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleParticipateOrEnrollClick(item.link)}
                  >
                    Participate/enroll
                  </Button>
                </div>
              </div>
            </div>
          </Grid>
        );
      });
    }

    return hackathonsDiv;
  };

  const handleParticipateOrEnrollClick = (link: string) => {
    window.open(link);
  };

  return (
    <div>
      <NextHead />

      <div>
        <h5 className="text-center">Let’s hack and build together</h5>

        <div className="mt-4">
          <Select
            styles={selectStyles}
            placeholder={'Search hackathon'}
            value={selectedHackathon}
            onChange={handleHackathonDropdownChange}
            options={selectedHackathonList}
            isClearable={true}
          />
        </div>

        <div className={classes.root}>
          <Grid container spacing={3}>
            {renderHackathonsDiv(hackathonsList)}
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default ParticipateInHackathons;
