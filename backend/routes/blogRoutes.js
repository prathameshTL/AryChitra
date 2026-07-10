const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const { protect } = require('../middleware/authMiddleware');

// GET all blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ message: 'Server error fetching blogs' });
  }
});

// GET a single blog by ID
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).json({ message: 'Server error fetching blog' });
  }
});

// POST create new blog (Protected)
router.post('/', protect, async (req, res) => {
  try {
    const { title, excerpt, content, category, readTime, image, author, date } = req.body;
    
    if (!title || !excerpt || !content || !category || !image) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const newBlog = new Blog({
      title,
      excerpt,
      content,
      category,
      readTime: readTime || '5 min read',
      image,
      author,
      date
    });

    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({ message: 'Server error creating blog' });
  }
});

// PUT update blog (Protected)
router.put('/:id', protect, async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updatedBlog) return res.status(404).json({ message: 'Blog not found' });
    res.json(updatedBlog);
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(500).json({ message: 'Server error updating blog' });
  }
});

// DELETE a blog (Protected)
router.delete('/:id', protect, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({ message: 'Server error deleting blog' });
  }
});

module.exports = router;
