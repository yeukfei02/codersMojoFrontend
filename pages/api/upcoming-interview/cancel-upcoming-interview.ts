import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

import { getRootUrl } from '../../../common/common';

const ROOT_URL = getRootUrl();

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const reqBody = JSON.parse(_req.body);
    const response = await axios.put(
      `${ROOT_URL}/upcoming-interview/cancel-upcoming-interview/${reqBody.upcomingInterviewId}`,
      {
        upcomingInterviewStatus: reqBody.upcomingInterviewStatus,
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
    console.log('error = ', e);

    res.status(400).json({
      message: e.message,
    });
  }
};
