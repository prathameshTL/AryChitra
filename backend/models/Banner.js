const mongoose = require('mongoose');

const statSchema = new mongoose.Schema({
  value: { type: String, required: true },
  label: { type: String, required: true },
}, { _id: false });

const bannerSchema = new mongoose.Schema({
  tag: { type: String, default: '🚀 Transform Your Digital Presence' },
  titleLine1: { type: String, default: 'We Build Custom Software &' },
  titleHighlight: { type: String, default: 'Mobile Apps' },
  subtitle: {
    type: String,
    default: 'From stunning portfolios to complex scalable web applications. We handle the design, development, and deployment so you can focus on your business.',
  },
  primaryBtnText: { type: String, default: 'Get Started' },
  primaryBtnLink: { type: String, default: '/services' },
  secondaryBtnText: { type: String, default: 'Contact Us' },
  secondaryBtnLink: { type: String, default: '/contact' },
  stats: {
    type: [statSchema],
    default: [
      { value: '50+', label: 'Projects Delivered' },
      { value: '99%', label: 'Client Satisfaction' },
      { value: '24/7', label: 'Expert Support' },
      { value: '5+', label: 'Years Experience' },
    ],
  },
}, { timestamps: true });

module.exports = mongoose.model('Banner', bannerSchema);
