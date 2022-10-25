const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, required: false},
  cart: [{type: Map, required: false}],
  access: {type: Boolean, default: false, required: true},
  bills: [{type: Map, required: false}]
});

module.exports = userSchema;
