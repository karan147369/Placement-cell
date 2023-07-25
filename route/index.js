const express = require("express");
const routing = express.Router();
const handleLogin = require("../controller/handleLogin");

routing.get("*", (req, res) => {
  res.render("home.ejs");
});

routing.get("/login", async (req, res) => await handleLogin(req, res));

module.exports = routing;
