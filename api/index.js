const express = require("express");

let route = express.Router({ mergeParams: true });

route.use((req, res) => {
  res.status(404).json("ERREUR 404");
});
module.exports = route;
