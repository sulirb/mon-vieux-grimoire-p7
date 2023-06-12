const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true, unique: true },
  year: { type: Number, required: true },
  genre: { type: Number, required: true },
  ratings: [
    {
      userId: { type: String, required: true },
      grade: { type: String, required: true },
    },
  ],
  averageRating: { type: Number, required: true },
});

module.exports = mongoose.model("Book", bookSchema);
