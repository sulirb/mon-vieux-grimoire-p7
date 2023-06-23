const Book = require("../../models/Book.js");
const express = require("express");
const auth = require("../../middlewares/auth.js");
const multer = require("../../middlewares/multer-config.js");
const optimizeImage = require("../../middlewares/multer-sharp.js");

let route = express.Router({ mergeParams: true });

route.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error });
  }
});

route.post("/", auth, multer, optimizeImage, async (req, res) => {
  const bookObject = object(req);
  const book = new Book({
    ...bookObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });

  try {
    await book.save();
    res.status(201).json({ message: "Livre enregistré !" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Livre non enregistré !" });
  }
});

function object(req) {
  const bookObject = JSON.parse(req.body.book);
  delete bookObject._id;
  delete bookObject._userId;
  return bookObject;
}

module.exports = route;
