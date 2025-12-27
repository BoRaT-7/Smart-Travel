// src/controllers/contact.controller.js

let contactsCollection;

// init(db)
const init = (db) => {
  contactsCollection = db.collection("contacts");
};

// POST /api/contact
const createContactMessage = async (req, res, next) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email and message are required.",
      });
    }

    const doc = {
      name,
      email,
      phone: phone || null,
      subject: subject || null,
      message,
      createdAt: new Date(),
    };

    const result = await contactsCollection.insertOne(doc);

    return res.status(201).json({
      success: true,
      message: "Message received successfully.",
      data: { _id: result.insertedId, ...doc },
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/contact
const getAllContactMessages = async (req, res, next) => {
  try {
    const messages = await contactsCollection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return res.status(200).json({
      success: true,
      data: messages,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  init,
  createContactMessage,
  getAllContactMessages,
};
