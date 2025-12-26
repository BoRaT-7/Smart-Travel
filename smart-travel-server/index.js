// server.js
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ================= MONGODB CONFIG =================
const uri =
  "mongodb+srv://borat156006_db_user:RvDTMdHgAfWCcM4Y@cluster0.i8wpz9p.mongodb.net/smartTravelDB?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// ================= RUN SERVER =================
async function run() {
  try {
    await client.connect();
    console.log("✅ MongoDB Connected Successfully");

    const db = client.db("smartTravelDB");
    const usersCollection = db.collection("users");
    const reviewsCollection = db.collection("reviews");

    // ================= AUTH =================

    // REGISTER
    app.post("/register", async (req, res) => {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).send({
          success: false,
          message: "All fields are required",
        });
      }

      const existingUser = await usersCollection.findOne({ email });
      if (existingUser) {
        return res.status(409).send({
          success: false,
          message: "User already exists",
        });
      }

      const result = await usersCollection.insertOne({
        name,
        email,
        password,
        createdAt: new Date(),
      });

      res.send({
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

      const user = await usersCollection.findOne({ email });

      if (!user || user.password !== password) {
        return res.status(401).send({
          success: false,
          message: "Invalid email or password",
        });
      }

      res.send({
        success: true,
        message: "Login successful",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    });

    // ================= USERS =================

    app.get("/users", async (req, res) => {
      const users = await usersCollection.find().toArray();
      res.send(users);
    });

    // ================= REVIEWS =================

    // ADD REVIEW
    app.post("/reviews", async (req, res) => {
      const { name, comment, rating } = req.body;

      if (!name || !comment || !rating) {
        return res.status(400).send({
          success: false,
          message: "Name, comment and rating required",
        });
      }

      const result = await reviewsCollection.insertOne({
        name,
        comment,
        rating,
        date: new Date(),
      });

      res.send({
        success: true,
        message: "Review added successfully",
        id: result.insertedId,
      });
    });

    // GET ALL REVIEWS
    app.get("/reviews", async (req, res) => {
      const reviews = await reviewsCollection
        .find()
        .sort({ _id: -1 })
        .toArray();
      res.send(reviews);
    });

    // GET SINGLE REVIEW
    app.get("/reviews/:id", async (req, res) => {
      const id = req.params.id;

      const review = await reviewsCollection.findOne({
        _id: new ObjectId(id),
      });

      res.send(review);
    });

    // UPDATE REVIEW
    app.put("/reviews/:id", async (req, res) => {
      const id = req.params.id;
      const { name, comment, rating } = req.body;

      const updateDoc = {
        $set: {
          name,
          comment,
          rating,
          updatedAt: new Date(),
        },
      };

      const result = await reviewsCollection.updateOne(
        { _id: new ObjectId(id) },
        updateDoc
      );

      res.send({
        success: true,
        message: "Review updated successfully",
        modifiedCount: result.modifiedCount,
      });
    });

    // DELETE REVIEW
    app.delete("/reviews/:id", async (req, res) => {
      const id = req.params.id;

      const result = await reviewsCollection.deleteOne({
        _id: new ObjectId(id),
      });

      res.send({
        success: true,
        message: "Review deleted successfully",
        deletedCount: result.deletedCount,
      });
    });
  } catch (error) {
    console.error("❌ MongoDB ERROR:", error);
  }
}

run();

// ================= ROOT =================
app.get("/", (req, res) => {
  res.send("🚀 Smart Travel Server is running");
});

// ================= LISTEN =================
app.listen(port, () => {
  console.log(`✅ Server running on port: ${port}`);
});
