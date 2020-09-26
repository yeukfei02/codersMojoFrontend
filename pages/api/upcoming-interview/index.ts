import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

import { getRootUrl } from '../../../common/common';

const ROOT_URL = getRootUrl();

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const users_id = _req.query.users_id;
    const token = _req.query.token;

    let response = null;
    if (!users_id) {
      response = await axios.get(`${ROOT_URL}/upcoming-interview`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      response = await axios.get(`${ROOT_URL}/upcoming-interview`, {
        params: {
          users_id: users_id,
        },
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
