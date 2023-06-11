const express = require("express");

const route = express();

route.use((req, res) => {
  res.json("La meilleure note c'est 10/10");
});
module.exports = route;
