import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

import { getRootUrl } from '../../../common/common';

const ROOT_URL = getRootUrl();

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const tag = _req.query.tag;

    let response = null;
    if (!tag) {
      response = await axios.get(`${ROOT_URL}/tech-blog`);
    } else {
      response = await axios.get(`${ROOT_URL}/tech-blog`, {
        params: {
          tag: tag,
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
