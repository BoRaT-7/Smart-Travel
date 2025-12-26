// src/controllers/auth.controller.js
let usersCollection;

function init(db) {
  usersCollection = db.collection("users");
}

async function register(req, res, next) {
  try {
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
      password, // NOTE: real project e hash korte hobe
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
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await usersCollection.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    // ekhane token nai, sudhu plain user pathাচ্ছি
    res.send({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { init, register, login };
