// eslint-disable-next-line import/no-extraneous-dependencies
import { MongoClient, MongoClientOptions } from 'mongodb';

const uri = process.env.MONGODB_URI || '';
const options: MongoClientOptions = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

let client: MongoClient;
// eslint-disable-next-line import/no-mutable-exports
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error('Add Mongo URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    global._mongoClientPromise = client.connect();
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
