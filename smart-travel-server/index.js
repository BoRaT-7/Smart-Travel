const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// 🔥 Your MongoDB connection string
const uri =
  "mongodb+srv://borat156006_db_user:xaFAoIy8Irz6WhDY@cluster0.i8wpz9p.mongodb.net/?retryWrites=true&w=majority&tls=true";

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
    console.log("MongoDB Connected ✔");

    const userCollection = client.db('smartTravelDB').collection('users');

    // ------------------------------
    // REGISTER (POST)
    // ------------------------------
    app.post('/register', async (req, res) => {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.send({
          success: false,
          message: "All fields are required"
        });
      }

      // 📌 Check if user already exists
      const existingUser = await userCollection.findOne({ email });

      if (existingUser) {
        return res.send({
          success: false,
          message: "User already exists"
        });
      }

      // 📌 Insert new user
      const newUser = { name, email, password };
      const result = await userCollection.insertOne(newUser);

      return res.send({
        success: true,
        message: "Registration successful",
        insertedId: result.insertedId,
      });
    });

    // ------------------------------
    // GET ALL USERS
    // ------------------------------
    app.get('/users', async (req, res) => {
      const users = await userCollection.find().toArray();
      res.send(users);
    });

    // ------------------------------
    // GET SINGLE USER
    // ------------------------------
    app.get('/users/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const user = await userCollection.findOne(query);
      res.send(user);
    });

    // ------------------------------
    // UPDATE USER
    // ------------------------------
    app.put('/users/:id', async (req, res) => {
      const id = req.params.id;
      const updatedUser = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };

      const updateDoc = {
        $set: {
          name: updatedUser.name,
          email: updatedUser.email,
        },
      };

      const result = await userCollection.updateOne(filter, updateDoc, options);
      res.send(result);
    });

    // ------------------------------
    // DELETE USER
    // ------------------------------
    app.delete('/users/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await userCollection.deleteOne(query);
      res.send(result);
    });

  } catch (err) {
    console.error("MONGO ERROR:", err);
  }
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Smart Travel Server is running');
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
