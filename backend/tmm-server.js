const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hi");
});

app.listen(6000, console.log("server started"));
