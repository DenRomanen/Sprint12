/* eslint-disable quotes */
const express = require("express");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/mestodb", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

const cards = require("./routes/cards");
const users = require("./routes/users");

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: "5da786d1b37f99218899ba69"
  };

  next();
});

app.use("/", cards);
app.use("/", users);

app.listen(PORT);
