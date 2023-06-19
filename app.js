const express = require("express");
const cors = require("cors");
require("express-async-errors");
const morgan = require("morgan");
const mongoose = require("mongoose");

const app = express();

mongoose
  .connect(
    "mongodb+srv://losc596:JEySrUJ7nUrOTLR@moncluster.qs7ap8b.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./images"));
app.use(morgan("dev", { immediate: true }));
app.use(morgan("dev"));
app.use(require("./router/index.js"));
module.exports = app;
