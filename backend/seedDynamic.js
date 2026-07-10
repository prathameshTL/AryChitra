require('dotenv').config();
const mongoose = require('mongoose');
const Team = require('./models/Team');
const Pricing = require('./models/Pricing');

const MONGO_URI = process.env.MONGO_URI;

const members = [
  { name: 'Alex Johnson', role: 'Lead Engineer', image: 'https://i.pravatar.cc/300?img=11', order: 1 },
  { name: 'Sarah Lee', role: 'Product Designer', image: 'https://i.pravatar.cc/300?img=5', order: 2 },
  { name: 'Michael Chen', role: 'Cloud Architect', image: 'https://i.pravatar.cc/300?img=12', order: 3 },
  { name: 'Emily Davis', role: 'AI Specialist', image: 'https://i.pravatar.cc/300?img=9', order: 4 },
];

const pricingTiers = [
  {
    name: 'Starter',
    description: 'Perfect for small businesses and startups looking to establish an online presence.',
    price: '₹25,000',
    duration: 'starting at',
    highlighted: false,
    color: '#0ea5e9',
    features: [
      'Responsive Website (up to 5 pages)',
      'Basic SEO Setup',
      'Contact Form Integration',
      'Mobile Friendly Design',
      '1 Month Free Support'
    ],
    order: 1
  },
  {
    name: 'Professional',
    description: 'Ideal for growing businesses needing custom features and advanced integrations.',
    price: '₹75,000',
    duration: 'starting at',
    highlighted: true,
    color: '#8b5cf6',
    features: [
      'Custom Web Application / E-commerce',
      'Advanced UI/UX Design',
      'Payment Gateway Integration',
      'Admin Dashboard',
      'Advanced SEO & Analytics',
      '3 Months Free Support'
    ],
    order: 2
  },
  {
    name: 'Enterprise',
    description: 'For large scale organizations requiring robust architecture and scalable solutions.',
    price: 'Custom',
    duration: 'quote',
    highlighted: false,
    color: '#ec4899',
    features: [
      'Full-Stack Custom Architecture',
      'Mobile App (iOS & Android)',
      'Cloud Infrastructure Setup',
      'AI/ML Integrations',
      'Dedicated Team',
      '24/7 Priority Support'
    ],
    order: 3
  }
];

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected.');
    await Team.deleteMany({});
    await Pricing.deleteMany({});
    
    await Team.insertMany(members);
    console.log('Team seeded.');

    await Pricing.insertMany(pricingTiers);
    console.log('Pricing seeded.');

    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  });
