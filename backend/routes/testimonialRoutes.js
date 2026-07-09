const express = require('express');
const router = express.Router();
const Testimonial = require('../models/Testimonial');
const { protect } = require('../middleware/authMiddleware');

// GET /api/testimonials
// Get all testimonials (Public)
router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.status(200).json(testimonials);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    res.status(500).json({ error: 'Server error while fetching testimonials.' });
  }
});

// POST /api/testimonials
// Create a new testimonial (Admin only)
router.post('/', protect, async (req, res) => {
  try {
    const { name, role, content, image } = req.body;
    
    if (!name || !role || !content) {
      return res.status(400).json({ error: 'Name, role, and content are required.' });
    }

    const newTestimonial = new Testimonial({
      name,
      role,
      content,
      image: image || 'https://via.placeholder.com/150',
    });

    const savedTestimonial = await newTestimonial.save();
    res.status(201).json({ message: 'Testimonial created successfully', data: savedTestimonial });
  } catch (error) {
    console.error('Error creating testimonial:', error);
    res.status(500).json({ error: 'Server error while creating testimonial.' });
  }
});

// PUT /api/testimonials/:id
// Update a testimonial (Admin only)
router.put('/:id', protect, async (req, res) => {
  try {
    const { name, role, content, image } = req.body;
    
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }

    testimonial.name = name || testimonial.name;
    testimonial.role = role || testimonial.role;
    testimonial.content = content || testimonial.content;
    testimonial.image = image || testimonial.image;

    const updatedTestimonial = await testimonial.save();
    res.status(200).json({ message: 'Testimonial updated successfully', data: updatedTestimonial });
  } catch (error) {
    console.error('Error updating testimonial:', error);
    res.status(500).json({ error: 'Server error while updating testimonial.' });
  }
});

// DELETE /api/testimonials/:id
// Delete a testimonial (Admin only)
router.delete('/:id', protect, async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }
    res.status(200).json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    res.status(500).json({ error: 'Server error while deleting testimonial.' });
  }
});

module.exports = router;
