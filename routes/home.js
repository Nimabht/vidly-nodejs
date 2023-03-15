const express = require("express");
const home = express.Router();

home.get("/", (_req, res) => {
  res.render("index", { title: "my title", message: "Home page" });
});

module.exports = home;
