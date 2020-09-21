import React from 'react';

import NextHead from '../nextHead/NextHead';

function TakeAMockInterview(): JSX.Element {
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
              <div className="card-body">test</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TakeAMockInterview;
