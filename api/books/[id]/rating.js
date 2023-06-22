const Book = require("../../../models/Book.js");
const express = require("express");
const auth = require("../../../middlewares/auth.js");
const { HttpError } = require("../../../middlewares/error.js");

let route = express.Router({ mergeParams: true });

route.post("/", auth, async (req, res) => {
  const userId = req.auth.userId;
  const grade = req.body.grade;

  try {
    const book = await Book.findById(req.params.id);
    if (!book) throw new HttpError(404, { message: "Livre non trouvé !" });

    // Vérifier si l'utilisateur a déjà noté le livre
    const userRating = book.ratings.find((rating) => rating.userId === userId);
    if (userRating)
      throw new HttpError(404, { message: "Vous avez déjà noté ce livre !" });

    // Ajouter la nouvelle note au tableau des notes existantes
    book.ratings.push({ userId, grade });

    // Recalculer la note moyenne
    const ratingsCount = book.ratings.length;
    const ratingsSum = book.ratings.reduce(
      (sum, rating) => sum + rating.grade,
      0
    );
    book.averageRating = ratingsSum / ratingsCount;

    await book.save();

    res.status(201).json({ message: "Note enregistrée !", book });
  } catch (error) {
    throw new HttpError(500, {
      message: "Une erreur s'est produite lors de l'enregistrement de la note.",
    });
  }
});

module.exports = route;
