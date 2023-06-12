const express = require("express");

const router = express();

router.use("/:id/rating", require("../api/books/[id]/rating.js").GET);
router.use("/bestrating", require("../api/books/bestrating.js"));
router.use("/:id", require("../api/books/[id]/index.js"));
router.use("/", require("../api/books/index.js"));

module.exports = router;
