const Book = require("../../../models/Book.js");
const express = require("express");
const auth = require("../../../middlewares/auth.js");

let route = express.Router({ mergeParams: true });

route.post("/", auth, async (req, res) => {
  const bookObject = JSON.parse(req.body.book);
  delete bookObject._id;
  delete bookObject._userId;
  const rating = new Book({
    userId: req.auth.userId,
    ratings: req.ratings.grade,
  });

  try {
    await rating.save();
    res.status(201).json({ message: "Note enregistré !" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Note non enregistré !" });
  }
});

module.exports = route;
