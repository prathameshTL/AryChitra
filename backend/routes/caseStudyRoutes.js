const express = require('express');
const router = express.Router();
const CaseStudy = require('../models/CaseStudy');
const { protect } = require('../middleware/authMiddleware');

// Get all case studies (public)
router.get('/', async (req, res) => {
  try {
    const filter = req.query.all === 'true' ? {} : { isPublished: true };
    const caseStudies = await CaseStudy.find(filter).sort({ createdAt: -1 });
    res.json(caseStudies);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching case studies', error: error.message });
  }
});

// Get a single case study
router.get('/:id', async (req, res) => {
  try {
    const caseStudy = await CaseStudy.findById(req.params.id);
    if (!caseStudy) return res.status(404).json({ message: 'Case study not found' });
    res.json(caseStudy);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching case study', error: error.message });
  }
});

// Create a case study (Admin only)
router.post('/', protect, async (req, res) => {
  try {
    const newCaseStudy = new CaseStudy(req.body);
    await newCaseStudy.save();
    res.status(201).json(newCaseStudy);
  } catch (error) {
    res.status(400).json({ message: 'Error creating case study', error: error.message });
  }
});

// Update a case study (Admin only)
router.put('/:id', protect, async (req, res) => {
  try {
    const updatedCaseStudy = await CaseStudy.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedCaseStudy) return res.status(404).json({ message: 'Case study not found' });
    res.json(updatedCaseStudy);
  } catch (error) {
    res.status(400).json({ message: 'Error updating case study', error: error.message });
  }
});

// Delete a case study (Admin only)
router.delete('/:id', protect, async (req, res) => {
  try {
    const deletedCaseStudy = await CaseStudy.findByIdAndDelete(req.params.id);
    if (!deletedCaseStudy) return res.status(404).json({ message: 'Case study not found' });
    res.json({ message: 'Case study deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting case study', error: error.message });
  }
});

module.exports = router;
