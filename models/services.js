const {Schema, SchemaTypes} = require('mongoose');

const serviceSchema = new Schema({
  name: {type: String, required: true},
  prices: [{type: Map, of: SchemaTypes.Mixed}],
  img: {type: String},
  dcm: {type: Number}
});

module.exports = serviceSchema;