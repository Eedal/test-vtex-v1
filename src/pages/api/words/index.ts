import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from 'lib/mongodb';

const calculateIsPalindrome = (value: string) => {
  const word = value.toLocaleLowerCase();
  const wordInverted = word.split('').reverse().join('');

  return word === wordInverted;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await clientPromise;
  const db = client.db('vtex-test');
  const wordsCollection = db.collection('words');

  if (req.method === 'GET') {
    try {
      const words = await wordsCollection.find({}).sort({ _id: -1 }).toArray();

      return res.status(200).json(words);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  if (req.method === 'POST') {
    try {
      const value = req.body.word;
      const isPalindrome = calculateIsPalindrome(value);
      const word = await wordsCollection.insertOne({
        value,
        isPalindrome,
      });

      return res.status(200).json(word);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  return res.status(400).json({ message: 'El método no existe' });
};

export default handler;
