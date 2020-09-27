import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import InsertInvitationIcon from '@material-ui/icons/InsertInvitation';
import { purple } from '@material-ui/core/colors';
import { Divider } from '@material-ui/core';
import _ from 'lodash';

import NextHead from '../nextHead/NextHead';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function YourUpcomingInterviewSchedule(props: any): JSX.Element {
  const [upcomingInterviewList, setUpcomingInterviewList] = useState<any[]>([]);

  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

  const [upcomingInterviewId, setUpcomingInterviewId] = useState(0);

  useEffect(() => {
    getUpcomingInterviewList();
  }, []);

  const getUpcomingInterviewList = async () => {
    const token = localStorage.getItem('token');
    const users_id = localStorage.getItem('usersId');
    if (token && users_id) {
      const queryString = new URLSearchParams({
        token: token,
        users_id: users_id,
      });
      const response = await fetch(`/api/upcoming-interview?${queryString}`);
      if (response) {
        const responseData = await response.json();
        console.log('response.status = ', response.status);
        console.log('responseData = ', responseData);

        if (responseData.result) {
          setUpcomingInterviewList(responseData.result.result);
        }
      }
    }
  };

  const handleRescheduleButtonClick = (upcomingInterviewId: number) => {
    setUpcomingInterviewId(upcomingInterviewId);
  };

  const handleCancelButtonClick = (upcomingInterviewId: number) => {
    setCancelDialogOpen(true);
    setUpcomingInterviewId(upcomingInterviewId);
  };

  const renderUpcomingListView = (upcomingInterviewList: any[]) => {
    let resultView = (
      <div className="card">
        <div className="card-body">
          <h5 className="d-flex justify-content-center">
            <b>Your dont have upcoming interview</b>
          </h5>
        </div>
      </div>
    );

    if (!_.isEmpty(upcomingInterviewList)) {
      resultView = (
        <table className="table table-bordered text-center">
          <thead>
            <tr>
              <th scope="col">When</th>
              <th scope="col">Type</th>
              <th scope="col">Question</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>{renderUpcomingListItems(upcomingInterviewList)}</tbody>
        </table>
      );
    }

    return resultView;
  };

  const renderUpcomingListItems = (upcomingInterviewList: any[]) => {
    let upcomingListView = null;

    if (upcomingInterviewList) {
      upcomingListView = upcomingInterviewList.map((item: any, i: number) => {
        const mockInterviewQuestionId = item.mock_interview_question_id;
        const upcomingInterviewId = item.upcoming_interview_id;

        return (
          <tr key={i}>
            <td>
              <div className="d-flex justify-content-center" style={{ display: 'flex', flexDirection: 'row' }}>
                <div className="mr-1">
                  <InsertInvitationIcon style={{ color: purple[500] }} />
                </div>
                <div className="d-flex align-items-center">
                  <b>{item.date_time}</b>
                </div>
              </div>
            </td>
            <td>
              <div className="d-flex justify-content-center">
                <div>{item.type}</div>
              </div>
            </td>
            <td>
              <div className="d-flex justify-content-center">
                <div className="hover-item pointer" onClick={() => handleQuestionClick(mockInterviewQuestionId)}>
                  {item.mock_interview_question ? item.mock_interview_question.question_title : ''}
                </div>
              </div>
            </td>
            <td>
              <div className="d-flex justify-content-center">
                <div>{item.status}</div>
              </div>
            </td>
            <td>
              <div className="d-flex justify-content-center" style={{ display: 'flex', flexDirection: 'row' }}>
                {renderCancelButton(item.status, upcomingInterviewId)}
                {renderRescheduleButton(item.status, upcomingInterviewId)}
              </div>
            </td>
          </tr>
        );
      });
    }

    return upcomingListView;
  };

  const renderCancelButton = (status: string, upcomingInterviewId: number) => {
    let cancelButton = (
      <Button
        className="mr-3"
        variant="contained"
        color="primary"
        onClick={() => handleCancelButtonClick(upcomingInterviewId)}
      >
        Cancel
      </Button>
    );

    if (status === 'cancelled') {
      cancelButton = (
        <Button
          className="mr-3"
          variant="contained"
          color="primary"
          disabled={true}
          onClick={() => handleCancelButtonClick(upcomingInterviewId)}
        >
          Cancel
        </Button>
      );
    }

    return cancelButton;
  };

  const renderRescheduleButton = (status: string, upcomingInterviewId: number) => {
    let rescheduleButton = (
      <Button variant="contained" color="secondary" onClick={() => handleRescheduleButtonClick(upcomingInterviewId)}>
        Reschedule
      </Button>
    );

    if (status === 'cancelled') {
      rescheduleButton = (
        <Button
          variant="contained"
          color="secondary"
          disabled={true}
          onClick={() => handleRescheduleButtonClick(upcomingInterviewId)}
        >
          Reschedule
        </Button>
      );
    }

    return rescheduleButton;
  };

  const handleQuestionClick = (mockInterviewQuestionId: number) => {
    localStorage.setItem('mockInterviewQuestionId', mockInterviewQuestionId.toString());
    props.textEditorViewClick();
  };

  // const handleCancelDialogClose = () => {
  //   setCancelDialogOpen(false);
  // };

  const handleNoGoBackButtonClick = () => {
    setCancelDialogOpen(false);
  };

  const handleYesCancelButtonClick = (upcomingInterviewId: number) => {
    setCancelDialogOpen(false);
    cancelUpcomingInterview(upcomingInterviewId);
  };

  const cancelUpcomingInterview = async (upcomingInterviewId: number) => {
    const token = localStorage.getItem('token');
    if (token) {
      const upcomingInterviewStatus = 'cancelled';
      const response = await fetch(`/api/upcoming-interview/cancel-upcoming-interview`, {
        method: 'PUT',
        body: JSON.stringify({
          upcomingInterviewId: upcomingInterviewId,
          upcomingInterviewStatus: upcomingInterviewStatus,
          token: token,
        }),
      });
      if (response) {
        const responseData = await response.json();
        console.log('response.status = ', response.status);
        console.log('responseData = ', responseData);

        if (response.status === 200) {
          getUpcomingInterviewList();
        }
      }
    }
  };

  return (
    <div>
      <NextHead />

      {renderUpcomingListView(upcomingInterviewList)}

      <Dialog
        open={cancelDialogOpen}
        TransitionComponent={Transition}
        keepMounted
        // onClose={handleCancelDialogClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle style={{ background: '#6f42c1' }} id="alert-dialog-slide-title">
          <div className="d-flex justify-content-center" style={{ color: 'white', fontWeight: 'bold' }}>
            CANCEL SESSION
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="my-3 p-4" style={{ color: 'black', fontSize: 20 }}>
            Are you sure want to cancel this session?
          </div>
          <Divider />
          <div className="my-3" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Button variant="contained" color="primary" onClick={() => handleNoGoBackButtonClick()}>
              No, go back
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleYesCancelButtonClick(upcomingInterviewId)}
            >
              Yes, cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default YourUpcomingInterviewSchedule;
