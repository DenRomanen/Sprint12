/* eslint-disable no-useless-escape */
/* eslint-disable quotes */

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { celebrate, Joi, errors } = require("celebrate");

const { login, postUser } = require("./controllers/users");
const auth = require("./middlewares/auth");
const error = require("./middlewares/error");
const cards = require("./routes/cards");
const users = require("./routes/users");
const { requestLogger, errorLogger } = require("./middlewares/logger");

mongoose.connect("mongodb://localhost:27017/mestodb", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});
const { PORT = 3000 } = process.env;
const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Сервер сейчас упадёт");
  }, 0);
});

app.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string()
        .required()
        .email(),
      password: Joi.string()
        .required()
        .min(5)
    })
  }),
  login
);
app.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string()
        .required()
        .min(2)
        .max(30),
      about: Joi.string()
        .required()
        .min(10)
        .max(30),
      avatar: Joi.string()
        .required()
        .regex(
          /^(http:[\/][\/]|https:[\/][\/])(((\d{1,3}[\.]){3}\d{1,3}([:]\d{2,5})?)[\/]?|(w{3}[\.])?\w+([\.]\w+)?([^www][\.][a-zA-Z]{2,5})([\/]\w+)*(#)?[\/]?)/
        )
        .min(6),
      email: Joi.string()
        .required()
        .email(),
      password: Joi.string()
        .required()
        .min(8)
    })
  }),
  postUser
);

app.use(auth);
app.use("/cards", cards);
app.use("/users", users);

app.use(errorLogger);

app.use(errors());
// celebrate

app.use(error);

app.listen(PORT);
