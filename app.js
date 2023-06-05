const express = require("express");
const morgan = require("morgan");

const app = express();
app.use(morgan("dev", { immediate: true }));
app.use(morgan("dev"));
app.use(require("./router/index.js"));
module.exports = app;
