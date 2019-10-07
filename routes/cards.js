/* eslint-disable quotes */
const router = require("express").Router();
const path = require("path");
const fs = require("fs");

const sendCards = (req, res) => {
  const dataPath = path.join(__dirname, `../data/cards.json`);
  fs.readFile(dataPath, { encoding: "utf8" }, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    res.send(JSON.parse(data));
  });
};
router.get("/cards", sendCards);

module.exports = router;
