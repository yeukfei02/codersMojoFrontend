import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

import { getRootUrl } from '../../../common/common';

const ROOT_URL = getRootUrl();

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const jobTitle = _req.query.jobTitle;
    const company = _req.query.company;
    const token = _req.query.token;

    let response = null;
    if (!jobTitle && !company) {
      response = await axios.get(`${ROOT_URL}/tech-salary`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      let paramsObj = {};
      if (jobTitle) {
        const obj = {
          jobTitle: jobTitle,
        };
        paramsObj = Object.assign(paramsObj, obj);
      }
      if (company) {
        const obj = {
          company: company,
        };
        paramsObj = Object.assign(paramsObj, obj);
      }

      response = await axios.get(`${ROOT_URL}/tech-salary`, {
        params: paramsObj,
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
    console.log('e = ', e);

    res.status(400).json({
      message: e.message,
    });
  }
};
