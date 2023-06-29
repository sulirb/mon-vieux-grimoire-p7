const Book = require("../../models/Book.js");
const express = require("express");
const auth = require("../../middlewares/auth.js");
const multer = require("../../middlewares/multer-config.js");
const optimizeImage = require("../../middlewares/multer-sharp.js");
const { bookObjectPost } = require("../../utils/book.js");
const { HttpError } = require("../../middlewares/error.js");

let route = express.Router({ mergeParams: true });

route.get("/", async (req, res) => {
  const books = await Book.find();
  if (!books) {
    throw new HttpError(404, {
      message: "Erreur dans la récuperation des livres",
    });
  }
  res.status(200).json(books);
});

route.post("/", auth, multer, optimizeImage, async (req, res) => {
  const bookObject = bookObjectPost(req);
  const book = new Book({
    ...bookObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });

  await book.save().catch(() => {
    throw new HttpError(401, { message: "Livre non enregistré !" });
  });
  res.status(201).json({ message: "Livre enregistré !" });
});

module.exports = route;
