import { NextApiRequest, NextApiResponse } from 'next';
import httpService from 'services/http-service';
import CONSTANTS from '../../../../constants';

const { URL_API_FAKE } = CONSTANTS;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'DELETE') {
    const { id } = req.query;
    try {
      await httpService.delete(`${URL_API_FAKE}points/${id}`);
      return res.status(200).end();
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  return res.status(400).json({ message: 'El método no existe' });
};

export default handler;
