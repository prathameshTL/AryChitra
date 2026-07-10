const mongoose = require('mongoose');

const pricingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  duration: { type: String, default: '' },
  highlighted: { type: Boolean, default: false },
  color: { type: String, required: true },
  features: { type: [String], required: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Pricing', pricingSchema);
