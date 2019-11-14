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
      link: Joi.string().required()
      //.regex(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/)
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
