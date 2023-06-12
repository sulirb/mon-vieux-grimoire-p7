const User = require("../../models/User.js");
const jwt = require("../../managers/jwt.js");
const express = require("express");
const bcrypt = require("bcrypt");

let route = express.Router({ mergeParams: true });
const LOGIN_ERROR = { message: "Paire login/mot de passe incorrecte" };

route.post("/", async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).catch((error) => {
    throw res.status(500).json({ error });
  });
  if (!user) return res.status(401).json(LOGIN_ERROR);

  const valid = await bcrypt
    .compare(password, user.password)
    .catch((error) => res.status(500).json({ error }));
  if (!valid) return res.status(401).json(LOGIN_ERROR);

  const userId = user._id;
  res.status(200).json({ userId, token: jwt.sign({ userId }) });
});

module.exports = route;
