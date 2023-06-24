const express = require("express");
const Book = require("../../models/Book");
const { HttpError } = require("../../middlewares/error.js");

let route = express.Router({ mergeParams: true });

route.get("/", async (req, res) => {
  try {
    const books = await Book.find().sort({ averageRating: -1 }).limit(3);
    res.status(200).json(books);
  } catch (error) {
    throw new HttpError(401, { error });
  }
});

module.exports = route;
