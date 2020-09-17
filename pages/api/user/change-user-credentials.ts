import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

import { getRootUrl } from '../../../common/common';

const ROOT_URL = getRootUrl();

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const reqBody = JSON.parse(_req.body);
    const usersId = reqBody.usersId;
    const token = reqBody.token;

    const response = await axios.put(
      `${ROOT_URL}/user/change-user-credentials/${usersId}`,
      {
        firstName: reqBody.firstName,
        lastName: reqBody.lastName,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
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
