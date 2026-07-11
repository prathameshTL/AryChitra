const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const Application = require('../models/Application');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Get all jobs (active only for public, all for admin if query ?all=true)
router.get('/', async (req, res) => {
  try {
    const filter = req.query.all === 'true' ? {} : { isActive: true };
    const jobs = await Job.find(filter).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs', error: error.message });
  }
});

// Get a single job
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching job', error: error.message });
  }
});

// Create a job (Admin only)
router.post('/', protect, async (req, res) => {
  try {
    const newJob = new Job(req.body);
    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    res.status(400).json({ message: 'Error creating job', error: error.message });
  }
});

// Update a job (Admin only)
router.put('/:id', protect, async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedJob) return res.status(404).json({ message: 'Job not found' });
    res.json(updatedJob);
  } catch (error) {
    res.status(400).json({ message: 'Error updating job', error: error.message });
  }
});

// Delete a job (Admin only)
router.delete('/:id', protect, async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);
    if (!deletedJob) return res.status(404).json({ message: 'Job not found' });
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting job', error: error.message });
  }
});

// Apply to a job (Public)
router.post('/:id/apply', upload.single('resume'), async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job || !job.isActive) {
      return res.status(404).json({ message: 'Job is not available' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a resume (PDF/DOC)' });
    }

    const { name, email, phone, coverLetter } = req.body;
    
    // Construct the URL to the uploaded file
    const resumeUrl = `/uploads/${req.file.filename}`;

    const newApplication = new Application({
      jobId: job._id,
      name,
      email,
      phone,
      resumeUrl,
      coverLetter
    });

    await newApplication.save();
    res.status(201).json({ message: 'Application submitted successfully', application: newApplication });
  } catch (error) {
    res.status(400).json({ message: 'Error submitting application', error: error.message });
  }
});

// Get all applications (Admin only)
router.get('/applications/all', protect, async (req, res) => {
  try {
    const applications = await Application.find().populate('jobId', 'title department').sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching applications', error: error.message });
  }
});

// Update application status (Admin only)
router.put('/applications/:id', protect, async (req, res) => {
  try {
    const { status } = req.body;
    const application = await Application.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!application) return res.status(404).json({ message: 'Application not found' });
    res.json(application);
  } catch (error) {
    res.status(400).json({ message: 'Error updating application', error: error.message });
  }
});

module.exports = router;
