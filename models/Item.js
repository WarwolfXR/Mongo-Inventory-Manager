const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  price: Number
});

module.exports = mongoose.model('Item', ItemSchema);
