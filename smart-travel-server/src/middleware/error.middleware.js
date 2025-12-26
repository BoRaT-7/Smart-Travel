// src/middleware/error.middleware.js
function errorHandler(err, req, res, next) {
  console.error("❌ ERROR:", err);

  if (res.headersSent) {
    return next(err);
  }

  res.status(500).send({
    success: false,
    message: "Internal Server Error",
  });
}

module.exports = errorHandler;
