const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  fname: {type: String, required: true},
  lname: {type: String, required: true},
  bname: {type: String, required: false},
  username: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, required: false},
  cart: [{type: Map, required: false}]
});

module.exports = userSchema;
