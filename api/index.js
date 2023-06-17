const express = require("express");

let route = express.Router({ mergeParams: true });

route.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Une erreur est survenue." });
});

module.exports = route;
