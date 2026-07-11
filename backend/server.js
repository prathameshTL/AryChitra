const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
require('dotenv').config();
const orderRoutes = require('./routes/orderRoutes');
const contactRoutes = require('./routes/contactRoutes');
const authRoutes = require('./routes/authRoutes');
const bannerRoutes = require('./routes/bannerRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const projectRoutes = require('./routes/projectRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const blogRoutes = require('./routes/blogRoutes');
const teamRoutes = require('./routes/teamRoutes');
const pricingRoutes = require('./routes/pricingRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes');
const jobRoutes = require('./routes/jobRoutes');
const caseStudyRoutes = require('./routes/caseStudyRoutes');
const clientAuthRoutes = require('./routes/clientAuthRoutes');
const clientOrderRoutes = require('./routes/clientOrderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();
  
// Middleware
app.use(helmet({ crossOriginResourcePolicy: false })); // allows loading cross-origin resources like images
app.use(cors({ origin: process.env.FRONTEND_URL || '*' })); // Restrict in production
app.use(express.json());

// Sanitize data
app.use(mongoSanitize());
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 150 // limit each IP to 150 requests per windowMs
});
app.use('/api', limiter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database Connection
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/orders', orderRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/banner', bannerRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/pricing', pricingRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/case-studies', caseStudyRoutes);
app.use('/api/client/auth', clientAuthRoutes);
app.use('/api/client/orders', clientOrderRoutes);
app.use('/api/payments', paymentRoutes);

// Base route for testing
app.get('/', (req, res) => {
  res.send('IT Agency Backend is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
