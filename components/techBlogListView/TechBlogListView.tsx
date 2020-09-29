import React, { useState, useEffect } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import NextHead from '../nextHead/NextHead';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(3, 2),
    flexGrow: 1,
  },
}));

function TechBlogListView(): JSX.Element {
  const classes = useStyles();

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

  const renderTechBlogList = (techBlogList: any[]) => {
    let techBlogListView = null;

    if (techBlogList) {
      techBlogListView = techBlogList.map((item: any, i: number) => {
        return (
          <Grid key={i} item xs={12} sm={4} className="d-flex align-items-stretch">
            <div className="card flex-grow-1">
              <div className="card-body">
                <img src={item.image} className="card-img-top" alt="" />
                <div className="card-body">
                  <div className="card-title" style={{ fontSize: 18, fontWeight: 'bold' }}>
                    {item.title}
                  </div>
                  <div className="card-text" style={{ whiteSpace: 'pre-line' }}>
                    {item.description}
                  </div>
                  <div className="mt-3">{renderTag(item.tag)}</div>
                </div>
              </div>
            </div>
          </Grid>
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

  const handleFilterTextClick = (filterText: string) => {
    setFilterText(filterText);
  };

  return (
    <div>
      <NextHead />

      <div className="mx-3">
        <div className="card">
          <div className="card-body">
            <div>
              <div className="row">
                <div
                  className="col-sm d-flex justify-content-center align-items-center"
                  style={{ borderRight: '0.1em lightgray solid' }}
                >
                  <span
                    className="pointer hover-item"
                    style={{
                      color: filterText === 'Machine Learning' ? '#6f42c1' : '',
                      fontWeight: filterText === 'Machine Learning' ? 'bold' : 'normal',
                    }}
                    onClick={() => handleFilterTextClick('Machine Learning')}
                  >
                    Machine Learning
                  </span>
                </div>
                <div
                  className="col-sm d-flex justify-content-center align-items-center"
                  style={{
                    borderRight: '0.1em lightgray solid',
                    color: filterText === 'Data Science' ? '#6f42c1' : '',
                    fontWeight: filterText === 'Data Science' ? 'bold' : 'normal',
                  }}
                >
                  <span className="pointer hover-item" onClick={() => handleFilterTextClick('Data Science')}>
                    Data Science
                  </span>
                </div>
                <div
                  className="col-sm d-flex justify-content-center align-items-center"
                  style={{
                    borderRight: '0.1em lightgray solid',
                    color: filterText === 'Programming' ? '#6f42c1' : '',
                    fontWeight: filterText === 'Programming' ? 'bold' : 'normal',
                  }}
                >
                  <span className="pointer hover-item" onClick={() => handleFilterTextClick('Programming')}>
                    Programming
                  </span>
                </div>
                <div
                  className="col-sm d-flex justify-content-center align-items-center"
                  style={{
                    borderRight: '0.1em lightgray solid',
                    color: filterText === 'Web Development' ? '#6f42c1' : '',
                    fontWeight: filterText === 'Web Development' ? 'bold' : 'normal',
                  }}
                >
                  <span className="pointer hover-item" onClick={() => handleFilterTextClick('Web Development')}>
                    Web Development
                  </span>
                </div>
                <div
                  className="col-sm d-flex justify-content-center align-items-center"
                  style={{
                    borderRight: '0.1em lightgray solid',
                    color: filterText === 'Cloud - AWS and GCP' ? '#6f42c1' : '',
                    fontWeight: filterText === 'Cloud - AWS and GCP' ? 'bold' : 'normal',
                  }}
                >
                  <span className="pointer hover-item" onClick={() => handleFilterTextClick('Cloud - AWS and GCP')}>
                    Cloud - AWS and GCP
                  </span>
                </div>
                <div
                  className="col-sm d-flex justify-content-center align-items-center"
                  style={{
                    borderRight: '0.1em lightgray solid',
                    color: filterText === 'Data Visualization' ? '#6f42c1' : '',
                    fontWeight: filterText === 'Data Visualization' ? 'bold' : 'normal',
                  }}
                >
                  <span className="pointer hover-item" onClick={() => handleFilterTextClick('Data Visualization')}>
                    Data Visualization
                  </span>
                </div>
                <div className="col-sm d-flex justify-content-center align-items-center">
                  <span
                    className="pointer hover-item"
                    style={{
                      color: filterText === 'Tech Interview Experiences' ? '#6f42c1' : '',
                      fontWeight: filterText === 'Tech Interview Experiences' ? 'bold' : 'normal',
                    }}
                    onClick={() => handleFilterTextClick('Tech Interview Experiences')}
                  >
                    Tech Interview Experiences
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={classes.root}>
          <Grid container spacing={3}>
            {renderTechBlogList(techBlogList)}
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default TechBlogListView;
