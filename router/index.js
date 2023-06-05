const express = require("express");

const router = express();

router.get("/api/book/:id", require("../api/book/[id].js").GET);
router.get("/api/book", require("../api/book/index.js"));
router.get("/api", require("../api/index.js"));

module.exports = router;
