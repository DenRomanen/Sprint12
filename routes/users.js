/* eslint-disable quotes */
/* eslint-disable no-useless-return */
const router = require("express").Router();
const path = require("path");
const fs = require("fs");

const sendUsers = (req, res) => {
  const dataPath = path.join(__dirname, `../data/users.json`);
  fs.readFile(dataPath, { encoding: "utf8" }, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    res.send(JSON.parse(data));
  });
};

const sendUsersId = (req, res) => {
  const dataPath = path.join(__dirname, `../data/users.json`);
  fs.readFile(dataPath, { encoding: "utf8" }, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    const users = JSON.parse(data);

    for (let i = 0; i < users.length; i += 1) {
      // eslint-disable-next-line no-underscore-dangle
      if (users[i]._id === req.params.id) {
        res.send(users[i]);
      }
    }
    res.status(404).send({ message: "Нет пользователя с таким id" });
    return;
  });
};

router.get("/users", sendUsers);
router.get("/users/:id", sendUsersId);
router.get("/:someRequest", (req, res) => {
  res.status(404).send({ message: "Запрашиваемый ресурс не найден" });
  return;
});

module.exports = router;
