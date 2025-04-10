import { MongoClient } from "mongodb";

const uri = process.env.NEXT_PUBLIC_MONGO_URI;
if (!uri) {
  throw new Error("DATABASE_URL environment variable is not defined");
}

const client = new MongoClient(uri);

export default async function ConnectDb() {
  try {
    if (!client.isConnected) {
      await client.connect();
      console.log("Connected to MongoDB");
    }
    const db = client.db("advaya");
    const participants = db.collection("participants");

    return participants;
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    throw new Error("Failed to connect to database");
  }
}
