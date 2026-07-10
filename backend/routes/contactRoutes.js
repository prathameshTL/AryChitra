const express = require('express');
const router = express.Router();
const ContactMessage = require('../models/ContactMessage');
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
    console.log('Created Ethereal Test Account. Check server logs after form submission for email link.');
  }
}

setupTransporter();

// POST /api/contact
// Submit a contact message
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Please provide name, email, and message.' });
    }

    const newMessage = new ContactMessage({
      name,
      email,
      phone,
      subject,
      message
    });

    const savedMessage = await newMessage.save();

    // Send email notification
    if (transporter) {
      const mailOptions = {
        from: `"${name}" <${email}>`,
        to: process.env.ADMIN_EMAIL || 'admin@aryachitr.com',
        subject: subject ? `Contact Form: ${subject}` : 'New Contact Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\nSubject: ${subject || 'Not provided'}\n\nMessage:\n${message}`,
        html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${phone || 'Not provided'}</p><p><strong>Subject:</strong> ${subject || 'Not provided'}</p><p><strong>Message:</strong><br/>${message}</p>`
      };

      const info = await transporter.sendMail(mailOptions);
      console.log('Message sent: %s', info.messageId);
      
      // If using Ethereal, log the preview URL
      if (info.messageId && !process.env.SMTP_HOST) {
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      }
    }

    res.status(201).json({ message: 'Message submitted successfully', data: savedMessage });
  } catch (error) {
    console.error('Error submitting contact message:', error);
    res.status(500).json({ error: 'Server error while submitting message.' });
  }
});

// GET /api/contact
// Get all contact messages (Admin only)
router.get('/', protect, async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Server error while fetching messages.' });
  }
});

module.exports = router;
