const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  excerpt: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  readTime: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    default: 'AryChitra Team',
  },
  date: {
    type: String, // String to store formatted dates easily, or we can just use createdAt
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

// Pre-save hook to automatically format a nice date string if not provided
blogSchema.pre('save', function (next) {
  if (!this.date) {
    const options = { month: 'short', day: '2-digit', year: 'numeric' };
    this.date = this.createdAt.toLocaleDateString('en-US', options);
  }
  next();
});

module.exports = mongoose.model('Blog', blogSchema);
