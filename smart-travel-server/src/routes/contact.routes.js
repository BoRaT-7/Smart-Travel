const express = require("express");
const {
  createContactMessage,
  getAllContactMessages,
} = require("../controllers/contact.controller");

const router = express.Router();

router.post("/", createContactMessage);
router.get("/", getAllContactMessages);

module.exports = router;
