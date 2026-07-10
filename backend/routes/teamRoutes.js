const express = require('express');
const router = express.Router();
const Team = require('../models/Team');
const authMiddleware = require('../middleware/authMiddleware');

// Get all team members
router.get('/', async (req, res) => {
  try {
    const team = await Team.find().sort({ order: 1 });
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching team members', error: error.message });
  }
});

// Create new team member (Admin only)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const newTeamMember = new Team(req.body);
    await newTeamMember.save();
    res.status(201).json(newTeamMember);
  } catch (error) {
    res.status(400).json({ message: 'Error creating team member', error: error.message });
  }
});

// Update team member (Admin only)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const updatedTeamMember = await Team.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedTeamMember) {
      return res.status(404).json({ message: 'Team member not found' });
    }
    res.json(updatedTeamMember);
  } catch (error) {
    res.status(400).json({ message: 'Error updating team member', error: error.message });
  }
});

// Delete team member (Admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deletedTeamMember = await Team.findByIdAndDelete(req.params.id);
    if (!deletedTeamMember) {
      return res.status(404).json({ message: 'Team member not found' });
    }
    res.json({ message: 'Team member deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting team member', error: error.message });
  }
});

module.exports = router;
