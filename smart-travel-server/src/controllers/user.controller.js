// src/controllers/user.controller.js
let usersCollection;

function init(db) {
  usersCollection = db.collection("users");
}

async function getAllUsers(req, res, next) {
  try {
    const users = await usersCollection.find().toArray();
    res.send(users);
  } catch (err) {
    next(err);
  }
}

module.exports = { init, getAllUsers };
