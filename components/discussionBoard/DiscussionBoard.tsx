import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import _ from 'lodash';

import NextHead from '../nextHead/NextHead';
import CustomSnackBar from '../customSnackBar/CustomSnackBar';

function DiscussionBoard(props: any): JSX.Element {
  const [postsList, setPostsList] = useState<any[]>([]);

  const [filterText, setFilterText] = useState('');

  const [commentsText, setCommentsText] = useState('');

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

          await getPostsList();
        }
      }
    }
  };

  const renderPostsList = (postsList: any[]) => {
    let postListView = null;

    if (postsList) {
      postListView = postsList.map((item: any, i: number) => {
        const posts_id = item.posts_id;
        const number = i + 1;
        const title = item.title;
        const description = item.description;
        const tag = item.tag;
        const likeCount = item.like_count;
        const commentResultList = item.commentResultList;

        return (
          <div key={i} className="my-3">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-end">
                  <DeleteIcon
                    className="hover-item pointer"
                    style={{ color: 'gray' }}
                    onClick={() => handleDeletePostById(item.posts_id)}
                  />
                </div>
                <div className="mt-2 mb-3" style={{ fontSize: '1.2em' }}>
                  <b>Discussion Thread {number}</b> - {title}
                </div>
                <div className="my-3" style={{ fontSize: '1.2em' }}>
                  <b>Description</b> - {description}
                </div>
                <div>{renderTag(tag)}</div>
                <div className="mt-3" style={{ display: 'flex', flexDirection: 'row' }}>
                  <ThumbUpIcon
                    className="hover-item pointer"
                    fontSize="small"
                    color="secondary"
                    onClick={() => handleLikeIconClick(posts_id)}
                  />
                  <div className="ml-2 hover-item pointer">{likeCount} likes</div>
                </div>
                {renderCommentsResultListDiv(commentResultList, posts_id)}
                <div className="mt-3">
                  <Button variant="contained" color="primary" onClick={() => handleCommentClick(posts_id)}>
                    Reply
                  </Button>
                  <div id={`comments-${posts_id}`} className="form-group mt-3" style={{ display: 'none' }}>
                    <textarea
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      placeholder="Enter your comment..."
                      rows={3}
                      onChange={(e) => handleCommentsTextareaChange(e)}
                    ></textarea>
                    <div className="mt-3">
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleSubmitCommentButtonClick(posts_id)}
                      >
                        Submit comment
                      </Button>
                    </div>
                  </div>
                </div>
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

  const handleLikeIconClick = async (posts_id: number) => {
    await addLikeCountToPost(posts_id);
  };

  const addLikeCountToPost = async (posts_id: number) => {
    const token = localStorage.getItem('token');
    if (token) {
      const response = await fetch(`/api/posts/add-like-count`, {
        method: 'PATCH',
        body: JSON.stringify({
          posts_id: posts_id,
          token: token,
        }),
      });
      if (response) {
        const responseData = await response.json();
        console.log('response status = ', response.status);
        console.log('responseData = ', responseData);

        if (response.status === 200) {
          await getPostsList();
        }
      }
    }
  };

  const renderCommentsResultListDiv = (commentsResultList: any[], posts_id: number) => {
    let commentsResultListDiv = null;

    if (!_.isEmpty(commentsResultList)) {
      let commentsResultListView = null;

      const showMoreStatus = localStorage.getItem(`showMore-${posts_id}`);
      if (showMoreStatus === 'true') {
        commentsResultListView = commentsResultList.map((item: any, i: number) => {
          return (
            <div key={i} className="my-2">
              <b>{item.name}:</b> {item.commentText}
            </div>
          );
        });
      } else {
        commentsResultListView = commentsResultList.map((item: any, i: number) => {
          if (i === commentsResultList.length - 1) {
            return (
              <div key={i} className="my-2">
                <b>{item.name}:</b> {item.commentText}
              </div>
            );
          }
        });
      }

      commentsResultListDiv = (
        <div className="my-3 p-3" style={{ border: '0.1em lightgray solid', borderRadius: '0.3em' }}>
          {commentsResultListView}
          <Button variant="contained" color="primary" onClick={() => handleShowMoreClick(posts_id)}>
            Show more
          </Button>
        </div>
      );
    }

    return commentsResultListDiv;
  };

  const handleShowMoreClick = (posts_id: number) => {
    const showMoreStatus = localStorage.getItem(`showMore-${posts_id}`);
    if (!showMoreStatus || showMoreStatus === 'false') {
      localStorage.setItem(`showMore-${posts_id}`, 'true');
      getPostsList();
    }
  };

  const handleCommentClick = (posts_id: number) => {
    const commentsDiv = document.querySelector(`#comments-${posts_id}`);
    if (commentsDiv) {
      const commentsDivStyleValue = commentsDiv.getAttribute('style');
      if (commentsDivStyleValue) {
        if (!commentsDivStyleValue.includes('block')) {
          commentsDiv.setAttribute('style', 'display: block');
        } else {
          commentsDiv.setAttribute('style', 'display: none');
        }
      }
    }
  };

  const handleCommentsTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentsText(e.target.value);
  };

  const handleSubmitCommentButtonClick = async (posts_id: number) => {
    const users_id = localStorage.getItem('usersId');
    const token = localStorage.getItem('token');
    if (commentsText && posts_id && users_id && token) {
      const users_id_int = parseInt(users_id, 10);
      await createComments(commentsText, posts_id, users_id_int, token);
    }
  };

  const createComments = async (commentsText: string, posts_id: number, users_id: number, token: string) => {
    const response = await fetch(`/api/comments/create-comments`, {
      method: 'POST',
      body: JSON.stringify({
        commentsText: commentsText,
        posts_id: posts_id,
        users_id: users_id,
        token: token,
      }),
    });
    if (response) {
      const responseData = await response.json();
      console.log('response status = ', response.status);
      console.log('responseData = ', responseData);

      if (response.status === 200) {
        await getPostsList();
      }
    }
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
