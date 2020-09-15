import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

import { getRootUrl } from '../../../common/common';

const ROOT_URL = getRootUrl();

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const tag = _req.query.tag;
    const token = _req.query.token;

    let response = null;
    if (!tag) {
      response = await axios.get(`${ROOT_URL}/posts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      response = await axios.get(`${ROOT_URL}/posts`, {
        params: {
          tag: tag,
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
