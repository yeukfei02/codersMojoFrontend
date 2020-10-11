import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

import { getRootUrl } from '../../../common/common';

const ROOT_URL = getRootUrl();

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const name = _req.query.name;
    const expertise = _req.query.expertise;
    const location = _req.query.location;
    const token = _req.query.token;

    let response = null;
    if (!expertise && !location) {
      response = await axios.get(`${ROOT_URL}/women-investor-community`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      let paramsObj = {};
      if (name) {
        const obj = {
          name: name,
        };
        paramsObj = Object.assign(paramsObj, obj);
      }
      if (expertise) {
        const obj = {
          expertise: expertise,
        };
        paramsObj = Object.assign(paramsObj, obj);
      }
      if (location) {
        const obj = {
          location: location,
        };
        paramsObj = Object.assign(paramsObj, obj);
      }

      response = await axios.get(`${ROOT_URL}/women-investor-community`, {
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
