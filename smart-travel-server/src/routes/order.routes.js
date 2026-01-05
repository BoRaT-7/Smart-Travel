// src/routes/order.routes.js
const express = require("express");
const {
  createOrder,
  getAllOrders,
  getOrderById,
} = require("../controllers/order.controller");
// const { requireUser } = require("../middleware/auth"); // ❌ এখানে দরকার নেই

const router = express.Router();

// Public: shop order create
router.post("/", createOrder);

// Public: সব order দেখা (admin dashboard এ ইউজ করবে)
router.get("/", getAllOrders);

// Public: single order
router.get("/:id", getOrderById);

module.exports = router;
