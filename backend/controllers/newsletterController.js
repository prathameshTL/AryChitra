const Newsletter = require('../models/Newsletter');

exports.subscribe = async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Check if email already exists
    const existingSubscriber = await Newsletter.findOne({ email });
    if (existingSubscriber) {
      return res.status(400).json({ message: 'Email is already subscribed' });
    }

    const newSubscriber = new Newsletter({ email });
    await newSubscriber.save();

    res.status(201).json({ message: 'Successfully subscribed to the newsletter!' });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({ message: 'Server error while subscribing. Please try again later.' });
  }
};
