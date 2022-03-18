const express = require("express");
const env = require("dotenv");

app = express();
env.config();
const PORT = process.env.PORT || 5000;

app.listen(PORT);
