import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

import { getRootUrl } from '../../../common/common';

const ROOT_URL = getRootUrl();

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const mockInterviewQuestionId = _req.query.mockInterviewQuestionId;
    const token = _req.query.token;

    let response = null;
    if (mockInterviewQuestionId) {
      response = await axios.get(`${ROOT_URL}/mock-interview-question/${mockInterviewQuestionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

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
