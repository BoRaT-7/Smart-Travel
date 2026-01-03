// src/controllers/auth.controller.js

let usersCollection;

// server.js থেকে init(db) কল হবে
function init(db) {
  usersCollection = db.collection("users");
  console.log("✅ Auth controller initialized (users collection ready)");
}

// ========== REGISTER (normal user) ==========
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
      password, // NOTE: real project e hash করে রাখা উচিত
      role: "user", // NEW: default role
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

// ========== NORMAL LOGIN ==========
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

    res.send({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role || "user",
      },
    });
  } catch (err) {
    next(err);
  }
}

// ========== ADMIN LOGIN ==========
async function adminLogin(req, res, next) {
  try {
    const { email, password } = req.body;

    // শুধু role: "admin" ইউজার খুঁজবে
    const user = await usersCollection.findOne({ email, role: "admin" });

    if (!user || user.password !== password) {
      return res.status(401).send({
        success: false,
        message: "Invalid admin credentials",
      });
    }

    res.send({
      success: true,
      message: "Admin login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  init,
  register,
  login,
  adminLogin,
};
