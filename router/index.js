const express = require("express");

const router = express();

router.get("/api/books/:id/rating", require("../api/books/[id]rating.js").GET);
router.get("/api/books/bestrating", require("../api/books/bestrating.js"));
router.get("/api/books/:id", require("../api/books/[id].js").GET);
router.get("/api/books", require("../api/books/index.js"));
router.get("/api", require("../api/index.js"));

module.exports = router;
