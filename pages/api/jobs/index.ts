import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

import { getRootUrl } from '../../../common/common';

const ROOT_URL = getRootUrl();

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const type = _req.query.type;
    const department = _req.query.department;
    const location = _req.query.location;
    const token = _req.query.token;

    let response = null;
    if (!type && !department && !location) {
      response = await axios.get(`${ROOT_URL}/jobs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      let paramsObj = {};
      if (type) {
        const obj = {
          type: type,
        };
        paramsObj = Object.assign(paramsObj, obj);
      }
      if (department) {
        const obj = {
          department: department,
        };
        paramsObj = Object.assign(paramsObj, obj);
      }
      if (location) {
        const obj = {
          location: location,
        };
        paramsObj = Object.assign(paramsObj, obj);
      }

      response = await axios.get(`${ROOT_URL}/jobs`, {
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
    res.status(400).json({
      message: e.message,
    });
  }
};
