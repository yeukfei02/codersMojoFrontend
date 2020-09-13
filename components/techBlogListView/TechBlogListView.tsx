import React, { useState, useEffect } from 'react';

import NextHead from '../nextHead/NextHead';

function TechBlogListView(): JSX.Element {
  const [techBlogList, setTechBlogList] = useState<any[]>([]);
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    getTechBlogList();
  }, []);

  useEffect(() => {
    if (filterText) {
      getTechBlogList(filterText);
    }
  }, [filterText]);

  const getTechBlogList = async (filterText?: string) => {
    let response = null;
    if (!filterText) {
      response = await fetch(`/api/tech-blog`, {
        method: 'GET',
      });
    } else {
      response = await fetch(`/api/tech-blog?tag=${filterText}`, {
        method: 'GET',
      });
    }

    if (response) {
      const responseData = await response.json();
      console.log('response status = ', response.status);
      console.log('responseData = ', responseData);

      if (response.status === 200) {
        setTechBlogList(responseData.result.result);
      }
    }
  };

  const renderLeftOddTechBlogList = (techBlogList: any[]) => {
    let techBlogListView = null;

    if (techBlogList) {
      const filteredTechBlogList = techBlogList.filter((_: any, i: number) => {
        return i % 5 != 0;
      });
      const leftOddTechBlogList = filteredTechBlogList.filter((_: any, i: number) => {
        return i % 2 != 0;
      });
      techBlogListView = leftOddTechBlogList.map((item: any, i: number) => {
        return (
          <div key={i} className="card my-3">
            <img src={item.image} className="card-img-top" alt="" />
            <div className="card-body">
              <h5 className="card-title">{item.title}</h5>
              <p className="card-text">{item.description}</p>
              {renderTag(item.tag)}
            </div>
          </div>
        );
      });
    }

    return techBlogListView;
  };

  const renderLeftEvenTechBlogList = (techBlogList: any[]) => {
    let techBlogListView = null;

    if (techBlogList) {
      const filteredTechBlogList = techBlogList.filter((_: any, i: number) => {
        return i % 5 != 0;
      });
      const leftOddTechBlogList = filteredTechBlogList.filter((_: any, i: number) => {
        return i % 2 == 0;
      });
      techBlogListView = leftOddTechBlogList.map((item: any, i: number) => {
        return (
          <div key={i} className="card my-3">
            <img src={item.image} className="card-img-top" alt="" />
            <div className="card-body">
              <h5 className="card-title">{item.title}</h5>
              <p className="card-text">{item.description}</p>
              {renderTag(item.tag)}
            </div>
          </div>
        );
      });
    }

    return techBlogListView;
  };

  const renderRightTechBlogList = (techBlogList: any[]) => {
    let techBlogListView = null;

    if (techBlogList) {
      const filteredTechBlogList = techBlogList.filter((_: any, i: number) => {
        return i % 5 == 0;
      });
      techBlogListView = filteredTechBlogList.map((item: any, i: number) => {
        return (
          <div key={i} className="card my-3">
            <img src={item.image} className="card-img-top" alt="" />
            <div className="card-body">
              <h5 className="card-title">{item.title}</h5>
              <p className="card-text">{item.description}</p>
              {renderTag(item.tag)}
            </div>
          </div>
        );
      });
    }

    return techBlogListView;
  };

  const renderTag = (tag: string) => {
    let tagView = null;

    switch (tag) {
      case 'Machine Learning':
        tagView = <span className="badge badge-pill p-2 badge-primary"># {tag}</span>;
        break;
      case 'Data Science':
        tagView = <span className="badge badge-pill p-2 badge-secondary"># {tag}</span>;
        break;
      case 'Programming':
        tagView = <span className="badge badge-pill p-2 badge-success"># {tag}</span>;
        break;
      case 'Web Development':
        tagView = <span className="badge badge-pill p-2 badge-danger"># {tag}</span>;
        break;
      case 'Cloud - AWS and GCP':
        tagView = <span className="badge badge-pill p-2 badge-warning"># {tag}</span>;
        break;
      case 'Data Visualization':
        tagView = <span className="badge badge-pill p-2 badge-info"># {tag}</span>;
        break;
      case 'Tech Interview Experiences':
        tagView = <span className="badge badge-pill p-2 badge-dark"># {tag}</span>;
        break;
      default:
        break;
    }

    return tagView;
  };

  const handleMachineLearningClick = () => {
    setFilterText('Machine Learning');
  };

  const handleDataScienceClick = () => {
    setFilterText('Data Science');
  };

  const handleProgrammingClick = () => {
    setFilterText('Programming');
  };

  const handleWebDevelopmentClick = () => {
    setFilterText('Web Development');
  };

  const handleCloudAWSAndGCPClick = () => {
    setFilterText('Cloud - AWS and GCP');
  };

  const handleDataVisualizationClick = () => {
    setFilterText('Data Visualization');
  };

  const handleTechInterviewExperiencesClick = () => {
    setFilterText('Tech Interview Experiences');
  };

  return (
    <div>
      <NextHead />

      <div className="mx-5">
        <div className="card">
          <div className="card-body">
            <div>
              <div className="row">
                <div className="col-sm d-flex justify-content-center">
                  <span className="pointer hover-item" onClick={() => handleMachineLearningClick()}>
                    Machine Learning
                  </span>
                </div>
                <div className="col-sm d-flex justify-content-center">
                  <span className="pointer hover-item" onClick={() => handleDataScienceClick()}>
                    Data Science
                  </span>
                </div>
                <div className="col-sm d-flex justify-content-center">
                  <span className="pointer hover-item" onClick={() => handleProgrammingClick()}>
                    Programming
                  </span>
                </div>
                <div className="col-sm d-flex justify-content-center">
                  <span className="pointer hover-item" onClick={() => handleWebDevelopmentClick()}>
                    Web Development
                  </span>
                </div>
                <div className="col-sm d-flex justify-content-center">
                  <span className="pointer hover-item" onClick={() => handleCloudAWSAndGCPClick()}>
                    Cloud - AWS and GCP
                  </span>
                </div>
                <div className="col-sm d-flex justify-content-center">
                  <span className="pointer hover-item" onClick={() => handleDataVisualizationClick()}>
                    Data Visualization
                  </span>
                </div>
                <div className="col-sm d-flex justify-content-center">
                  <span className="pointer hover-item" onClick={() => handleTechInterviewExperiencesClick()}>
                    Tech Interview Experiences
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ overflowX: 'hidden' }}>
          <div className="row">
            <div className="col-sm">
              <div className="container">
                <div className="row">
                  <div className="col-sm">{renderLeftOddTechBlogList(techBlogList)}</div>
                  <div className="col-sm">{renderLeftEvenTechBlogList(techBlogList)}</div>
                </div>
              </div>
            </div>
            <div className="col-sm">{renderRightTechBlogList(techBlogList)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TechBlogListView;
