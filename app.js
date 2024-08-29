const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { db } = require("./DB/db");
const Router = require("./ROUTES/routes");

const app = express();

app.use(express.json());
app.use(cors());
db();
app.use(Router);


app.listen(process.env.PORT, () => console.log(`Servidor iniciado en puerto: ${process.env.PORT}`));

