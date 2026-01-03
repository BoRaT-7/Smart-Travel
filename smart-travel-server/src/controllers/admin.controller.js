// src/controllers/admin.controller.js
let db;

function init(database) {
  db = database;
  console.log("✅ Admin controller initialized");
}

// future এ এখানে mongo collections ধরো, যেমন:
// const usersCollection = () => db.collection("users");

module.exports = {
  init,
};
