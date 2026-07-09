const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const nodemailer = require('nodemailer');
const { protect } = require('../middleware/authMiddleware');

// Setup nodemailer transporter
let transporter;

async function setupTransporter() {
  if (process.env.SMTP_HOST && process.env.SMTP_USER) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  } else {
    // Generate test SMTP service account from ethereal.email
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
    console.log('Created Ethereal Test Account for Orders. Check server logs after form submission for email link.');
  }
}

setupTransporter();

// POST /api/orders
// Create a new website order
router.post('/', async (req, res) => {
  try {
    const { name, email, websiteType, budget, details } = req.body;

    // Validate required fields
    if (!name || !email || !websiteType || !budget) {
      return res.status(400).json({ error: 'Please provide all required fields.' });
    }

    const newOrder = new Order({
      name,
      email,
      websiteType,
      budget,
      details
    });

    const savedOrder = await newOrder.save();

    // Send email notification
    if (transporter) {
      const mailOptions = {
        from: `"${name}" <${email}>`,
        to: process.env.ADMIN_EMAIL || 'admin@aryachitr.com',
        subject: `New Project Order: ${websiteType}`,
        text: `Name: ${name}\nEmail: ${email}\nWebsite Type: ${websiteType}\nBudget: ${budget}\n\nDetails:\n${details || 'No details provided'}`,
        html: `<p><strong>New Order Received</strong></p><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Website Type:</strong> ${websiteType}</p><p><strong>Budget:</strong> ${budget}</p><p><strong>Details:</strong><br/>${details || 'No details provided'}</p>`
      };

      const info = await transporter.sendMail(mailOptions);
      console.log('Order notification sent: %s', info.messageId);
      
      // If using Ethereal, log the preview URL
      if (info.messageId && !process.env.SMTP_HOST) {
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      }
    }

    res.status(201).json({ message: 'Order submitted successfully', order: savedOrder });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Server error while submitting order.' });
  }
});

// GET /api/orders
// Get all orders (for admin purposes in the future)
router.get('/', protect, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Server error while fetching orders.' });
  }
});

module.exports = router;
