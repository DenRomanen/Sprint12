/* eslint-disable quotes */
const express = require("express");
const mongoose = require("mongoose");

const { login, postUser } = require("./controllers/users");
const auth = require("./middlewares/auth");
const cards = require("./routes/cards");
const users = require("./routes/users");

mongoose.connect("mongodb://localhost:27017/mestodb", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.static("public"));
app.use(express.json());

app.post("/signin", login);
app.post("/signup", postUser);

app.use(auth);
app.use("/cards", cards);
app.use("/users", users);

app.listen(PORT);
