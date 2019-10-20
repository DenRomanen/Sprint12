/* eslint-disable quotes */
/* eslint-disable no-useless-return */
const router = require("express").Router();

const {
  getUsers,
  getUsersId,
  postUser,
  patchProfile,
  patchAvatar
} = require("../controllers/users");

router.get("/users", getUsers);
router.get("/users/:userId", getUsersId);
router.post("/users", postUser);
router.patch("/users/me", patchProfile);
router.patch("/users/me/avatar", patchAvatar);

router.get("/:someRequest", (req, res) => {
  res.status(404).send({ message: "Запрашиваемый ресурс не найден" });
  return;
});

module.exports = router;
