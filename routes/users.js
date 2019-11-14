/* eslint-disable quotes */
/* eslint-disable no-useless-return */
const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");

const {
  getUsers,
  getUsersId,
  patchProfile,
  patchAvatar
} = require("../controllers/users");

router.patch(
  "/me",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string()
        .required()
        .min(2)
        .max(20),
      abiut: Joi.string()
        .required()
        .min(2)
        .max(20)
    })
  }),
  patchProfile
);
router.patch(
  "/me/avatar",
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required()
      //  .regex(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/)
    })
  }),
  patchAvatar
);
router.get("/", getUsers);
router.get("/:userId", getUsersId);

router.get("/:someRequest", (req, res) => {
  res.status(404).send({ message: "Запрашиваемый ресурс не найден" });
  return;
});

module.exports = router;
