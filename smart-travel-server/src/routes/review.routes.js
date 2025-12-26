// src/routes/review.routes.js
const express = require("express");
const {
  addReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
} = require("../controllers/review.controller");

const router = express.Router();

router.post("/", addReview);
router.get("/", getAllReviews);
router.get("/:id", getSingleReview);
router.put("/:id", updateReview);
router.delete("/:id", deleteReview);

module.exports = router;
