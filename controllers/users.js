/*
 eslint-disable object-shorthand */
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const {
  NotFoundError,
  InternalServerError
} = require("../errors/errorsStatus");

const userServerErrorRequest = (req, res, next) => {
  req
    .then(user => {
      if (!user) {
        throw new InternalServerError("Произошла ошибка сервера");
      }
      res.status(200).send({ data: user });
    })
    .catch(next);
};

module.exports.getUsers = (req, res) => {
  userServerErrorRequest(User.find({}), res);
};

module.exports.getUsersId = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .then(user => {
      if (user == null) {
        throw new NotFoundError("Пользователь не найден");
      } else {
        res.send({ data: user });
      }
    })
    .catch(next);
};

module.exports.postUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then(hash =>
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash
      })
    )
    .then(user => {
      res.status(201).send({ name: user.name, email: user.email });
    })
    .catch(next);
};

module.exports.patchProfile = (req, res) => {
  const owner = req.user._id;

  const { name, about } = req.body;
  userServerErrorRequest(
    User.findByIdAndUpdate(
      owner,
      { name: name, about: about },
      { runValidators: true },
      { new: true }
    ),
    res
  );

  /*User.findByIdAndUpdate(owner, { name: name, about: about }, { new: true })
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: err.message }));*/
};

module.exports.patchAvatar = (req, res) => {
  const owner = req.user._id;
  const { avatar } = req.body;

  userServerErrorRequest(
    User.findByIdAndUpdate(
      owner,
      { avatar: avatar },
      { runValidators: true },
      { new: true }
    ),
    res
  );

  /* User.findByIdAndUpdate(owner, { avatar: avatar }, { new: true })
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: err.message }));*/
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  const { NODE_ENV, JWT_SECRET } = process.env;
  return User.findUserByCredentials(email, password)
    .then(user => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
        { expiresIn: "7d" }
      );
      res.cookie("jwt", token, { httpOnly: true });

      res.status(201).send({ token });
    })
    .catch(next);
  /*.catch(err => {
      res.status(401).send({ message: err.message });
    });*/
};
