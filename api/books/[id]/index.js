const Book = require("../../../models/Book.js");
const express = require("express");
const auth = require("../../../middlewares/auth.js");
const multer = require("../../../middlewares/multer-config.js");
const fs = require("fs");
const { HttpError } = require("../../../middlewares/error.js");
const { bookObjectById } = require("../../../middlewares/bookUtils.js");
const optimizeImage = require("../../../middlewares/multer-sharp.js");

let route = express.Router({ mergeParams: true });

route.get("/", async (req, res, next) => {
  const book = await Book.findOne({ _id: req.params.id });
  if (book) {
    res.status(200).json(book);
  } else {
    throw new HttpError(404, {
      message: "Erreur dans la récuperation des livres",
    });
  }
});

route.put("/", auth, multer, optimizeImage, async (req, res, next) => {
  const bookObject = bookObjectById(req);
  delete bookObject._userId;
  const book = await Book.findOne({ _id: req.params.id });
  if (book.userId != req.auth.userId)
    throw new HttpError(401, { message: "Not authorized" });
  try {
    await Book.updateOne(
      { _id: req.params.id },
      { ...bookObject, _id: req.params.id }
    );
    res.status(200).json({ message: "Modification réussie" });
  } catch (error) {
    console.error(error);
    throw new HttpError(400, { message: "La modification a échoué" });
  }
});

route.delete("/", auth, async (req, res, next) => {
  const book = await Book.findOne({ _id: req.params.id });
  if (book.userId != req.auth.userId)
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
