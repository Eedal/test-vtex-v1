import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from 'lib/mongodb';
import { ObjectId } from 'mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await clientPromise;
  const db = client.db('vtex-test');
  const wordsCollection = db.collection('words');

  if (req.method === 'DELETE') {
    try {
      const { id } = req.query;
      if (typeof id !== 'string') {
        return res.status(404).json({ message: 'El id no es un string' });
      }
      if (!id) {
        return res
          .status(400)
          .json({ message: 'No se proporcionó un id válido' });
      }

      const result = await wordsCollection.deleteOne({ _id: new ObjectId(id) });
      if (result.deletedCount === 1) {
        return res
          .status(200)
          .json({ message: 'Palabra eliminada correctamente' });
      }

      return res
        .status(404)
        .json({ message: 'La palabra no se encontró en la colección' });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  return res.status(400).json({ message: 'El método no existe' });
};

export default handler;
