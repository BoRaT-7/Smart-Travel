// server/index.js
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection URI
const uri = "mongodb+srv://borat156006_db_user:6eusUTrhp3CjMnLH@cluster0.i8wpz9p.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect MongoDB
    await client.connect();
    console.log("MongoDB Connected Successfully");

    const db = client.db("smartTravelDB");
    const usersCollection = db.collection("users");

    // POST /register
    app.post("/register", async (req, res) => {
      console.log("POST /register hit", req.body);
      try {
        const { name, email, password } = req.body;

        // Validation
        if (!name || !email || !password) {
          return res.status(400).send({ message: "Name, Email, and Password are required" });
        }

        // Check if user exists
        const exist = await usersCollection.findOne({ email });
        if (exist) {
          return res.status(400).send({ message: "User already exists" });
        }

        const newUser = { name, email, password };
        const result = await usersCollection.insertOne(newUser);

        res.send({
          success: true,
          message: "Registration Successful",
          userId: result.insertedId
        });
      } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Registration Failed" });
      }
    });

    // GET / test route
    app.get("/", (req, res) => {
      res.send("Smart Travel Server is Running");
    });

    // Start server
    app.listen(port, () => {
      console.log(`Server running on port: ${port}`);
    });

  } catch (err) {
    console.error("MongoDB Connect Error:", err);
  }
}

run().catch(console.dir);
