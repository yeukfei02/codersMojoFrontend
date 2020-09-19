import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

import { getRootUrl } from '../../../common/common';

const ROOT_URL = getRootUrl();

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const reqBody = JSON.parse(_req.body);
    const response = await axios.post(
      `${ROOT_URL}/tech-blog`,
      {
        image: reqBody.image,
        title: reqBody.title,
        description: reqBody.description,
        tag: reqBody.tag,
        users_id: reqBody.users_id,
      },
      {
        headers: {
          Authorization: `Bearer ${reqBody.token}`,
        },
      },
    );
    if (response) {
      const responseData = response.data;
      res.status(200).json({
        result: responseData,
      });
    }
  } catch (e) {
    res.status(400).json({
      message: e.message,
    });
  }
};
