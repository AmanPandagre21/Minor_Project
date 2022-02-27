const express = require("express");
const app = express();

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "server/config/config.env" });
}

app.get("/", (req, res) => {
  res.json({
    success: "True",
    author: "Aman Pandagre",
  });
});

module.exports = app;
