const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const connectDB = require('../config/db');
const User = require('../models/User');
const Portfolio = require('../models/Portfolio');

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany();
    await Portfolio.deleteMany();

    // Create admin user
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@orvix.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    const admin = await User.create({
      name: 'ORVIX Admin',
      email: adminEmail,
      password: adminPassword,
      role: 'admin',
    });
    console.log('✅ Admin user created:', admin.email);

    // Create sample portfolio projects
    const projects = [
      {
        title: 'نظام إدارة المستشفيات',
        titleEn: 'Hospital Management System',
        description: 'نظام متكامل لإدارة المستشفيات والعيادات مع إدارة المرضى والمواعيد والفواتير',
        descriptionEn: 'Comprehensive hospital and clinic management system',
        category: 'medical',
        technologies: ['React', 'Node.js', 'MongoDB'],
        client: 'مستشفى الرياض العام',
        featured: true,
        order: 1,
      },
      {
        title: 'نظام إدارة العقارات',
        titleEn: 'Real Estate Management System',
        description: 'نظام إدارة العقارات والوحدات السكنية مع إدارة العقود والإيجارات',
        descriptionEn: 'Real estate and property management system',
        category: 'realestate',
        technologies: ['React', 'Node.js', 'PostgreSQL'],
        client: 'شركة العقارات المتحدة',
        featured: true,
        order: 2,
      },
      {
        title: 'نظام المحاسبة المتكامل',
        titleEn: 'Integrated Accounting System',
        description: 'نظام محاسبي متكامل معتمد من هيئة الزكاة والدخل',
        descriptionEn: 'Integrated accounting system approved by ZATCA',
        category: 'accounting',
        technologies: ['React', 'Node.js', 'MongoDB'],
        client: 'مؤسسة الأمل التجارية',
        featured: true,
        order: 3,
      },
      {
        title: 'متجر إلكتروني متكامل',
        titleEn: 'E-Commerce Platform',
        description: 'منصة تجارة إلكترونية مع إدارة المنتجات والطلبات والمدفوعات',
        descriptionEn: 'Full e-commerce platform with product and order management',
        category: 'ecommerce',
        technologies: ['Next.js', 'Node.js', 'Stripe'],
        client: 'متجر التسوق الذكي',
        featured: false,
        order: 4,
      },
      {
        title: 'تطبيق توصيل الطلبات',
        titleEn: 'Delivery App',
        description: 'تطبيق جوال لتوصيل الطلبات مع تتبع مباشر للسائقين',
        descriptionEn: 'Mobile delivery app with real-time driver tracking',
        category: 'mobile',
        technologies: ['React Native', 'Node.js', 'Socket.io'],
        client: 'شركة التوصيل السريع',
        featured: false,
        order: 5,
      },
    ];

    await Portfolio.insertMany(projects);
    console.log(`✅ ${projects.length} portfolio projects created`);

    console.log('\n🎉 Database seeded successfully!');
    console.log(`\n   Admin Login:`);
    console.log(`   Email:    ${adminEmail}`);
    console.log(`   Password: ${adminPassword}`);
    console.log(`\n   Don't forget to change these credentials in production!`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error.message);
    process.exit(1);
  }
};

seedData();
