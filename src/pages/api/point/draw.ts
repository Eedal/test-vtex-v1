import { NextApiRequest, NextApiResponse } from 'next';
import { Point } from '@components/whiteboard/models/Point';
import clientPromise from 'lib/mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await clientPromise;
  const db = client.db('vtex-test');
  if (req.method === 'POST') {
    const { x, y, color }: Point = req.body;

    const pointsCollection = db.collection('points');
    const undoPointsCollection = db.collection('undo-points');

    try {
      const point = await pointsCollection.insertOne({ x, y, color });

      const undoPoints = await undoPointsCollection.find({}).toArray();

      if (undoPoints.length > 0) {
        await undoPointsCollection.deleteMany({});
      }

      return res.status(201).json(point);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  return res.status(400).json({ message: 'El método no existe' });
};

export default handler;
