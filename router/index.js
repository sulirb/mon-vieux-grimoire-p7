const express = require("express");

const router = express.Router();

router.use("/api/books/:id/rating", require("../api/books/[id]/rating.js"));
router.use("/api/books/bestrating", require("../api/books/bestrating.js"));
router.use("/api/books/:id", require("../api/books/[id]/index.js"));
router.use("/api/books", require("../api/books/index.js"));
router.use("/api/auth/login", require("../api/auth/login.js"));
router.use("/api/auth/signup", require("../api/auth/signup.js"));
router.use("/api", require("../api/index.js"));

module.exports = router;
