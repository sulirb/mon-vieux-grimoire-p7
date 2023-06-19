const Book = require("../../../models/Book.js");
const express = require("express");
const auth = require("../../../middlewares/auth.js");

let route = express.Router({ mergeParams: true });

route.post("/", auth, async (req, res) => {
  const grades = req.ratings.map((rating) => rating.grade);
  const rating = new Book({
    userId: req.auth.userId,
    ratings: grades,
  });

  try {
    await rating.save();
    res.status(201).json({ message: "Note enregistré !" });
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "Note non enregistré !" });
  }
});

module.exports = route;
