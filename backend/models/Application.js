const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  resumeUrl: {
    type: String,
    required: true,
  },
  coverLetter: {
    type: String,
  },
  status: {
    type: String,
    enum: ['Pending', 'Reviewed', 'Interviewing', 'Rejected', 'Hired'],
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Application', applicationSchema);
