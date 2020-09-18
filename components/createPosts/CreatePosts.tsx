import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import Select from 'react-select';
import Button from '@material-ui/core/Button';

import NextHead from '../nextHead/NextHead';
import CustomSnackBar from '../customSnackBar/CustomSnackBar';

const selectStyles = {
  container: (base: any, state: any) => ({
    ...base,
    opacity: state.isDisabled ? '.5' : '1',
    backgroundColor: 'transparent',
    zIndex: '999',
  }),
};

function CreatePosts(props: any): JSX.Element {
  const [selectedTagList, setSelectedTagList] = useState<any[]>([]);
  const [selectedTag, setSelectedTag] = useState<any>(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('');
  const [users_id, setUsers_id] = useState(0);

  const [snackBarStatus, setSnackBarStatus] = useState(false);
  const [snackBarType, setSnackBarType] = useState('success');
  const [snackBarMessage, setSnackBarMessage] = useState('');

  useEffect(() => {
    getSelectedTagList();
    getUsersId();
  }, []);

  const getSelectedTagList = () => {
    const tagList = [
      {
        label: 'Career',
        value: 'Career',
      },
      {
        label: 'Jobs',
        value: 'Jobs',
      },
      {
        label: 'Success Story',
        value: 'Success Story',
      },
      {
        label: 'Women Investor',
        value: 'Women Investor',
      },
      {
        label: 'Job Board',
        value: 'Job Board',
      },
      {
        label: 'Tech',
        value: 'Tech',
      },
      {
        label: 'Salary Negotiation',
        value: 'Salary Negotiation',
      },
      {
        label: 'Compensation',
        value: 'Compensation',
      },
      {
        label: 'Interview Experience',
        value: 'Interview Experience',
      },
      {
        label: 'Career Growth',
        value: 'Career Growth',
      },
      {
        label: 'Students',
        value: 'Students',
      },
      {
        label: 'Introduce Yourself',
        value: 'Introduce Yourself',
      },
    ];
    setSelectedTagList(tagList);
  };

  const getUsersId = () => {
    const users_id = localStorage.getItem('usersId');
    if (users_id) {
      const userIdInt = parseInt(users_id, 10);
      setUsers_id(userIdInt);
    }
  };

  const handleTitleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setTitle(e.target.value);
    }
  };

  const handleDescriptionInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value) {
      setDescription(e.target.value);
    }
  };

  const handleTagDropdownChange = (selectedTag: any) => {
    if (selectedTag) {
      setSelectedTag(selectedTag);
      setTag(selectedTag.value);
    } else {
      setSelectedTag(null);
      setTag('');
    }
  };

  const handleSubmitButtonClick = (title: string, description: string, tag: string, users_id: number) => {
    if (title && description && tag && users_id) {
      createPosts(title, description, tag, users_id);
    }
  };

  const createPosts = async (title: string, description: string, tag: string, users_id: number) => {
    const token = localStorage.getItem('token');

    const response = await fetch(`/api/posts/create-posts`, {
      method: 'POST',
      body: JSON.stringify({
        title: title,
        description: description,
        tag: tag,
        users_id: users_id,
        token: token,
      }),
    });
    if (response) {
      const responseData = await response.json();
      console.log('response status = ', response.status);
      console.log('responseData = ', responseData);

      if (response.status === 200) {
        setSnackBarStatus(true);
        setSnackBarType('success');
        setSnackBarMessage('create post success');

        setTimeout(() => {
          props.discussionBoardClick();
        }, 1000);
      } else {
        setSnackBarStatus(true);
        setSnackBarType('error');
        setSnackBarMessage('create post error');
      }
    }
  };

  const handleCloseSnackBar = () => {
    setSnackBarStatus(false);
  };

  const handleBackClick = () => {
    props.discussionBoardClick();
  };

  return (
    <div style={{ margin: '5em auto' }}>
      <NextHead />

      <div className="container d-flex justify-content-center">
        <Card style={{ width: window.innerWidth > 600 ? 600 : 370, padding: '3em' }} variant="outlined">
          <div className="my-2 d-flex justify-content-center">
            <img src="/logo.png" width="200" height="65" alt="" loading="lazy" />
          </div>

          <h4 className="text-center my-5 font-weight-bold">Create post</h4>

          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" className="form-control" id="title" onChange={(e) => handleTitleInputChange(e)} />
          </div>

          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Description</label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows={5}
              onChange={(e) => handleDescriptionInputChange(e)}
            ></textarea>
          </div>

          <label>Tag</label>
          <div className="mt-1 mb-3">
            <Select
              styles={selectStyles}
              placeholder={'Select tag'}
              value={selectedTag}
              onChange={handleTagDropdownChange}
              options={selectedTagList}
              isClearable={true}
            />
          </div>

          <Button
            className="w-100 my-3"
            variant="contained"
            color="secondary"
            onClick={() => handleSubmitButtonClick(title, description, tag, users_id)}
          >
            Submit
          </Button>

          <div className="d-flex justify-content-center mt-5">
            <span className="pointer hover-item" onClick={() => handleBackClick()}>
              Back
            </span>
          </div>
        </Card>
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

export default CreatePosts;
