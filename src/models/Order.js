const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  productName: { type: String, required: true },
  paymentMode: { type: String, required: true },
  landmark: { type: String, required: true }
});

module.exports = mongoose.model('Order', orderSchema);
