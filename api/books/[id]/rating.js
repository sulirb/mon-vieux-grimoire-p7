const Book = require("../../../models/Book.js");
const express = require("express");
const auth = require("../../../middlewares/auth.js");
const { HttpError } = require("../../../middlewares/error.js");

let route = express.Router({ mergeParams: true });

route.post("/", auth, async (req, res) => {
  const userId = req.auth.userId;
  const grade = req.body.grade;

  try {
    const book = await Book.findOne({ _id: req.params.id });
    if (!book) throw new HttpError(404, { message: "Livre non trouvé !" });

    const userRating = book.ratings.find((rating) => rating.userId === userId);
    if (userRating)
      throw new HttpError(404, { message: "Vous avez déjà noté ce livre !" });

    book.ratings.push({ userId, grade });

    const ratingsCount = book.ratings.length;
    const ratingsSum = book.ratings.reduce(
      (sum, rating) => sum + rating.grade,
      0
    );
    book.averageRating = ratingsSum / ratingsCount || 0;

    await book.save();

    res.status(201).json({ message: "Note enregistrée !", book });
  } catch (error) {
    console.log(error);
    throw new HttpError(500, {
      message: "Une erreur s'est produite lors de l'enregistrement de la note.",
    });
  }
});

module.exports = route;
