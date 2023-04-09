import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from 'lib/mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await clientPromise;
  const db = client.db('vtex-test');

  if (req.method === 'GET') {
    try {
      const pointsCollection = db.collection('points');
      const undoPointsCollection = db.collection('undo-points');

      const lastUndoPoint = await undoPointsCollection
        .find()
        .sort({ _id: -1 })
        .limit(1)
        .toArray();

      if (lastUndoPoint.length === 0) {
        return res.status(404).json({ message: 'No se encontraron puntos' });
      }

      const promiseDeleteUndoPoint = undoPointsCollection.deleteOne({
        _id: lastUndoPoint[0]._id,
      });

      const promiseCreatePoint = pointsCollection.insertOne(lastUndoPoint[0]);

      await Promise.all([promiseDeleteUndoPoint, promiseCreatePoint]);

      const points = await pointsCollection.find({}).toArray();

      const undoPoints = await undoPointsCollection.find({}).toArray();

      return res
        .status(200)
        .json({ points, hasUndo: true, hasRedo: undoPoints.length > 0 });
    } catch (error) {
      console.log({ error });
      return res.status(500).json(error);
    }
  }

  return res.status(400).json({ message: 'El método no existe' });
};

export default handler;
