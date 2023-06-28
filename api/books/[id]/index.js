const Book = require("../../../models/Book.js");
const express = require("express");
const auth = require("../../../middlewares/auth.js");
const multer = require("../../../middlewares/multer-config.js");
const fs = require("fs");
const { HttpError } = require("../../../middlewares/error.js");
const { bookObjectById } = require("../../../utils/book.js");
const optimizeImage = require("../../../middlewares/multer-sharp.js");

let route = express.Router({ mergeParams: true });

route.get("/", async (req, res) => {
  const book = await Book.findOne({ _id: req.params.id });
  if (!book)
    throw new HttpError(404, {
      message: "Erreur dans la récuperation des livres",
    });
  res.status(200).json(book);
});

route.put("/", auth, multer, optimizeImage, async (req, res) => {
  const bookObject = bookObjectById(req);
  console.log(bookObject);
  bookObject.userId = req.auth.userId;
  const book = await Book.findOne({ _id: req.params.id });
  if (book.userId !== req.auth.userId)
    throw new HttpError(401, { message: "Not authorized" });

  await Book.updateOne(
    { _id: req.params.id },
    { ...bookObject, _id: req.params.id }
  ).catch(() => {
    throw new HttpError(400, { message: "La modification a échoué" });
  });
  res.status(200).json({ message: "Modification réussie" });
});

route.delete("/", auth, async (req, res) => {
  const book = await Book.findOne({ _id: req.params.id });
  if (book.userId !== req.auth.userId)
    throw new HttpError(401, { message: "Non autorisé!" });

  const filename = book.imageUrl.split("/images/")[1];
  try {
    fs.unlinkSync(`images/${filename}`);
    await Book.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Livre supprimé !" });
  } catch (error) {
    console.error(error);
    throw new HttpError(400, { message: "La suppression a échoué" });
  }
});

module.exports = route;
