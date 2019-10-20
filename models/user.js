/* eslint-disable func-names */
/* eslint-disable object-shorthand */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 20,
    require: true
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 20,
    require: true
  },
  owner: {
    require: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  avatar: {
    type: String,
    validate: {
      validator: function(v) {
        return /^(http:[\/][\/]|https:[\/][\/])/.test(v);
      },
      message: props => `${props.value} Эта строка должна быть ссылкой!`
    },
    require: true
  }
});

module.exports = mongoose.model("user", userSchema);
