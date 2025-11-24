const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB Connection
const uri = "mongodb+srv://borat156006_db_user:xaFAoIy8Irz6WhDY@cluster0.i8wpz9p.mongodb.net/?retryWrites=true&w=majority&tls=true";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    const db = client.db("smartTravelDB");
    const usersCollection = db.collection("users");

    // ✅ সঠিকভাবে POST /register route
    app.post("/register", async (req, res) => {
      console.log("POST /register hit", req.body);
      try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
          return res.status(400).send({ message: "Name, Email, and Password are required" });
        }

        const exist = await usersCollection.findOne({ email });
        if (exist) {
          return res.status(400).send({ message: "User already exists" });
        }

        // এখানে `newUser` declare হচ্ছে
        const newUser = { name, email, password };
        const result = await usersCollection.insertOne(newUser);

        res.send({ success: true, message: "Registration Successful", userId: result.insertedId });
      } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Registration Failed" });
      }
    });

    // GET / route
    app.get("/", (req, res) => {
      res.send("Smart Travel Server is Running");
    });

    // Start server
    app.listen(port, () => {
      console.log(`Server running on port: ${port}`);
    });
  } catch (err) {
    console.error(err);
  }
}

run().catch(console.dir);



