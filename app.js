const express = require("express");
const mongoose = require("mongoose");
const config = require("./src/config/mongo_config");
const body_parser = require("body-parser");
require("dotenv").config();
const cors = require("cors");
const app = express();
const setRes = require("./src/utils/response");
const resCode = require("./src/config/res_code_config");

app.use(cors());
const port = process.env.PORT || 4000;
app.use(express.json());
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));

require("./src/route")(app);

app.get("/", (req, res) => {
  res.send(`<h1>Welcome to LMS</h1>`);
});

mongoose.connect(config.mongo.url + config.mongo.db);

const conn = mongoose.connection;
conn.on("open", () => console.log("connected"));
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  return res
    .status(err.status || 500)
    .send(setRes(resCode.InternalServer, null, true, err.message));
});

app.listen(port, () => console.log(`listining to port ${port}`));
