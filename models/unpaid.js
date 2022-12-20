const mongoose = require('mongoose');

const unpaidSchema = new mongoose.Schema({
  unpaid: [{Type: Map}]
});

module.exports = unpaidSchema;