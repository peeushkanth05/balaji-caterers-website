const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 1. Create Super Admin User
  const superAdminEmail = 'vermasandeep124@gmail.com';
  const existingSuperAdmin = await prisma.user.findUnique({
    where: { email: superAdminEmail },
  });

  if (!existingSuperAdmin) {
    const hashedPassword = await bcrypt.hash('Admin@Balaji2026', 10);
    const superAdmin = await prisma.user.create({
      data: {
        name: 'Sandeep Verma (Owner)',
        email: superAdminEmail,
        password: hashedPassword,
        phone: '+919810483544',
        role: 'SUPER_ADMIN',
      },
    });
    console.log('Created Super Admin:', superAdmin.email);
  }

  // 2. Create Staff Admin User
  const staffEmail = 'staff@shreebalajicaterers.in';
  const existingStaff = await prisma.user.findUnique({
    where: { email: staffEmail },
  });

  if (!existingStaff) {
    const hashedPassword = await bcrypt.hash('Staff@Balaji2026', 10);
    const staff = await prisma.user.create({
      data: {
        name: 'Event Manager Staff',
        email: staffEmail,
        password: hashedPassword,
        phone: '+919810000000',
        role: 'ADMIN',
      },
    });
    console.log('Created Staff Admin:', staff.email);
  }

  // 3. Seed Packages
  if ((await prisma.package.count()) === 0) {
    await prisma.package.createMany({
      data: [
        {
          name: 'Royal Wedding Feast',
          category: 'Wedding',
          pricePerPerson: 850,
          description: 'Complete North Indian & Continental lavish buffet with live counters and desserts.',
          features: 'Welcome Drink, 4 Starters, 6 Main Course Dishes, Live Chaat Counter, 3 Desserts, Mocktail Bar',
          isFeatured: true,
        },
        {
          name: 'Grand Birthday Special',
          category: 'Birthday Party',
          pricePerPerson: 550,
          description: 'Fun & tasty menu designed for family birthdays and kids parties.',
          features: 'Welcome Drink, 3 Starters, Pasta & Pizza Live Station, 4 Main Course Items, Ice Cream & Cake Counter',
          isFeatured: true,
        },
        {
          name: 'Corporate Executive Lunch',
          category: 'Corporate Event',
          pricePerPerson: 450,
          description: 'Hygienic, premium corporate thali or buffet spread for business meetings.',
          features: '2 Starters, 4 Main Course Items, Assorted Bread Basket, Fresh Salad, Dessert',
          isFeatured: false,
        },
      ],
    });
    console.log('Seeded sample packages');
  }

  // 4. Seed Services
  if ((await prisma.service.count()) === 0) {
    await prisma.service.createMany({
      data: [
        {
          title: 'Catering Services',
          icon: '🍽️',
          description: 'Authentic North Indian, South Indian, Chinese & Continental cuisines with live counters and desserts.',
          tag: 'Veg & Non-Veg',
          displayOrder: 1,
          isActive: true,
        },
        {
          title: 'Floral Decoration',
          icon: '🌸',
          description: 'Breathtaking mandap setups, stage arrangements, entrance gates, and fresh floral canopies.',
          tag: 'Custom Themes',
          displayOrder: 2,
          isActive: true,
        },
        {
          title: 'Sound & DJ Setup',
          icon: '📢',
          description: 'Professional-grade PA systems, DJ consoles, intelligent lighting, and wireless mics.',
          tag: 'Pro Audio & Lights',
          displayOrder: 3,
          isActive: true,
        },
      ],
    });
    console.log('Seeded default services');
  }

  // 5. Seed Gallery Items
  if ((await prisma.galleryItem.count()) === 0) {
    await prisma.galleryItem.createMany({
      data: [
        {
          title: 'Grand Mandap Setup',
          category: 'Wedding',
          imageUrl: 'grand_wedding_decor/3dce2ebd-b344-485c-80e0-88cad120d299.jpg',
          isActive: true,
        },
        {
          title: 'Floral Entrance Gate',
          category: 'Floral',
          imageUrl: 'grand_wedding_decor/7b473ea8-3932-41ab-bac7-910973b59980.jpg',
          isActive: true,
        },
        {
          title: 'Live Food Station',
          category: 'Catering',
          imageUrl: 'grand_wedding_decor/8e631f19-fd48-4e0b-aeff-1d652baa5f7e.jpg',
          isActive: true,
        },
      ],
    });
    console.log('Seeded gallery items');
  }

  // 6. Seed Site Settings
  await prisma.siteSetting.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      phone: '+91 98104 83544',
      whatsapp: '919810483544',
      email: 'vermasandeep124@gmail.com',
      ownerName: 'Sandeep Verma',
      address: 'Dwarka Sector 5, Madhu Vihar, New Delhi',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=28.5921,77.0460&query_place_id=Dwarka+Sector+5+New+Delhi',
    },
  });
  console.log('Seeded site settings');

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
