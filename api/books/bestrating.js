const express = require("express");
const Book = require("../../models/Book");
const { HttpError } = require("../../middlewares/error.js");

let route = express.Router({ mergeParams: true });

route.get("/", async (req, res) => {
  const books = await Book.find()
    .sort({ averageRating: -1 })
    .limit(3)
    .catch(() => {
      throw new HttpError(401, {
        message: "Erreur dans la récuperation des livres",
      });
    });
  res.status(200).json(books);
});

module.exports = route;
