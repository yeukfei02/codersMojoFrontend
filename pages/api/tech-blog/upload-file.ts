import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

import { getRootUrl } from '../../../common/common';

const ROOT_URL = getRootUrl();

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const reqBody = JSON.parse(_req.body);
    const response = await axios({
      method: 'post',
      url: `${ROOT_URL}/tech-blog/upload-file`,
      data: reqBody.bodyFormData,
      headers: { Authorization: `Bearer ${reqBody.token}`, 'Content-Type': 'multipart/form-data' },
    });

    if (response) {
      const responseData = response.data;
      res.status(200).json({
        result: responseData,
      });
    }
  } catch (e) {
    console.log('error = ', e);

    res.status(400).json({
      message: e.message,
    });
  }
};
