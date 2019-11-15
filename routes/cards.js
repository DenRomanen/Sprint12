/* eslint-disable quotes */
const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");

const {
  getCards,
  postCards,
  delCards,
  likeCard,
  dislikeCard
} = require("../controllers/cards");

router.get("/", getCards);
router.post(
  "/",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string()
        .required()
        .min(2)
        .max(30),
      link: Joi.string()
        .required()
        .regex(
          /^(http:[\/][\/]|https:[\/][\/])(((\d{1,3}[\.]){3}\d{1,3}([:]\d{2,5})?)[\/]?|(w{3}[\.])?\w+([\.]\w+)?([^www][\.][a-zA-Z]{2,5})([\/]\w+)*(#)?[\/]?)/
        )
    })
  }),
  postCards
);
router.delete(
  "/:cardId",
  celebrate({
    body: Joi.object().keys({
      cardId: Joi.string().length(24)
    })
  }),
  delCards
);
router.put("/:cardId/likes", likeCard);
router.delete("/:cardId/likes", dislikeCard);

module.exports = router;
