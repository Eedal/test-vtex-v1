import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from 'lib/mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await clientPromise;
  const db = client.db('vtex-test');

  if (req.method === 'GET') {
    try {
      const pointsCollection = db.collection('points');
      const undoPointsCollection = db.collection('undo-points');

      const points = await pointsCollection.find({}).toArray();
      const undoPoints = await undoPointsCollection.find({}).toArray();

      const hasUndo = points.length > 0;
      const hasRedo = undoPoints.length > 0;

      return res.status(200).json({ points, hasUndo, hasRedo });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  return res.status(400).json({ message: 'El método no existe' });
};

export default handler;
