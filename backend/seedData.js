const mongoose = require('mongoose');
require('dotenv').config();

const Banner = require('./models/Banner');
const Service = require('./models/Service');
const Project = require('./models/Project');
const Testimonial = require('./models/Testimonial');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/it-agency';

const seedData = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected for seeding...');

    // Seed Banner
    const bannerCount = await Banner.countDocuments();
    if (bannerCount === 0) {
      await Banner.create({
        tag: '🚀 Crafting Digital Futures',
        titleLine1: 'We Build Custom Software &',
        titleHighlight: 'Mobile Apps',
        subtitle: 'From stunning portfolios to complex scalable systems, AryChitra delivers top-tier tech solutions.',
        primaryBtnText: 'Start Your Project',
        primaryBtnLink: '/contact',
        secondaryBtnText: 'View Our Work',
        secondaryBtnLink: '/portfolio',
        stats: [{ value: '50+', label: 'Projects Delivered' }, { value: '99%', label: 'Client Satisfaction' }]
      });
      console.log('Banner seeded');
    }

    // Seed Services
    const serviceCount = await Service.countDocuments();
    if (serviceCount === 0) {
      await Service.insertMany([
        {
          icon: '🌐',
          title: 'Web Development',
          description: 'Full-stack web applications built with React, Node.js, and modern architectures.',
          color: '#6C63FF',
          tags: ['React', 'Node.js', 'Next.js']
        },
        {
          icon: '📱',
          title: 'Mobile App Development',
          description: 'Native and cross-platform mobile apps with React Native and Flutter.',
          color: '#00D9FF',
          tags: ['React Native', 'Flutter', 'iOS']
        },
        {
          icon: '☁️',
          title: 'Cloud & DevOps',
          description: 'Scalable cloud architecture on AWS, GCP, and Azure. CI/CD pipelines.',
          color: '#10B981',
          tags: ['AWS', 'Docker', 'Kubernetes']
        }
      ]);
      console.log('Services seeded');
    }

    // Seed Projects
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      await Project.insertMany([
        {
          name: 'Hotel Shiv Shambhoo',
          category: 'Web',
          description: 'A premium digital experience for a luxury hotel featuring an elegant UI.',
          image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
          link: 'https://shivshambhoo.com/',
          color: '#6C63FF',
          tags: ['React', 'Node.js', 'MongoDB']
        },
        {
          name: 'FinancesBazar Admin',
          category: 'App',
          description: 'A highly secure, complex enterprise admin dashboard designed to manage financial loans.',
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
          link: 'https://umbarkarcs.com/',
          color: '#00D9FF',
          tags: ['React', 'Express', 'MySQL']
        }
      ]);
      console.log('Projects seeded');
    }

    // Seed Testimonials
    const testCount = await Testimonial.countDocuments();
    if (testCount === 0) {
      await Testimonial.insertMany([
        {
          name: 'Sarah Jenkins',
          role: 'CEO, TechFlow',
          content: 'AryChitra transformed our legacy systems into a modern, scalable architecture.',
          rating: 5,
          image: 'https://randomuser.me/api/portraits/women/44.jpg'
        },
        {
          name: 'David Chen',
          role: 'Founder, CloudSync',
          content: 'Incredible attention to detail and outstanding communication throughout the project.',
          rating: 5,
          image: 'https://randomuser.me/api/portraits/men/32.jpg'
        }
      ]);
      console.log('Testimonials seeded');
    }

    console.log('Data seeding complete!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seedData();
