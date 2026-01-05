// src/routes/contact.routes.js
const express = require("express");
const {
  createContactMessage,
  getAllContactMessages,
} = require("../controllers/contact.controller");
const { requireUser } = require("../middleware/auth");

const router = express.Router();

// Contact form থেকে send করা সাধারণত public
router.post("/", createContactMessage);

// Inbox দেখতে সাধারণত admin – চাইলে requireUser/requireAdmin দাও
router.get("/", requireUser, getAllContactMessages);

module.exports = router;
