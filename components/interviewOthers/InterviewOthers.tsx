import React from 'react';
import Button from '@material-ui/core/Button';

import NextHead from '../nextHead/NextHead';

function InterviewOthers(): JSX.Element {
  const handleSubmitButtonClick = () => {
    console.log(123123);
  };

  return (
    <div>
      <NextHead />

      <div className="mx-3">
        <div className="card">
          <div className="card-body">
            <h6 className="mt-2">Your availability to interview others</h6>
            <div className="my-3">interviews can be booked with you 1 weeks in advance</div>

            <h6 className="mt-5">What types of candidates do you not want to interview?</h6>

            <h6 className="mt-5">What types of interviews can you give?</h6>

            <h6 className="mt-5">How often?</h6>

            <h6 className="mt-5">When?</h6>
          </div>
        </div>

        <div className="d-flex justify-content-end my-3">
          <Button variant="contained" color="secondary" onClick={() => handleSubmitButtonClick()}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}

export default InterviewOthers;
