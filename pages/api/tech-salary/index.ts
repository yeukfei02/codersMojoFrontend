import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

import { getRootUrl } from '../../../common/common';

const ROOT_URL = getRootUrl();

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const jobTitle = _req.query.jobTitle;
    const company = _req.query.company;

    let response = null;
    if (!jobTitle && !company) {
      response = await axios.get(`${ROOT_URL}/tech-salary`);
    } else {
      response = await axios.get(`${ROOT_URL}/tech-salary`, {
        params: {
          jobTitle: jobTitle,
          company: company,
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
