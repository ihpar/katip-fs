const express = require("express");
const bodyParser = require("body-parser");
const env = require("dotenv");

const usersRoutes = require("./routes/users-routes");

app = express();

app.use(bodyParser.json());

app.use(usersRoutes);

env.config();
const PORT = process.env.PORT || 8000;

app.listen(PORT);
