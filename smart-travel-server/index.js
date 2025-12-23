// server.js
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://borat156006_db_user:xaFAoIy8Irz6WhDY@cluster0.i8wpz9p.mongodb.net/?retryWrites=true&w=majority&tls=true";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    console.log("MongoDB Connected ✔");

    const db = client.db("smartTravelDB");
    const userCollection = db.collection("users");
    const reviewCollection = db.collection("reviews");

    // ========== AUTH ==========

    // REGISTER
    app.post("/register", async (req, res) => {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).send({
          success: false,
          message: "All fields are required",
        });
      }

      const existingUser = await userCollection.findOne({ email });
      if (existingUser) {
        return res.status(409).send({
          success: false,
          message: "User already exists",
        });
      }

      const newUser = { name, email, password };
      const result = await userCollection.insertOne(newUser);

      return res.send({
        success: true,
        message: "Registration successful",
        user: {
          id: result.insertedId,
          name,
          email,
        },
      });
    });

    // LOGIN
    app.post("/login", async (req, res) => {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).send({
          success: false,
          message: "Email and password are required",
        });
      }

      const user = await userCollection.findOne({ email });

      if (!user || user.password !== password) {
        return res.status(401).send({
          success: false,
          message: "Invalid email or password",
        });
      }

      const token = "demo-token-" + user._id.toString(); // simple fake token

      return res.send({
        success: true,
        message: "Login successful",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    });

    // ========== USERS CRUD ==========

    app.get("/users", async (req, res) => {
      const users = await userCollection.find().toArray();
      res.send(users);
    });

    app.get("/users/:id", async (req, res) => {
      const id = req.params.id;
      const user = await userCollection.findOne({ _id: new ObjectId(id) });
      res.send(user);
    });

    app.put("/users/:id", async (req, res) => {
      const id = req.params.id;
      const updatedUser = req.body;

      const result = await userCollection.updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            name: updatedUser.name,
            email: updatedUser.email,
          },
        },
        { upsert: false }
      );

      res.send(result);
    });

    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      const result = await userCollection.deleteOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    // ========== REVIEWS CRUD ==========

    app.post("/reviews", async (req, res) => {
      const { userId, name, comment, rating, avatar } = req.body;

      if (!userId || !name || !comment || !rating) {
        return res.status(400).send({
          success: false,
          message: "userId, name, comment and rating are required",
        });
      }

      const newReview = {
        userId,
        name,
        comment,
        rating: Number(rating),
        avatar: avatar || null,
        date: new Date().toISOString().split("T")[0],
      };

      const result = await reviewCollection.insertOne(newReview);

      res.send({
        success: true,
        message: "Review added",
        reviewId: result.insertedId,
      });
    });

    app.get("/reviews", async (req, res) => {
      const reviews = await reviewCollection
        .find({})
        .sort({ _id: -1 })
        .toArray();
      res.send(reviews);
    });

    app.get("/reviews/:id", async (req, res) => {
      const id = req.params.id;
      const review = await reviewCollection.findOne({ _id: new ObjectId(id) });
      res.send(review);
    });

    app.put("/reviews/:id", async (req, res) => {
      const id = req.params.id;
      const { name, comment, rating, reply } = req.body;

      const updateDoc = { $set: {} };

      if (name !== undefined) updateDoc.$set.name = name;
      if (comment !== undefined) updateDoc.$set.comment = comment;
      if (rating !== undefined) updateDoc.$set.rating = Number(rating);
      if (reply !== undefined) updateDoc.$set.reply = reply;

      const result = await reviewCollection.updateOne(
        { _id: new ObjectId(id) },
        updateDoc,
        { upsert: false }
      );

      res.send(result);
    });

    app.delete("/reviews/:id", async (req, res) => {
      const id = req.params.id;
      const result = await reviewCollection.deleteOne({
        _id: new ObjectId(id),
      });
      res.send(result);
    });
  } catch (err) {
    console.error("MONGO ERROR:", err);
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Smart Travel Server is running");
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
