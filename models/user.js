/* eslint-disable func-names */
/* eslint-disable object-shorthand */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const validator = require("validator");

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

  avatar: {
    type: String,
    validate: {
      validator: function(v) {
        return /^(http:[\/][\/]|https:[\/][\/])/.test(v);
      },
      message: props => `${props.value} Эта строка должна быть ссылкой!`
    },
    required: true
  },
  email: {
    type: String,
    validate: {
      validator: function(email) {
        return validator.isEmail(email);
      },
      message: props => `${props.value} Эта строка должна быть почтой!`
    },
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false
  }
});

userSchema.statics.findUserByCredentials = function(email, password) {
  return this.findOne({ email })
    .select("+password")
    .then(user => {
      if (!user) {
        return Promise.reject(new Error("Неправильные почта или пароль"));
      }
      return bcrypt.compare(password, user.password).then(matched => {
        if (!matched) {
          return Promise.reject(new Error("Неправильные почта или пароль"));
        }
        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);
