// src/controllers/review.controller.js
const { ObjectId } = require("mongodb");

let reviewsCollection;

exports.init = (db) => {
  reviewsCollection = db.collection("reviews");
};

// GET /api/reviews
exports.getReviews = async (req, res, next) => {
  try {
    const reviews = await reviewsCollection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    res.json(reviews);
  } catch (err) {
    console.error("getReviews error:", err);
    next(err);
  }
};

// POST /api/reviews (no JWT, uses body.userId & body.name)
exports.createReview = async (req, res, next) => {
  try {
    const { userId, name, comment, rating } = req.body;

    if (!userId || !name || !comment || !rating) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const doc = {
      userId,
      name,
      comment,
      rating: Number(rating),
      date: new Date().toISOString().split("T")[0],
      createdAt: new Date(),
    };

    const result = await reviewsCollection.insertOne(doc);

    res.status(201).json({
      success: true,
      reviewId: result.insertedId,
    });
  } catch (err) {
    console.error("createReview error:", err);
    next(err);
  }
};

// PUT /api/reviews/:id (only owner by body.userId)
exports.updateReview = async (req, res, next) => {
  try {
    const reviewId = req.params.id;
    const { userId, comment, rating } = req.body;

    if (!userId || !comment || !rating) {
      return res.status(400).json({
        success: false,
        message: "userId, comment and rating are required",
      });
    }

    const review = await reviewsCollection.findOne({
      _id: new ObjectId(reviewId),
    });
    if (!review) {
      return res
        .status(404)
        .json({ success: false, message: "Review not found" });
    }

    if (review.userId !== userId) {
      return res
        .status(403)
        .json({ success: false, message: "You cannot edit this review" });
    }

    const result = await reviewsCollection.updateOne(
      { _id: new ObjectId(reviewId) },
      {
        $set: {
          comment,
          rating: Number(rating),
        },
      }
    );

    res.json({
      success: true,
      acknowledged: result.acknowledged,
      modifiedCount: result.modifiedCount,
    });
  } catch (err) {
    console.error("updateReview error:", err);
    next(err);
  }
};

// DELETE /api/reviews/:id (only owner by body.userId)
exports.deleteReview = async (req, res, next) => {
  try {
    const reviewId = req.params.id;
    const { userId } = req.body;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "userId is required" });
    }

    const review = await reviewsCollection.findOne({
      _id: new ObjectId(reviewId),
    });
    if (!review) {
      return res
        .status(404)
        .json({ success: false, message: "Review not found" });
    }

    if (review.userId !== userId) {
      return res
        .status(403)
        .json({ success: false, message: "You cannot delete this review" });
    }

    const result = await reviewsCollection.deleteOne({
      _id: new ObjectId(reviewId),
    });

    res.json({
      success: result.deletedCount > 0,
      deletedCount: result.deletedCount,
    });
  } catch (err) {
    console.error("deleteReview error:", err);
    next(err);
  }
};
