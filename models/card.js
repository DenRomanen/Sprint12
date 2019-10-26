/* eslint-disable func-names */
/* eslint-disable object-shorthand */
const mongoose = require("mongoose");

const cardSchema = mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true
  },
  link: {
    type: String,
    validate: {
      validator: function(v) {
        return /^(http:[\/][\/]|https:[\/][\/])/.test(v);
      },
      message: props => `${props.value} Эта строка должна быть ссылкой!`
    },
    required: true
  },
  owner: {
    require: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },

  likes: {
    default: [],
    type: [mongoose.Schema.Types.ObjectId],
    ref: "user"
  }
});

module.exports = mongoose.model("card", cardSchema);
