import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import Button from '@material-ui/core/Button';
import { DropzoneArea } from 'material-ui-dropzone';
import axios from 'axios';

import NextHead from '../nextHead/NextHead';
import CustomSnackBar from '../customSnackBar/CustomSnackBar';

import { getRootUrl } from '../../common/common';

const ROOT_URL = getRootUrl();

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

  const [imageFile, setImageFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('');
  const [users_id, setUsers_id] = useState(0);

  const [submitButtonClicked, setSubmitButtonClicked] = useState(false);

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
      setImageFile(files[0]);
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

  const handleOnKeyUp = (e: any) => {
    if (e.key === 'Enter') {
      if (imageFile && title && description && tag) {
        handleSubmitButtonClick(imageFile, title, description, tag, users_id);
      } else {
        setSnackBarStatus(true);
        setSnackBarType('error');
        setSnackBarMessage('Please enter title, description, tag');
      }
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

  const handleSubmitButtonClick = async (
    imageFile: any,
    title: string,
    description: string,
    tag: string,
    users_id: number,
  ) => {
    if (imageFile && title && description && tag && users_id) {
      setSubmitButtonClicked(true);

      const imageUrl = await uploadTechBlogFile(imageFile);
      await createTechBlog(imageUrl, title, description, tag, users_id);
      setSubmitButtonClicked(false);
    }
  };

  const uploadTechBlogFile = async (imageFile: any) => {
    const token = localStorage.getItem('token');

    const bodyFormData = new FormData();
    bodyFormData.append('file', imageFile);

    const response = await axios({
      method: 'post',
      url: `${ROOT_URL}/tech-blog/upload-file`,
      data: bodyFormData,
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
    });

    let imageUrl = '';
    if (response.status === 201) {
      const responseData = response.data;
      imageUrl = responseData.imageUrl;
    }

    return imageUrl;
  };

  const createTechBlog = async (image: string, title: string, description: string, tag: string, users_id: number) => {
    const token = localStorage.getItem('token');

    const response = await fetch(`/api/tech-blog/create-tech-blog`, {
      method: 'POST',
      body: JSON.stringify({
        image: image,
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
    <div>
      <NextHead />

      <div className="form-group">
        <input
          style={{ border: '0em transparent' }}
          type="text"
          className="form-control"
          placeholder="Title"
          id="title"
          onChange={(e) => handleTitleInputChange(e)}
          onKeyUp={(e) => handleOnKeyUp(e)}
        />
      </div>

      <div className="form-group">
        <textarea
          style={{ border: '0em transparent' }}
          className="form-control"
          placeholder="Tell your story..."
          id="exampleFormControlTextarea1"
          rows={10}
          onChange={(e) => handleDescriptionInputChange(e)}
        ></textarea>
      </div>

      <div className="my-4">
        <DropzoneArea
          acceptedFiles={['image/*']}
          dropzoneText={'Drag and drop an image here or click'}
          filesLimit={1}
          maxFileSize={1000000}
          onChange={handleFilesUpload}
          alertSnackbarProps={{
            anchorOrigin: {
              horizontal: 'center',
              vertical: 'top',
            },
          }}
        />
      </div>

      <div className="my-3">
        <Select
          styles={selectStyles}
          placeholder={'Select tag'}
          value={selectedTag}
          onChange={handleTagDropdownChange}
          options={selectedTagList}
          isClearable={true}
        />
      </div>

      <div className="d-flex justify-content-end" style={{ display: 'flex', flexDirection: 'row' }}>
        <Button className="mr-3" variant="contained" color="primary" onClick={() => handleBackClick()}>
          Back
        </Button>

        <Button
          variant="contained"
          color="secondary"
          disabled={submitButtonClicked ? true : false}
          onClick={() => handleSubmitButtonClick(imageFile, title, description, tag, users_id)}
        >
          Submit
        </Button>
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
