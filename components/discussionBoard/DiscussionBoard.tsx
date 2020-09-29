import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

import NextHead from '../nextHead/NextHead';
import CustomSnackBar from '../customSnackBar/CustomSnackBar';

function DiscussionBoard(props: any): JSX.Element {
  const [postsList, setPostsList] = useState<any[]>([]);

  const [filterText, setFilterText] = useState('');

  const [snackBarStatus, setSnackBarStatus] = useState(false);
  const [snackBarType, setSnackBarType] = useState('success');
  const [snackBarMessage, setSnackBarMessage] = useState('');

  useEffect(() => {
    getPostsList();
  }, []);

  useEffect(() => {
    if (filterText) {
      getPostsList(filterText);
    }
  }, [filterText]);

  const getPostsList = async (tag?: string) => {
    const token = localStorage.getItem('token');

    let response = null;
    if (!tag) {
      if (token) {
        const queryString = new URLSearchParams({
          token: token,
        });
        response = await fetch(`/api/posts?${queryString}`);
      }
    } else {
      if (token) {
        const queryString = new URLSearchParams({
          tag: tag,
          token: token,
        });
        response = await fetch(`/api/posts?${queryString}`);
      }
    }

    if (response) {
      const responseData = await response.json();
      console.log('response status = ', response.status);
      console.log('responseData = ', responseData);

      if (responseData) {
        setPostsList(responseData.result.result);
      }
    }
  };

  const handleDeletePostById = async (postsId: number) => {
    const token = localStorage.getItem('token');
    if (token) {
      const response = await fetch(`/api/posts/delete-posts`, {
        method: 'DELETE',
        body: JSON.stringify({ postsId: postsId, token: token }),
      });
      if (response) {
        const responseData = await response.json();
        console.log('response.status = ', response.status);
        console.log('responseData = ', responseData);

        if (response.status === 200) {
          setSnackBarStatus(true);
          setSnackBarType('success');
          setSnackBarMessage('Delete posts success');

          getPostsList();
        }
      }
    }
  };

  const renderPostsList = (postsList: any[]) => {
    let postListView = null;

    if (postsList) {
      postListView = postsList.map((item: any, i: number) => {
        const number = i + 1;
        const title = item.title;
        const description = item.description;
        const tag = item.tag;

        return (
          <div key={i} className="my-3">
            <div className="card">
              <div className="card-body">
                <div
                  className="d-flex justify-content-end hover-item pointer"
                  onClick={() => handleDeletePostById(item.posts_id)}
                >
                  <DeleteIcon style={{ color: 'gray' }} />
                </div>
                <div className="mt-2 mb-3" style={{ fontSize: '1.2em' }}>
                  <b>Discussion Thread {number}</b> - {title}
                </div>
                <div className="my-3" style={{ fontSize: '1.2em' }}>
                  <b>Description</b> - {description}
                </div>
                <div>{renderTag(tag)}</div>
              </div>
            </div>
          </div>
        );
      });
    }

    return postListView;
  };

  const renderTag = (tag: string) => {
    let tagView = null;

    switch (tag) {
      case 'Career':
      case 'Jobs':
      case 'Success Story':
        tagView = <span className="badge badge-pill p-2 badge-primary"># {tag}</span>;
        break;
      case 'Women Investor':
      case 'Job Board':
        tagView = <span className="badge badge-pill p-2 badge-secondary"># {tag}</span>;
        break;
      case 'Tech':
      case 'Salary Negotiation':
        tagView = <span className="badge badge-pill p-2 badge-success"># {tag}</span>;
        break;
      case 'Compensation':
        tagView = <span className="badge badge-pill p-2 badge-danger"># {tag}</span>;
        break;
      case 'Interview Experience':
        tagView = <span className="badge badge-pill p-2 badge-warning"># {tag}</span>;
        break;
      case 'Career Growth':
        tagView = <span className="badge badge-pill p-2 badge-info"># {tag}</span>;
        break;
      case 'Students':
      case 'Introduce Yourself':
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

  const renderLeftSideTagItem = (itemText: string) => {
    const textToCompare = itemText.substring(1).trim();

    let leftSideTagItem = (
      <span className="pointer hover-item" onClick={() => handleFilterTextClick(textToCompare)}>
        {itemText}
      </span>
    );

    if (filterText === textToCompare) {
      leftSideTagItem = (
        <span
          style={{ color: '#6f42c1', fontWeight: 'bold' }}
          className="pointer hover-item"
          onClick={() => handleFilterTextClick(textToCompare)}
        >
          {itemText}
        </span>
      );
    }

    return leftSideTagItem;
  };

  const handleJoinTheSpace = () => {
    console.log(123);
  };

  const handleCloseSnackBar = () => {
    setSnackBarStatus(false);
  };

  return (
    <div>
      <NextHead />

      <div className="container">
        <div className="row">
          <div className="col-sm-8">
            <div className="card">
              <div className="card-body">
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <h5 className="my-2">CodersMojo Discussion Board</h5>
                  <div style={{ marginLeft: 'auto' }}>
                    <Button variant="contained" color="secondary" onClick={() => props.postsClick()}>
                      Create post
                    </Button>
                  </div>
                </div>

                {renderPostsList(postsList)}
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="mb-3">
              <Button className="w-100" variant="contained" color="secondary" onClick={() => handleJoinTheSpace()}>
                Join the space
              </Button>
            </div>

            <div className="card">
              <div className="card-body">
                <div className="mb-4">{renderLeftSideTagItem('# Career')}</div>

                <div className="my-4">{renderLeftSideTagItem('# Jobs')}</div>

                <div className="my-4">{renderLeftSideTagItem('# Success Story')}</div>

                <div className="my-4">{renderLeftSideTagItem('# Women Investor')}</div>

                <div className="my-4">{renderLeftSideTagItem('# Job Board')}</div>

                <div className="my-4">{renderLeftSideTagItem('# Tech')}</div>

                <div className="my-4">{renderLeftSideTagItem('# Salary Negotiation')}</div>

                <div className="my-4">{renderLeftSideTagItem('# Compensation')}</div>

                <div className="my-4">{renderLeftSideTagItem('# Interview Experience')}</div>

                <div className="my-4">{renderLeftSideTagItem('# Career Growth')}</div>

                <div className="my-4">{renderLeftSideTagItem('# Students')}</div>

                <div className="my-4">{renderLeftSideTagItem('# Introduce Yourself')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CustomSnackBar
        snackBarStatus={snackBarStatus}
        snackBarType={snackBarType}
        snackBarMessage={snackBarMessage}
        closeSnackBar={() => handleCloseSnackBar()}
      />
    </div>
  );
}

export default DiscussionBoard;
