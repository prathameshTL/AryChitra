const mongoose = require('mongoose');
const Service = require('./models/Service');
const Project = require('./models/Project');
const Banner = require('./models/Banner');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/it-agency';

const defaultServices = [
  {
    title: 'Custom Software & Web Development',
    description: 'We build scalable, secure, and robust web applications and custom enterprise software using React, Node.js, Python and AWS.',
    icon: 'Code',
    iconColor: '#3b82f6',
    colorTheme: 'rgba(59, 130, 246, 0.1)',
    bullets: ['Full-Stack Web Apps', 'SaaS Platforms', 'Enterprise Solutions', 'API Development'],
    image: '/software_dev.png',
    link: '',
    featured: true,
    order: 1,
  },
  {
    title: 'Mobile Application Development',
    description: 'Premium native (iOS/Swift, Android/Kotlin) and cross-platform (React Native, Flutter) apps that provide seamless experiences across all devices.',
    icon: 'Smartphone',
    iconColor: '#8b5cf6',
    colorTheme: 'rgba(139, 92, 246, 0.1)',
    bullets: ['iOS & Android Apps', 'Cross-Platform', 'Mobile UI/UX', 'App Store Deployment'],
    image: '/mobile_dev.png',
    link: '',
    featured: true,
    order: 2,
  },
  {
    title: 'UI/UX Design',
    description: 'Designing intuitive and visually appealing interfaces that prioritize user satisfaction and engagement.',
    icon: 'PenTool',
    iconColor: '#ec4899',
    colorTheme: 'rgba(236, 72, 153, 0.1)',
    bullets: ['User Research', 'Wireframing', 'Prototyping', 'Visual Design'],
    image: '/ui_ux.png',
    link: '/services/ui-ux',
    featured: true,
    order: 3,
  },
  {
    title: 'Cloud Solutions',
    description: 'Scalable cloud architectures, deployment, and management using AWS, Azure, or Google Cloud.',
    icon: 'Cloud',
    iconColor: '#0ea5e9',
    colorTheme: 'rgba(14, 165, 233, 0.1)',
    bullets: ['Cloud Migration', 'DevOps & CI/CD', 'Serverless', 'Cloud Security'],
    image: '/cloud.png',
    link: '/services/cloud',
    featured: false,
    order: 4,
  },
  {
    title: 'AI & Machine Learning',
    description: 'Integrating intelligent solutions and predictive models to automate processes and unlock insights.',
    icon: 'Brain',
    iconColor: '#22c55e',
    colorTheme: 'rgba(34, 197, 94, 0.1)',
    bullets: ['Generative AI', 'Predictive Analytics', 'NLP', 'Computer Vision'],
    image: '/ai_ml.png',
    link: '/services/ai-ml',
    featured: false,
    order: 5,
  },
  {
    title: 'Digital Marketing',
    description: 'Data-driven marketing strategies, SEO, and campaigns designed to boost your online visibility and accelerate growth.',
    icon: 'BarChart',
    iconColor: '#f59e0b',
    colorTheme: 'rgba(245, 158, 11, 0.1)',
    bullets: ['SEO Strategy', 'Performance Ads', 'CRO', 'Content Marketing'],
    image: '/marketing.png',
    link: '/services/digital-marketing',
    featured: false,
    order: 6,
  },
  {
    title: 'IT Consulting',
    description: 'Expert guidance on technology strategy, digital transformation, and optimizing your IT infrastructure.',
    icon: 'Briefcase',
    iconColor: '#6366f1',
    colorTheme: 'rgba(99, 102, 241, 0.1)',
    bullets: ['Digital Transformation', 'Tech Strategy', 'Security Audits', 'Compliance'],
    image: '/consulting.png',
    link: '/services/it-consulting',
    featured: false,
    order: 7,
  },
];

const defaultProjects = [
  {
    name: 'Hotel Shiv Shambhoo',
    category: 'Hospitality Website',
    link: 'https://shivshambhoo.com/',
    description: 'A premium digital experience for a luxury hotel and restaurant, showcasing elegant rooms, fine dining menus, and event space bookings.',
    status: 'completed',
    order: 1,
  },
  {
    name: 'FinancesBazar Admin',
    category: 'Enterprise Admin Panel',
    link: 'https://umbarkarcs.com/',
    description: 'A comprehensive backend dashboard built to manage financial loans, employee tracking, and automated invoicing workflows.',
    status: 'completed',
    order: 2,
  },
  {
    name: 'Fintech Dashboard',
    category: 'Internal Web App',
    description: 'A data-rich analytics platform providing real-time insights, interactive charts, and predictive modeling for financial data.',
    status: 'completed',
    order: 3,
  },
  {
    name: 'College ERP System',
    category: 'Enterprise Software',
    description: 'A comprehensive management system for educational institutions handling admissions, academics, and administration.',
    status: 'ongoing',
    order: 4,
  },
  {
    name: 'Bank System',
    category: 'FinTech Platform',
    description: 'A secure and highly scalable core banking platform for managing transactions, accounts, and financial services.',
    status: 'ongoing',
    order: 5,
  },
  {
    name: 'Medical Billing',
    category: 'Healthcare SaaS',
    description: 'An automated billing and invoicing solution designed specifically for healthcare providers and clinics.',
    status: 'ongoing',
    order: 6,
  },
];

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected for content seeding...');

    const serviceCount = await Service.countDocuments();
    if (serviceCount === 0) {
      await Service.insertMany(defaultServices);
      console.log(`Seeded ${defaultServices.length} services.`);
    } else {
      console.log('Services already exist. Skipping.');
    }

    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      await Project.insertMany(defaultProjects);
      console.log(`Seeded ${defaultProjects.length} projects.`);
    } else {
      console.log('Projects already exist. Skipping.');
    }

    const bannerCount = await Banner.countDocuments();
    if (bannerCount === 0) {
      await Banner.create({});
      console.log('Seeded default banner.');
    } else {
      console.log('Banner already exists. Skipping.');
    }

    process.exit(0);
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
