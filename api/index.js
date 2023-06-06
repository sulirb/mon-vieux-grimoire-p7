const express = require("express");

const route = express();

route.use((req, res) => {
  res.json("On est sur l'api de book");
});
module.exports = route;
