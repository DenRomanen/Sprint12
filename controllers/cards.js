/* eslint-disable quotes */
const Card = require("../models/card");
const {
  BadRequesrError,
  InternalServerError,
  ForbiddenError
} = require("../errors/errorsStatus");

const userBadRequest = (req, res, next) => {
  req
    .then(cards => {
      if (!cards) {
        throw new BadRequesrError("Произошла ошибка");
      }
      res.status(201).send({ data: cards });
    })
    .catch(next);
};

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

module.exports.getCards = (req, res) => {
  userBadRequest(Card.find({}), res);
};

module.exports.postCards = (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  userBadRequest(Card.create({ name, link, owner }), res);
};

//--------------------
module.exports.delCards = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .then(user => {
      if (req.user._id === user.owner.toString()) {
        userServerErrorRequest(Card.findByIdAndRemove(cardId), res);
      } else if (user.length <= 0) {
        throw new ForbiddenError("карточек нет, но все в твоих руках");
      } else {
        throw new ForbiddenError("Это карта Вам не принадлежит");
      }
    })
    .catch(next);
};
//---------

module.exports.likeCard = (req, res) => {
  const { cardId } = req.params;
  const owner = req.user._id;
  userServerErrorRequest(
    Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: owner } }, // добавить _id в массив, если его там нет
      { new: true }
    ),
    res
  );
};

module.exports.dislikeCard = (req, res) => {
  const { cardId } = req.params;
  const owner = req.user._id;
  userServerErrorRequest(
    Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: owner } }, // убрать _id из массива
      { new: true }
    ),
    res
  );
};
