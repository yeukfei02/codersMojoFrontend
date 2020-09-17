import React from 'react';

import NextHead from '../nextHead/NextHead';

function StudyForInterview(): JSX.Element {
  return (
    <div>
      <NextHead />

      <div className="my-5">
        <h5 className="text-center">
          Take our mini crash courses to help you prepare for the Interviews and Earn a Certificate
        </h5>

        <div className="d-flex justify-content-center my-5">
          <div className="card w-100">
            <div className="card-body">
              <div className="mb-3" style={{ fontWeight: 'bold', textDecoration: 'underline' }}>
                Courses
              </div>

              <div
                className="p-3"
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  borderTop: '0.1em lightgray solid',
                  borderLeft: '0.1em lightgray solid',
                  borderRight: '0.1em lightgray solid',
                }}
              >
                <img src="/python.png" className="img-thumbnail" width="100" height="100" alt="" />
                <div className="ml-4" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div className="mb-2" style={{ fontWeight: 'bold' }}>
                    Python
                  </div>
                  <div>Learn the most important language for data science.</div>
                </div>
              </div>

              <div
                className="p-3"
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  borderTop: '0.1em lightgray solid',
                  borderLeft: '0.1em lightgray solid',
                  borderRight: '0.1em lightgray solid',
                }}
              >
                <img src="/machine-learning.png" className="img-thumbnail" width="100" height="100" alt="" />
                <div className="ml-4" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div className="mb-2" style={{ fontWeight: 'bold' }}>
                    Intro to Machine Learning
                  </div>
                  <div>Learn the core ideas in machine learning, and build your first models.</div>
                </div>
              </div>

              <div
                className="p-3"
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  borderTop: '0.1em lightgray solid',
                  borderLeft: '0.1em lightgray solid',
                  borderRight: '0.1em lightgray solid',
                }}
              >
                <img
                  src="/intermediate-machine-learning.png"
                  className="img-thumbnail"
                  width="100"
                  height="100"
                  alt=""
                />
                <div className="ml-4" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div className="mb-2" style={{ fontWeight: 'bold' }}>
                    Intermidate Machine Learning
                  </div>
                  <div>
                    Learn to handle missing values, non-numeric values, data leakage and more. Your models will be more
                    accurate and useful.
                  </div>
                </div>
              </div>

              <div
                className="p-3"
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  borderTop: '0.1em lightgray solid',
                  borderLeft: '0.1em lightgray solid',
                  borderRight: '0.1em lightgray solid',
                }}
              >
                <img src="/data-visualization.png" className="img-thumbnail" width="100" height="100" alt="" />
                <div className="ml-4" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div className="mb-2" style={{ fontWeight: 'bold' }}>
                    Data Visualization
                  </div>
                  <div>Make great data visualizations. A great way to see the power of coding!</div>
                </div>
              </div>

              <div
                className="p-3"
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  borderTop: '0.1em lightgray solid',
                  borderLeft: '0.1em lightgray solid',
                  borderRight: '0.1em lightgray solid',
                }}
              >
                <img src="/pandas.png" className="img-thumbnail" width="100" height="100" alt="" />
                <div className="ml-4" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div className="mb-2" style={{ fontWeight: 'bold' }}>
                    Pandas
                  </div>
                  <div>Solve short hands-on challenges to prefect your data manipulation skills.</div>
                </div>
              </div>

              <div
                className="p-3"
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  borderTop: '0.1em lightgray solid',
                  borderLeft: '0.1em lightgray solid',
                  borderRight: '0.1em lightgray solid',
                }}
              >
                <img src="/feature-engineering.png" className="img-thumbnail" width="100" height="100" alt="" />
                <div className="ml-4" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div className="mb-2" style={{ fontWeight: 'bold' }}>
                    Feature Engineering
                  </div>
                  <div>Divcover the most effective way to improve your models.</div>
                </div>
              </div>

              <div
                className="p-3"
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  border: '0.1em lightgray solid',
                }}
              >
                <img src="/deep-learning.png" className="img-thumbnail" width="100" height="100" alt="" />
                <div className="ml-4" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div className="mb-2" style={{ fontWeight: 'bold' }}>
                    Deep Learning
                  </div>
                  <div>User TensorFlow to take machine learning to the next level. Your new skills will amaze you.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudyForInterview;