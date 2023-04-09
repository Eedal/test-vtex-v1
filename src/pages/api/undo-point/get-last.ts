import { NextApiRequest, NextApiResponse } from 'next';
import httpService from 'services/http-service';
import CONSTANTS from '../../../../constants';

const { URL_API_FAKE } = CONSTANTS;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { data: undoPoints } = await httpService.get(
      `${URL_API_FAKE}undoPoints`
    );

    const lastUndoPoint = undoPoints[undoPoints.length - 1];

    return res.status(200).json(lastUndoPoint);
  }

  return res.status(400).json({ message: 'El método no existe' });
};

export default handler;
