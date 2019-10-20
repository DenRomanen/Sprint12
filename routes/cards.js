/* eslint-disable quotes */
const router = require("express").Router();

const {
  getCards,
  postCards,
  delCards,
  likeCard,
  dislikeCard
} = require("../controllers/cards");

router.get("/cards", getCards);
router.post("/cards", postCards);
router.delete("/cards/:cardId", delCards);
router.put("/cards/:cardId/likes", likeCard);
router.delete("/cards/:cardId/likes", dislikeCard);

module.exports = router;
