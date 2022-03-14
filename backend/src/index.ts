import express from "express";
import bodyParser from "body-parser";

import userRoutes from "./routes/user-routes";

const app = express();

app.use(bodyParser.json());

app.use(userRoutes);

app.listen(8000);
