/* eslint-disable object-shorthand */
const User = required("../models/user");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(users => res.send({ data: users }))
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.getUsersId = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.postUser = (req, res) => {
  const owner = req.user._id;
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar, owner })
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: err.message }));
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
