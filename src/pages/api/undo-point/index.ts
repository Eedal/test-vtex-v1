import { Point } from '@components/whiteboard/models/Point';
import { NextApiRequest, NextApiResponse } from 'next';
import httpService from 'services/http-service';
import CONSTANTS from '../../../../constants';

const { URL_API_FAKE } = CONSTANTS;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { data } = await httpService.post(
      `${URL_API_FAKE}undoPoints`,
      req.body
    );

    return res.status(201).json(data);
  }

  if (req.method === 'DELETE') {
    const { data: undoPoints } = await httpService.get<Point[]>(
      `${URL_API_FAKE}undoPoints`
    );
    const ids = undoPoints.map((undoPoint) => undoPoint.id);

    const promisesToDeleteUndoPoints = ids.map((id) => httpService.delete(`${URL_API_FAKE}undoPoints/${id}`));

    await Promise.all(promisesToDeleteUndoPoints);
    return res.status(200).end();
  }

  return res.status(400).json({ message: 'El método no existe' });
};

export default handler;
