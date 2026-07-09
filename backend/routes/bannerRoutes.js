const express = require('express');
const router = express.Router();
const Banner = require('../models/Banner');
const { protect } = require('../middleware/authMiddleware');

// GET /api/banner - public, returns the single banner doc (creates default if none exists)
router.get('/', async (req, res) => {
  try {
    let banner = await Banner.findOne();
    if (!banner) {
      banner = await Banner.create({});
    }
    res.status(200).json(banner);
  } catch (error) {
    console.error('Error fetching banner:', error);
    res.status(500).json({ error: 'Server error while fetching banner.' });
  }
});

// PUT /api/banner - protected, upserts the single banner doc
router.put('/', protect, async (req, res) => {
  try {
    let banner = await Banner.findOne();
    if (!banner) {
      banner = await Banner.create(req.body);
    } else {
      Object.assign(banner, req.body);
      await banner.save();
    }
    res.status(200).json(banner);
  } catch (error) {
    console.error('Error updating banner:', error);
    res.status(500).json({ error: 'Server error while updating banner.' });
  }
});

module.exports = router;
