const express = require("express");

const router = express();

router.use("/api/books", require("./books.js"));
router.use("/api/auth/login", require("../api/auth/login.js"));
router.use("/api/auth/signup", require("../api/auth/signup.js"));
router.use("/api", require("../api/index.js"));

module.exports = router;
