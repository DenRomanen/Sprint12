/* eslint-disable quotes */
/* eslint-disable no-useless-return */
const router = require("express").Router();

const {
  getUsers,
  getUsersId,
  patchProfile,
  patchAvatar
} = require("../controllers/users");

router.patch("/me", patchProfile);
router.patch("/me/avatar", patchAvatar);
router.get("/", getUsers);
router.get("/:userId", getUsersId);

router.get("/:someRequest", (req, res) => {
  res.status(404).send({ message: "Запрашиваемый ресурс не найден" });
  return;
});

module.exports = router;
