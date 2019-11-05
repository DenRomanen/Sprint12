/* eslint-disable quotes */
const Card = require("../models/card");

module.exports.getCards = (req, res) => {
  Card.find({})
    .then(cards => res.send({ data: cards }))
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.postCards = (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner })
    .then(card => res.status(201).send({ data: card }))
    .catch(err => res.status(400).send({ message: err.message }));
};

module.exports.delCards = (req, res) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .then(user => {
      if (req.user._id === user.owner.id) {
        Card.findByIdAndRemove(cardId)
          .then(user => res.send({ data: user }))
          .catch(err => res.status(500).send({ message: err.message }));
      } else if (user.length <= 0) {
        res.send({ message: "не найдено карточек" });
      } else {
        res.status(403).send({ message: "Это карта Вам не принадлежит" });
      }
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.likeCard = (req, res) => {
  const { cardId } = req.params;
  const owner = req.user._id;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: owner } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.dislikeCard = (req, res) => {
  const { cardId } = req.params;
  const owner = req.user._id;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: owner } }, // убрать _id из массива
    { new: true }
  )
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: err.message }));
};
