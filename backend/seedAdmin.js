const mongoose = require('mongoose');
const Admin = require('./models/Admin');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/it-agency';

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected for seeding...');
    
    // Check if admin already exists
    const adminExists = await Admin.findOne({ email: 'admin@aryachitr.com' });
    if (adminExists) {
      console.log('Admin already exists. Exiting...');
      process.exit(0);
    }

    const admin = new Admin({
      email: 'admin@aryachitr.com',
      password: 'password123',
    });

    await admin.save();
    console.log('Default Admin created! (admin@aryachitr.com / password123)');
    process.exit(0);
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
