import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import EventIcon from '@material-ui/icons/Event';
import CodeIcon from '@material-ui/icons/Code';
import OndemandVideoIcon from '@material-ui/icons/OndemandVideo';
import { grey } from '@material-ui/core/colors';
import CircularProgress from '@material-ui/core/CircularProgress';
import moment from 'moment';
import momenttz from 'moment-timezone';
import axios from 'axios';

import NextHead from '../nextHead/NextHead';

import { getRootUrl } from '../../common/common';

const ROOT_URL = getRootUrl();

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function TakeAMockInterview(props: any): JSX.Element {
  const [type, setType] = useState('Data Structures and Algorithms');

  const [currentTimezone, setCurrentTimezone] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  const [weekDaysList, setWeekDaysList] = useState<any[]>([]);

  const [dialogTitleDate, setDialogTitleDate] = useState('');

  const [loadingDialogOpen, setLoadingDialogOpen] = useState(false);
  const [mockInterviewDialogOpen, setMockInterviewDialogOpen] = useState(false);

  const [matchPeerName, setMatchPeerName] = useState('');

  useEffect(() => {
    getCurrentTimezone();
    getCurrentTime();
  }, []);

  useEffect(() => {
    if (currentTime) getWeekDaysList(currentTime);
  }, [currentTime]);

  const getCurrentTimezone = () => {
    const userTimezone = momenttz.tz.guess();
    setCurrentTimezone(userTimezone);
  };

  const getCurrentTime = () => {
    const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
    setCurrentTime(currentTime);
  };

  const getWeekDaysList = (currentTime: string) => {
    const startOfWeekDay = moment(currentTime).format('YYYY-MM-DD');
    const endOfWeekDay = moment(currentTime).add(4, 'day').format('YYYY-MM-DD');
    const weekDayList = enumerateDaysBetweenDates(startOfWeekDay, endOfWeekDay);

    let resultList: any[] = [];
    if (weekDayList) {
      resultList = weekDayList.map((item: string, _: number) => {
        const isoWeekdayNum = moment(item).isoWeekday();
        const isoWeekDayStr = getIsoWeekDayStr(isoWeekdayNum);
        const obj = {
          fullDateStr: item,
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

  const getISOWeekDayFullStr = (iosWeekDayStr: string) => {
    let result = '';

    switch (iosWeekDayStr) {
      case 'MON':
        result = 'Monday';
        break;
      case 'TUE':
        result = 'Tuesday';
        break;
      case 'WED':
        result = 'Wednesday';
        break;
      case 'THU':
        result = 'Thursday';
        break;
      case 'FRI':
        result = 'Friday';
        break;
      case 'SAT':
        result = 'Saturday';
        break;
      case 'SUN':
        result = 'Sunday';
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
        const todayStr = moment().format('DD/MM');
        const currentTimeStr = moment(item.fullDateStr).format('DD/MM');
        const startTime = todayStr === currentTimeStr ? moment().add(1, 'hour').format('HH:00') : '00:00';

        return (
          <div key={i} className="col-sm d-flex justify-content-center">
            <div className="text-center">
              {renderWeekDayDiv(item, i)}
              <div className="my-2">{getAllAvailableTime(startTime, '23:59', item)}</div>
            </div>
          </div>
        );
      });
    }

    return weekDayListDiv;
  };

  const renderWeekDayDiv = (item: any, i: number) => {
    const today = moment();
    const itemDate = moment(item.fullDateStr).add(1, 'day');

    let weekDayDiv = (
      <div>
        <div>
          <b style={{ color: 'gray' }}>{item.isoWeekDayStr}</b>
        </div>
        <div style={{ color: 'gray' }}>{item.dateStr}</div>
      </div>
    );

    if (itemDate.isAfter(today)) {
      weekDayDiv = (
        <div>
          <div>
            <b>{item.isoWeekDayStr}</b>
          </div>
          <div>{item.dateStr}</div>
        </div>
      );
    }

    if (i === 0) {
      weekDayDiv = (
        <div>
          <div style={{ color: '#6f42c1' }}>
            <b>{item.isoWeekDayStr}</b>
          </div>
          <div style={{ color: '#6f42c1' }}>{item.dateStr}</div>
        </div>
      );
    }

    return weekDayDiv;
  };

  const getAllAvailableTime = (start: string, end: string, weekDayObj: any) => {
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
      const today = moment();
      const itemDate = moment(weekDayObj.fullDateStr).add(1, 'day');

      allAvailableTimeDiv = allAvailableTimeList.map((item: string, i: number) => {
        const timeStr = moment(item, 'HH:mm').format('hh:mm a');

        let button = (
          <div key={i} className="my-3">
            <Button variant="contained" color="primary" disabled={true}>
              {timeStr}
            </Button>
          </div>
        );

        if (itemDate.isAfter(today)) {
          button = (
            <div key={i} className="my-3">
              <Button variant="contained" color="primary" onClick={() => handleTimeButtonClick(timeStr, weekDayObj)}>
                {timeStr}
              </Button>
            </div>
          );
        }

        return button;
      });
    }

    return allAvailableTimeDiv;
  };

  const handlePreviousButtonClick = () => {
    const previousCurrentTime = moment(currentTime).subtract(1, 'day').format('YYYY-MM-DD HH:mm:ss');
    setCurrentTime(previousCurrentTime);
  };

  const handleNextButtonClick = () => {
    const previousCurrentTime = moment(currentTime).add(1, 'day').format('YYYY-MM-DD HH:mm:ss');
    setCurrentTime(previousCurrentTime);
  };

  const handleTimeButtonClick = (timeStr: string, weekDayObj: any) => {
    const dateStr = moment(weekDayObj.fullDateStr).format('MMMM Do');
    const isoWeekDayStr = getISOWeekDayFullStr(weekDayObj.isoWeekDayStr);

    const dialogTitleDate = `${isoWeekDayStr}, ${dateStr}, ${timeStr}`;
    setDialogTitleDate(dialogTitleDate);
    setLoadingDialogOpen(true);

    setTimeout(async () => {
      const fullDateTime = moment(`${weekDayObj.fullDateStr} ${timeStr}`).format('YYYY-MM-DD HH:mm:ss');
      await createUpcomingInterview(fullDateTime, dialogTitleDate);

      setMockInterviewDialogOpen(true);
      setLoadingDialogOpen(false);
    }, 1500);
  };

  // const handleLoadingDialogClose = () => {
  //   setLoadingDialogOpen(false);
  // };

  // const handleMockInterviewDialogClose = () => {
  //   setMockInterviewDialogOpen(false);
  // };

  const handleGotItButtonClick = () => {
    setMockInterviewDialogOpen(false);
    props.gotItClick();
  };

  const createUpcomingInterview = async (fullDateTime: string, dateTime: string) => {
    const token = localStorage.getItem('token');
    if (token) {
      const upcomingInterviewStatus = 'scheduled';
      const usersId = localStorage.getItem('usersId');

      const response = await axios.post(
        `${ROOT_URL}/upcoming-interview`,
        {
          fullDateTime: fullDateTime,
          dateTime: dateTime,
          type: type,
          upcomingInterviewStatus: upcomingInterviewStatus,
          users_id: usersId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response) {
        const responseData = response.data;
        console.log('response.status = ', response.status);
        console.log('responseData = ', responseData);

        if (response.status === 201) {
          localStorage.setItem('mockInterviewQuestionId', responseData.mockInterviewQuestionId);
          setMatchPeerName(responseData.matchPeerName);
        }
      }
    }
  };

  const renderMatchPeerNameDiv = (matchPeerName: string) => {
    let matchPeerNameDiv = (
      <div style={{ fontSize: 16 }}>
        <b style={{ textDecoration: 'underline' }}>No match peer</b> will be waiting to meet you
      </div>
    );

    if (matchPeerName) {
      matchPeerNameDiv = (
        <div style={{ fontSize: 16 }}>
          An awesome peer <b style={{ textDecoration: 'underline' }}>{matchPeerName}</b> will be waiting to meet you
        </div>
      );
    }

    return matchPeerNameDiv;
  };

  const handleTypeItemClick = (type: string) => {
    setType(type);
  };

  const renderLeftSideTagItem = (itemText: string) => {
    const iconImage = getIconImage(itemText);

    let leftSideTagItem = (
      <div className="my-3" style={{ display: 'flex', flexDirection: 'row' }}>
        {iconImage}
        <div
          className="ml-3 hover-item pointer d-flex align-items-center"
          onClick={() => handleTypeItemClick(itemText)}
        >
          {itemText}
        </div>
      </div>
    );

    if (type === itemText) {
      leftSideTagItem = (
        <div className="my-3" style={{ display: 'flex', flexDirection: 'row' }}>
          {iconImage}
          <div
            className="ml-3 hover-item pointer d-flex align-items-center"
            style={{ color: '#6f42c1', fontWeight: 'bold' }}
            onClick={() => handleTypeItemClick(itemText)}
          >
            {itemText}
          </div>
        </div>
      );
    }

    return leftSideTagItem;
  };

  const getIconImage = (itemText: string) => {
    let iconImage = null;

    switch (itemText) {
      case 'Data Structures and Algorithms':
        iconImage = <img src="/algorithm-small.png" width="25" height="25" alt="" />;
        break;
      case 'System Design':
        iconImage = <img src="/system-design-small.png" width="25" height="25" alt="" />;
        break;
      case 'Data Science':
        iconImage = <img src="/data-science-small.png" width="25" height="25" alt="" />;
        break;
      case 'Front End Development':
        iconImage = <img src="/front-end-development-small.png" width="25" height="25" alt="" />;
        break;
      case 'Behavioral':
        iconImage = <img src="/behavioral-small.png" width="25" height="25" alt="" />;
        break;
      case 'Practice Session':
        iconImage = <img src="/practice-session-small.png" width="25" height="25" alt="" />;
        break;
      case 'Peer to Peer Mock Interview':
        iconImage = <img src="/peer-to-peer-mock-interview-small.png" width="25" height="25" alt="" />;
        break;
      default:
        break;
    }

    return iconImage;
  };

  const renderPreviousButton = (currentTime: string) => {
    let previousButton = (
      <IconButton color="secondary" aria-label="previous" onClick={() => handlePreviousButtonClick()}>
        <ArrowBackIcon />
      </IconButton>
    );

    if (moment(currentTime).isBefore(moment())) {
      previousButton = (
        <IconButton color="secondary" aria-label="previous" disabled={true} onClick={() => handlePreviousButtonClick()}>
          <ArrowBackIcon />
        </IconButton>
      );
    }

    return previousButton;
  };

  const renderNextButton = () => {
    const nextButton = (
      <IconButton color="secondary" aria-label="previous" onClick={() => handleNextButtonClick()}>
        <ArrowForwardIcon />
      </IconButton>
    );

    return nextButton;
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
                <div>
                  {renderLeftSideTagItem('Data Structures and Algorithms')}
                  {renderLeftSideTagItem('System Design')}
                  {renderLeftSideTagItem('Data Science')}
                  {renderLeftSideTagItem('Front End Development')}
                  {renderLeftSideTagItem('Behavioral')}
                </div>

                <h6 className="mt-5">
                  <b>Type of interview</b>
                </h6>
                <div>
                  {renderLeftSideTagItem('Practice Session')}
                  {renderLeftSideTagItem('Peer to Peer Mock Interview')}
                </div>

                <h6 className="mt-5">
                  <b>Study for Interview</b>
                </h6>

                <h6 className="mt-5">
                  <b>Company wise Interview Questions</b>
                </h6>
              </div>
            </div>
          </div>
          <div className="col-sm-8">
            <div className="card">
              <div className="card-body">
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  {renderPreviousButton(currentTime)}

                  <div className="d-flex justify-content-center font-weight-bold" style={{ fontSize: 15 }}>
                    Current timezone: {currentTimezone}, Current time: {currentTime}
                  </div>

                  {renderNextButton()}
                </div>

                <div className="row mt-3">{renderWeekDaysList(weekDaysList)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog
        open={loadingDialogOpen}
        TransitionComponent={Transition}
        keepMounted
        // onClose={handleLoadingDialogClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title" style={{ background: '#6f42c1' }}>
          <div className="font-weight-bold" style={{ fontSize: 25, color: 'white' }}>
            Loading, we are matching...
          </div>
          <div className="d-flex justify-content-center my-3">
            <CircularProgress />
          </div>
        </DialogTitle>
      </Dialog>

      <Dialog
        open={mockInterviewDialogOpen}
        TransitionComponent={Transition}
        keepMounted
        // onClose={handleMockInterviewDialogClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title" style={{ background: '#6f42c1' }}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div className="d-flex align-items-center">
              <ThumbUpIcon style={{ fontSize: 90, color: grey[50] }} />
            </div>
            <div className="ml-4" style={{ color: 'white' }}>
              <div className="font-weight-bold" style={{ fontSize: 20 }}>
                You’re mock interview has been confirmed.
              </div>
              <div className="my-2">
                {renderMatchPeerNameDiv(matchPeerName)}
                <div style={{ fontSize: 16 }}>for a live Date Structures and Algorithms interview session</div>
                <div style={{ fontSize: 16 }}>
                  on <b style={{ textDecoration: 'underline' }}>{dialogTitleDate}</b>
                </div>
              </div>
            </div>
          </div>
        </DialogTitle>
        <DialogContent>
          <div id="alert-dialog-slide-description">
            <div className="my-4 px-3" style={{ display: 'flex', flexDirection: 'row' }}>
              <div>
                <EventIcon style={{ fontSize: 60, color: '#6f42c1' }} />
              </div>
              <div
                className="mx-4 d-flex justify-content-center"
                style={{ display: 'flex', flexDirection: 'column', color: 'black', fontSize: 14 }}
              >
                <div>
                  Please be on time and respectful to your peer. Please reschedule or cancel if you cannot make it for
                  any reasons.
                </div>
              </div>
            </div>

            <div className="my-4 px-3" style={{ display: 'flex', flexDirection: 'row' }}>
              <div>
                <CodeIcon style={{ fontSize: 60, color: '#6f42c1' }} />
              </div>
              <div
                className="mx-4 d-flex justify-content-center"
                style={{ display: 'flex', flexDirection: 'column', color: 'black', fontSize: 14 }}
              >
                <div>
                  We’ll email you a link to join your session a few minutes before it starts. The session takes place
                  within the browser, all you need is a working camera and microphone available.
                </div>
              </div>
            </div>

            <div className="my-4 px-3" style={{ display: 'flex', flexDirection: 'row' }}>
              <div>
                <OndemandVideoIcon style={{ fontSize: 60, color: '#6f42c1' }} />
              </div>
              <div
                className="mx-4 d-flex justify-content-center"
                style={{ display: 'flex', flexDirection: 'column', color: 'black', fontSize: 14 }}
              >
                <div>
                  Please take a look at your dashboard for content related to your session and be prepared. Your peer
                  will do the same.
                </div>
              </div>
            </div>

            <div className="my-4 px-3" style={{ display: 'flex', flexDirection: 'row' }}>
              <div>
                <OndemandVideoIcon style={{ fontSize: 60, color: '#6f42c1', visibility: 'hidden' }} />
              </div>
              <div
                className="mx-4 d-flex justify-content-center"
                style={{ display: 'flex', flexDirection: 'column', color: 'black', fontSize: 14 }}
              >
                <div>Good luck!</div>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions className="mb-2">
          <Button variant="contained" onClick={handleGotItButtonClick} color="secondary">
            GOT IT
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default TakeAMockInterview;
