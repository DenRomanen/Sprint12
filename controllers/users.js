/*
 eslint-disable object-shorthand */
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(users => res.send({ data: users }))
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.getUsersId = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then(user => {
      if (user == null) {
        res.status(404).send({ message: "Пользователь не найден" });
      } else {
        res.send({ data: user });
      }
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.postUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;

  bcrypt.hash(password, 10).then(hash =>
    User.create({ name, about, avatar, email, password: hash })
      .then(user => res.status(201).send({ data: user }))
      .catch(err => res.status(500).send({ message: err.message }))
  );
};

module.exports.patchProfile = (req, res) => {
  const owner = req.user._id;

  const { name, about } = req.body;
  User.findByIdAndUpdate(owner, { name: name, about: about }, { new: true })
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.patchAvatar = (req, res) => {
  const owner = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(owner, { avatar: avatar }, { new: true })
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then(user => {
      const token = jwt.sign({ _id: user._id }, "1", { expiresIn: "7d" });
      res.cookie("jwt", token, { httpOnly: true });
      res.status(201).send({ user, token });
    })
    .catch(err => {
      res.status(401).send({ message: err.message });
    });
};
