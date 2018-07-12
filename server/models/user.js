const mongoose = require('mongoose');

const {
  Schema,
} = mongoose;
const bcrypt = require('bcrypt-nodejs');

const User = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

User.methods.generateHash = function (password) {
  return bcrypt.hashSync(
    password, bcrypt.genSaltSync(8), null
  );
};

// checking if password is valid
User.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const Model = mongoose.model('User', User);
module.exports = Model;
