// src/middleware/auth.js
const jwt = require("jsonwebtoken");

// শুধু লগইন থাকা user দরকার হলে
function requireUser(req, res, next) {
  try {
    const authHeader =
      req.headers.authorization || req.headers.Authorization;

    // "Bearer token..."
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // পরে controller গুলোতে req.user থেকে id, email, role পাবে
    req.user = decoded;

    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

// শুধু admin দরকার হলে
function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
}

module.exports = {
  requireUser,
  requireAdmin,
};
