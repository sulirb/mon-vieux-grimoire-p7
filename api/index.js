const express = require("express");

let route = express.Router({ mergeParams: true });

route.use((req, res) => {
  res.json("On est sur l'api de book");
});
module.exports = route;
