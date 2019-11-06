/* eslint-disable quotes */
const router = require("express").Router();

const {
  getCards,
  postCards,
  delCards,
  likeCard,
  dislikeCard
} = require("../controllers/cards");

router.get("/", getCards);
router.post("/", postCards);
router.delete("/:cardId", delCards);
router.put("/:cardId/likes", likeCard);
router.delete("/:cardId/likes", dislikeCard);

module.exports = router;
