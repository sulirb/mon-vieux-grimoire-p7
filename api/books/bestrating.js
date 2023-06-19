const express = require("express");
const Book = require("../../models/Book");

let route = express.Router({ mergeParams: true });

route.get("/", async (req, res) => {
  try {
    const books = await Book.find().sort({ averageRating: -1 }).limit(3);
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error });
  }
});

module.exports = route;
