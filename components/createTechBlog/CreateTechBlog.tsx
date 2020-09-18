import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import Select from 'react-select';
import Button from '@material-ui/core/Button';
import { DropzoneArea } from 'material-ui-dropzone';

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

function CreateTechBlog(props: any): JSX.Element {
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
        label: 'Machine Learning',
        value: 'Machine Learning',
      },
      {
        label: 'Data Science',
        value: 'Data Science',
      },
      {
        label: 'Programming',
        value: 'Programming',
      },
      {
        label: 'Web Development',
        value: 'Web Development',
      },
      {
        label: 'Cloud - AWS and GCP',
        value: 'Cloud - AWS and GCP',
      },
      {
        label: 'Data Visualization',
        value: 'Data Visualization',
      },
      {
        label: 'Tech Interview Experiences',
        value: 'Tech Interview Experiences',
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

  const handleFilesUpload = (files: any[]) => {
    if (files && files.length === 1) {
      console.log('files = ', files);
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
      createTechBlog(title, description, tag, users_id);
    }
  };

  const createTechBlog = async (title: string, description: string, tag: string, users_id: number) => {
    const token = localStorage.getItem('token');

    const response = await fetch(`/api/tech-blog/create-tech-blog`, {
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
        setSnackBarMessage('create tech blog success');

        setTimeout(() => {
          props.techBlogClick();
        }, 1000);
      } else {
        setSnackBarStatus(true);
        setSnackBarType('error');
        setSnackBarMessage('create tech blog error');
      }
    }
  };

  const handleCloseSnackBar = () => {
    setSnackBarStatus(false);
  };

  const handleBackClick = () => {
    props.techBlogClick();
  };

  return (
    <div style={{ margin: '5em auto' }}>
      <NextHead />

      <div className="container d-flex justify-content-center">
        <Card style={{ width: window.innerWidth > 600 ? 600 : 370, padding: '3em' }} variant="outlined">
          <div className="my-2 d-flex justify-content-center">
            <img src="/logo.png" width="200" height="65" alt="" loading="lazy" />
          </div>

          <h4 className="text-center my-5 font-weight-bold">Create tech blog</h4>

          <div className="my-4">
            <DropzoneArea
              acceptedFiles={['image/*']}
              dropzoneText={'Drag and drop an image here or click'}
              filesLimit={1}
              onChange={handleFilesUpload}
              alertSnackbarProps={{
                anchorOrigin: {
                  horizontal: 'center',
                  vertical: 'top',
                },
              }}
            />
          </div>

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

export default CreateTechBlog;
