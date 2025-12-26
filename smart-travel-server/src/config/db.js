// src/config/db.js
const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI is not set in .env");
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectDB() {
  await client.connect();
  console.log("✅ MongoDB Connected Successfully");
  return client.db(process.env.DB_NAME || "smartTravelDB");
}

module.exports = {
  client,
  connectDB,
};
