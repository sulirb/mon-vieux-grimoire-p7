const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true, unique: true },
  year: { type: Number, required: true },
});

module.exports = mongoose.model("Thing", bookSchema);
