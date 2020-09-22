import React, { useState, useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import moment from 'moment';

import NextHead from '../nextHead/NextHead';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
    },
  }),
);

function TakeAMockInterview(): JSX.Element {
  const classes = useStyles();

  const [weekDaysList, setWeekDaysList] = useState<any[]>([]);

  useEffect(() => {
    getWeekDaysList();
  }, []);

  const getWeekDaysList = () => {
    const startOfWeekDay = moment().startOf('week').format('YYYY-MM-DD');
    const endOfWeekDay = moment().endOf('week').format('YYYY-MM-DD');
    const weekDayList = enumerateDaysBetweenDates(startOfWeekDay, endOfWeekDay);

    let resultList: any[] = [];
    if (weekDayList) {
      resultList = weekDayList.map((item: string, _: number) => {
        const isoWeekdayNum = moment(item).isoWeekday();
        const isoWeekDayStr = getIsoWeekDayStr(isoWeekdayNum);
        const obj = {
          dateStr: moment(item).format('DD/MM'),
          isoWeekDayStr: isoWeekDayStr,
        };
        return obj;
      });
    }

    if (resultList) {
      setWeekDaysList(resultList);
    }
  };

  const enumerateDaysBetweenDates = (startDate: string, endDate: string) => {
    const date = [];
    while (moment(startDate) <= moment(endDate)) {
      date.push(startDate);
      startDate = moment(startDate).add(1, 'days').format('YYYY-MM-DD');
    }
    return date;
  };

  const getIsoWeekDayStr = (isoWeekdayNum: number) => {
    let result = '';

    switch (isoWeekdayNum) {
      case 1:
        result = 'MON';
        break;
      case 2:
        result = 'TUE';
        break;
      case 3:
        result = 'WED';
        break;
      case 4:
        result = 'THU';
        break;
      case 5:
        result = 'FRI';
        break;
      case 6:
        result = 'SAT';
        break;
      case 7:
        result = 'SUN';
        break;
      default:
        break;
    }

    return result;
  };

  const renderWeekDaysList = (weekDaysList: any[]) => {
    let weekDayListDiv = null;

    if (weekDaysList) {
      weekDayListDiv = weekDaysList.map((item: any, i: number) => {
        return (
          <Grid key={i} item xs={12} sm={2}>
            <div className="text-center">
              <div>
                <b>{item.isoWeekDayStr}</b>
              </div>
              <div>{item.dateStr}</div>

              <div className="my-2">{getAllAvailableTime('00:00', '23:59')}</div>
            </div>
          </Grid>
        );
      });
    }

    return weekDayListDiv;
  };

  const getAllAvailableTime = (start: string, end: string) => {
    let allAvailableTimeDiv = null;

    const startTime = moment(start, 'HH:mm');
    const endTime = moment(end, 'HH:mm');

    if (endTime.isBefore(startTime)) {
      endTime.add(1, 'day');
    }

    const allAvailableTimeList = [];

    while (startTime <= endTime) {
      allAvailableTimeList.push(moment(startTime).format('HH:mm'));
      startTime.add(1, 'hour');
    }

    if (allAvailableTimeList) {
      allAvailableTimeDiv = allAvailableTimeList.map((item: string, i: number) => {
        const timeStr = moment(item, 'HH:mm').format('hh:mm a');
        return (
          <div key={i} className="my-3">
            <Button variant="contained" color="primary" onClick={() => handleTimeButtonClick(timeStr)}>
              {timeStr}
            </Button>
          </div>
        );
      });
    }

    return allAvailableTimeDiv;
  };

  const handleTimeButtonClick = (timeStr: string) => {
    console.log('timeStr = ', timeStr);
  };

  return (
    <div>
      <NextHead />

      <div className="container">
        <div className="row">
          <div className="col-sm-4">
            <div className="card">
              <div className="card-body">
                <h6>
                  <b>Focus</b>
                </h6>
                <ul style={{ listStyleType: 'none' }}>
                  <li className="my-4 hover-item pointer">Data Structures and Algorithms</li>
                  <li className="my-4 hover-item pointer">System Design</li>
                  <li className="my-4 hover-item pointer">Data Science</li>
                  <li className="my-4 hover-item pointer">Front End Development</li>
                  <li className="my-4 hover-item pointer">Behavioral</li>
                </ul>

                <h6 className="mt-5">
                  <b>Type of interview</b>
                </h6>
                <ul style={{ listStyleType: 'none' }}>
                  <li className="my-4 hover-item pointer">Practice Session</li>
                  <li className="my-4 hover-item pointer">Peer to Peer Mock Interview</li>
                </ul>

                <h6 className="mt-5 hover-item pointer">
                  <b>Study for Interview</b>
                </h6>

                <h6 className="mt-5 hover-item pointer">
                  <b>Company wise Interview Questions</b>
                </h6>
              </div>
            </div>
          </div>
          <div className="col-sm-8">
            <div className="card">
              <div className="card-body">
                <div className={classes.root}>
                  <Grid container spacing={3}>
                    {renderWeekDaysList(weekDaysList)}
                  </Grid>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TakeAMockInterview;
