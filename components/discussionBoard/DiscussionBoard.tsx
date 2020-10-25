import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

import NextHead from '../nextHead/NextHead';
import CustomSnackBar from '../customSnackBar/CustomSnackBar';

function DiscussionBoard(props: any): JSX.Element {
  const [postsList, setPostsList] = useState<any[]>([]);

  const [filterText, setFilterText] = useState('');

  const [commentText, setCommentText] = useState('');

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
        const posts_id = item.posts_id;
        const number = i + 1;
        const title = item.title;
        const description = item.description;
        const tag = item.tag;
        const likeCount = item.like_count;

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
                <div className="mt-3">
                  <span className="hover-item pointer" onClick={() => handleCommentClick(posts_id)}>
                    Comment
                  </span>
                  <div id={`comments-${posts_id}`} className="form-group mt-3" style={{ display: 'none' }}>
                    <textarea
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      rows={3}
                      onChange={(e) => handleCommentTextareaChange(e)}
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

  const handleCommentTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.target.value);
  };

  const handleSubmitCommentButtonClick = async (posts_id: number) => {
    const users_id = localStorage.getItem('usersId');
    const token = localStorage.getItem('token');
    if (commentText && posts_id && users_id && token) {
      const users_id_int = parseInt(users_id, 10);
      await createComments(commentText, posts_id, users_id_int, token);
    }
  };

  const createComments = async (commentText: string, posts_id: number, users_id: number, token: string) => {
    const response = await fetch(`/api/comments/create-comments`, {
      method: 'POST',
      body: JSON.stringify({
        commentText: commentText,
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
