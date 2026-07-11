const mongoose = require('mongoose');

const caseStudySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  clientName: {
    type: String,
    required: true,
  },
  industry: {
    type: String,
    required: true,
  },
  challenge: {
    type: String,
    required: true,
  },
  solution: {
    type: String,
    required: true,
  },
  results: {
    type: String,
    required: true,
  },
  metrics: [{
    label: String, // e.g., "Increase in sales"
    value: String  // e.g., "150%"
  }],
  imageUrl: {
    type: String,
  },
  tags: {
    type: [String],
    default: [],
  },
  isPublished: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('CaseStudy', caseStudySchema);
