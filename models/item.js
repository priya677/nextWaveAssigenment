const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  img: { type: String, required: true },
  summary: { type: String, required: true },
  quantity: { type: Number, required: false } // Quantity is now optional
});

module.exports = mongoose.model('Item', ItemSchema);
