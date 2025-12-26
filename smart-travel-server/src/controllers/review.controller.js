// src/controllers/review.controller.js
const { ObjectId } = require("mongodb");

let reviewsCollection;

function init(db) {
  reviewsCollection = db.collection("reviews");
}

async function addReview(req, res, next) {
  try {
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
  } catch (err) {
    next(err);
  }
}

async function getAllReviews(req, res, next) {
  try {
    const reviews = await reviewsCollection
      .find()
      .sort({ _id: -1 })
      .toArray();
    res.send(reviews);
  } catch (err) {
    next(err);
  }
}

async function getSingleReview(req, res, next) {
  try {
    const { id } = req.params;

    const review = await reviewsCollection.findOne({
      _id: new ObjectId(id),
    });

    res.send(review);
  } catch (err) {
    next(err);
  }
}

async function updateReview(req, res, next) {
  try {
    const { id } = req.params;
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
  } catch (err) {
    next(err);
  }
}

async function deleteReview(req, res, next) {
  try {
    const { id } = req.params;

    const result = await reviewsCollection.deleteOne({
      _id: new ObjectId(id),
    });

    res.send({
      success: true,
      message: "Review deleted successfully",
      deletedCount: result.deletedCount,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  init,
  addReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
};
