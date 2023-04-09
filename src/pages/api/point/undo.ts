import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from 'lib/mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await clientPromise;
  const db = client.db('vtex-test');
  if (req.method === 'GET') {
    try {
      const pointsCollection = db.collection('points');
      const undoPointsCollection = db.collection('undo-points');

      const lastPoint = await pointsCollection
        .find()
        .sort({ _id: -1 })
        .limit(1)
        .toArray();

      if (lastPoint.length === 0) {
        return res.status(404).json({ message: 'No se encontraron puntos' });
      }

      const promiseDeletePoint = pointsCollection.deleteOne({
        _id: lastPoint[0]._id,
      });
      const promiseCreateUndoPoint = undoPointsCollection.insertOne(
        lastPoint[0]
      );

      await Promise.all([promiseDeletePoint, promiseCreateUndoPoint]);

      const points = await pointsCollection.find({}).toArray();

      return res.status(200).json({
        points,
        hasRedo: true,
        hasUndo: points.length > 0,
      });
    } catch (error) {
      console.log({ error });
      return res.status(500).json(error);
    }
  }

  return res.status(400).json({ message: 'El método no existe' });
};

export default handler;
