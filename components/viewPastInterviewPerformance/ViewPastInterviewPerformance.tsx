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

function ViewPastInterviewPerformance(props: any): JSX.Element {
  const [pastInterviewList, setPastInterviewList] = useState<any[]>([]);

  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);

  useEffect(() => {
    getPastInterviewList();
  }, []);

  const getPastInterviewList = async () => {
    const token = localStorage.getItem('token');
    const users_id = localStorage.getItem('usersId');
    if (token && users_id) {
      const queryString = new URLSearchParams({
        token: token,
        users_id: users_id,
      });
      const response = await fetch(`/api/past-interview?${queryString}`);
      if (response) {
        const responseData = await response.json();
        console.log('response.status = ', response.status);
        console.log('responseData = ', responseData);

        if (responseData.result) {
          setPastInterviewList(responseData.result.result);
        }
      }
    }
  };

  const renderPastListView = (pastInterviewList: any[]) => {
    let resultView = (
      <div className="card">
        <div className="card-body">
          <h5 className="d-flex justify-content-center">
            <b>Your dont have past interview</b>
          </h5>
        </div>
      </div>
    );

    if (!_.isEmpty(pastInterviewList)) {
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
          <tbody>{renderPastListItems(pastInterviewList)}</tbody>
        </table>
      );
    }

    return resultView;
  };

  const renderPastListItems = (pastInterviewList: any[]) => {
    let pastListView = null;

    if (pastInterviewList) {
      pastListView = pastInterviewList.map((item: any, i: number) => {
        const mockInterviewQuestionId = item.mock_interview_question_id;
        const pastInterviewId = item.past_interview_id;

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
              <div className="d-flex justify-content-center">{renderFeedBackButton(pastInterviewId)}</div>
            </td>
          </tr>
        );
      });
    }

    return pastListView;
  };

  const handleQuestionClick = (mockInterviewQuestionId: number) => {
    localStorage.setItem('mockInterviewQuestionId', mockInterviewQuestionId.toString());
    props.textEditorViewClick();
  };

  const renderFeedBackButton = (pastInterviewId: number) => {
    const feedbackButton = (
      <Button
        className="mr-3"
        variant="contained"
        color="secondary"
        onClick={() => handleFeedbackButtonClick(pastInterviewId)}
      >
        Feedback
      </Button>
    );
    return feedbackButton;
  };

  // const handleFeedBackCancelDialogClose = () => {
  //   setFeedbackDialogOpen(false);
  // };

  const handleFeedbackButtonClick = (pastInterviewId: number) => {
    console.log('pastInterviewId = ', pastInterviewId);
    setFeedbackDialogOpen(true);
  };

  const handleNoGoBackButtonClick = () => {
    setFeedbackDialogOpen(false);
  };

  const handleConfirmButtonClick = () => {
    setFeedbackDialogOpen(false);
  };

  return (
    <div>
      <NextHead />

      {renderPastListView(pastInterviewList)}

      <Dialog
        open={feedbackDialogOpen}
        TransitionComponent={Transition}
        keepMounted
        // onClose={handleFeedBackCancelDialogClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle style={{ background: '#6f42c1' }} id="alert-dialog-slide-title">
          <div className="d-flex justify-content-center" style={{ color: 'white', fontWeight: 'bold' }}>
            FEEDBACK
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="my-3 p-4" style={{ color: 'black', fontSize: 20 }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="d-flex justify-content-center">Here is your feedback</div>
              <div className="mt-4 d-flex justify-content-center">
                <div>test test test test test test test</div>
              </div>
            </div>
          </div>
          <Divider />
          <div className="my-3" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Button variant="contained" color="primary" onClick={() => handleNoGoBackButtonClick()}>
              No, go back
            </Button>
            <Button variant="contained" color="secondary" onClick={() => handleConfirmButtonClick()}>
              Yes, confirm
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ViewPastInterviewPerformance;
