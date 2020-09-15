import React from 'react';

import NextHead from '../nextHead/NextHead';

function DiscussionBoard(): JSX.Element {
  const handleCreatePostButtonClick = () => {
    console.log(123);
  };

  // const renderPostsList = (postList: any[]) => {
  //   let postListView = null;

  //   if (postList) {
  //     postListView = (
  //       <div>

  //       </div>
  //     );
  //   }

  //   return postListView;
  // };

  return (
    <div>
      <NextHead />

      <div className="container">
        <div className="row">
          <div className="col-sm-4">
            <div className="card">
              <div className="card-body">
                <h6 className="my-4">
                  <span className="pointer hover-item">Career</span>
                </h6>
                <h6 className="my-4">
                  <span className="pointer hover-item">Jobs</span>
                </h6>
                <h6 className="my-4">
                  <span className="pointer hover-item">Success Story</span>
                </h6>
                <h6 className="my-4">
                  <span className="pointer hover-item">Women Investor</span>
                </h6>
                <h6 className="my-4">
                  <span className="pointer hover-item">Job Board</span>
                </h6>
                <h6 className="my-4">
                  <span className="pointer hover-item">Tech</span>
                </h6>
                <h6 className="my-4">
                  <span className="pointer hover-item">Salary Negotiation</span>
                </h6>
                <h6 className="my-4">
                  <span className="pointer hover-item">Compensation</span>
                </h6>
                <h6 className="my-4">
                  <span className="pointer hover-item">Interview Experience</span>
                </h6>
                <h6 className="my-4">
                  <span className="pointer hover-item">Career Growth</span>
                </h6>
                <h6 className="my-4">
                  <span className="pointer hover-item">Students</span>
                </h6>
                <h6 className="my-4">
                  <span className="pointer hover-item">Introduce Yourself</span>
                </h6>
              </div>
            </div>
          </div>
          <div className="col-sm-8">
            <div className="card">
              <div className="card-body">
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <h5 className="my-2">CodersMojo Discussion Board</h5>
                  <div style={{ marginLeft: 'auto' }}>
                    <button type="submit" className="btn btn-primary" onClick={() => handleCreatePostButtonClick()}>
                      Create post
                    </button>
                  </div>
                </div>

                {/* {renderPostsList(postList)} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiscussionBoard;
