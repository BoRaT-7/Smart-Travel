// src/routes/review.routes.js
const express = require("express");
const reviewController = require("../controllers/review.controller");

const router = express.Router();

// each handler is a FUNCTION
router.get("/", reviewController.getReviews);
router.post("/", reviewController.createReview);
router.put("/:id", reviewController.updateReview);
router.delete("/:id", reviewController.deleteReview);

module.exports = router;
