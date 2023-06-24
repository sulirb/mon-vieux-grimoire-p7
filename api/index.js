const express = require("express");
const { HttpError } = require("../middlewares/error.js");

let route = express.Router({ mergeParams: true });

route.use((err, req, res, next) => {
  throw new HttpError(500, { error: "Une erreur est survenue." });
});

module.exports = route;
