import { MongoClient } from "mongodb";

let client = null;

export function getMongoUri() {
  return process.env.DATABASE_URL || process.env.NEXT_PUBLIC_MONGO_URI;
}

export async function getAdvayaDb() {
  const uri = getMongoUri();
  if (!uri) return null;
  if (!client) {
    client = new MongoClient(uri);
  }
  await client.connect();
  return client.db("advaya");
}

export default async function ConnectDb() {
  const db = await getAdvayaDb();
  if (!db) {
    throw new Error(
      "MongoDB connection string is missing. Set `DATABASE_URL` (recommended) or `NEXT_PUBLIC_MONGO_URI`."
    );
  }
  return db.collection("participants");
}
