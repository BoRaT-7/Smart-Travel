// src/routes/review.routes.js
const express = require("express");
const reviewController = require("../controllers/review.controller");
// const { requireUser } = require("../middleware/auth"); // ❌ আর দরকার নেই

const router = express.Router();

// Public: সবাই রিভিউ দেখতে পারবে
router.get("/", reviewController.getReviews);

// Public: রিভিউ create/update/delete – body.userId দিয়ে owner চেক করবে
router.post("/", reviewController.createReview);
router.put("/:id", reviewController.updateReview);
router.delete("/:id", reviewController.deleteReview);

module.exports = router;
