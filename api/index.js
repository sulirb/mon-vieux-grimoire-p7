const express = require("express");
const { HttpError } = require("../middlewares/error.js");

let route = express.Router({ mergeParams: true });

route.use((req, res, next) => {
  throw new HttpError(404, { error: "Chemin non trouvé." });
});

module.exports = route;
