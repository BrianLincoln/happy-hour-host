const mongoose = require('mongoose');

const {
  Schema,
} = mongoose;
const bcrypt = require('bcrypt-nodejs');

function validateEmail(email) {
  const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  return re.test(email);
}

const User = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    validate: [validateEmail, 'Please fill a valid email address'],
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

User.methods.generateHash = password =>
  bcrypt.hashSync(
    password, bcrypt.genSaltSync(8), null
  );

// checking if password is valid
User.methods.validPassword = password =>
  bcrypt.compareSync(password, this.password);

const Model = mongoose.model('User', User);
module.exports = Model;
