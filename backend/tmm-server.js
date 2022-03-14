const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.get("/", (req, res) => {
  res.send("Hi");
});

app.listen(8000, console.log("server started"));
