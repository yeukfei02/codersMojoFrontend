import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import InsertInvitationIcon from '@material-ui/icons/InsertInvitation';
import { purple } from '@material-ui/core/colors';
import _ from 'lodash';

import NextHead from '../nextHead/NextHead';

function YourUpcomingInterviewSchedule(props: any): JSX.Element {
  const [upcomingInterviewList, setUpcomingInterviewList] = useState<any[]>([]);

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

  const handleRescheduleButtonClick = () => {
    console.log(123);
  };

  const handleCancelButtonClick = () => {
    console.log(123);
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
                <Button className="mr-3" variant="contained" color="primary" onClick={() => handleCancelButtonClick()}>
                  Cancel
                </Button>
                <Button variant="contained" color="secondary" onClick={() => handleRescheduleButtonClick()}>
                  Reschedule
                </Button>
              </div>
            </td>
          </tr>
        );
      });
    }

    return upcomingListView;
  };

  const handleQuestionClick = (mockInterviewQuestionId: number) => {
    localStorage.setItem('mockInterviewQuestionId', mockInterviewQuestionId.toString());
    props.textEditorViewClick();
  };

  return (
    <div>
      <NextHead />

      {renderUpcomingListView(upcomingInterviewList)}
    </div>
  );
}

export default YourUpcomingInterviewSchedule;
