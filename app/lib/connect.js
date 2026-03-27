import { MongoClient } from "mongodb";

let client = null;

function getMongoUri() {
  // Prefer DATABASE_URL (server secret), but support NEXT_PUBLIC_MONGO_URI for older setups.
  return process.env.DATABASE_URL || process.env.NEXT_PUBLIC_MONGO_URI;
}

export default async function ConnectDb() {
  try {
    const uri = getMongoUri();
    if (!uri) {
      throw new Error(
        "MongoDB connection string is missing. Set `DATABASE_URL` (recommended) or `NEXT_PUBLIC_MONGO_URI`."
      );
    }

    if (!client) {
      client = new MongoClient(uri);
    }

    if (!client.isConnected) {
      await client.connect();
    }
    const db = client.db("advaya");
    const participants = db.collection("participants");

    return participants;
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    throw new Error("Failed to connect to database");
  }
}
