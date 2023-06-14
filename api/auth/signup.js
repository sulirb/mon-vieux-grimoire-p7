const User = require("../../models/User.js");
const express = require("express");
const bcrypt = require("bcrypt");

let route = express.Router({ mergeParams: true });

route.post("/", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hash });
    await user.save();
    res.status(201).json({ message: "Utilisateur créé !" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = route;
