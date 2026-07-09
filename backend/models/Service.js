const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, default: 'Code' }, // name of a lucide-react icon
  iconColor: { type: String, default: '#3b82f6' },
  colorTheme: { type: String, default: 'rgba(59, 130, 246, 0.1)' },
  bullets: { type: [String], default: [] },
  image: { type: String, default: '' },
  link: { type: String, default: '' },
  featured: { type: Boolean, default: false }, // shown on homepage teaser
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
