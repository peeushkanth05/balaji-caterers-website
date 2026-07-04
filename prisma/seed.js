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

  // 4. Seed All 8 Services
  await prisma.service.deleteMany({}); // Reset services to clean 8 items
  await prisma.service.createMany({
    data: [
      {
        title: 'Catering Services',
        icon: '🍽️',
        description: 'Authentic North Indian, South Indian, Chinese & Continental cuisines. Live counters, street food stations, and dessert spreads tailored to your taste.',
        tag: 'Veg & Non-Veg',
        displayOrder: 1,
        isActive: true,
      },
      {
        title: 'Floral Decoration',
        icon: '🌸',
        description: 'Breathtaking wedding canopies, stage arrangements, floral canopies, and entrance gates. Roses, marigolds, orchids — we create visual magic.',
        tag: 'Custom Themes',
        displayOrder: 2,
        isActive: true,
      },
      {
        title: 'Sound & DJ Setup',
        icon: '🔊',
        description: 'Professional-grade PA systems, DJ equipment, LED lighting, and live band arrangements. Crystal-clear sound for every moment.',
        tag: 'HD Audio',
        displayOrder: 3,
        isActive: true,
      },
      {
        title: 'Mattress Rental',
        icon: '🛏️',
        description: 'Clean, comfortable mattresses with bedding on rent for out-of-town guests. Foam, spring, and orthopedic options available in bulk.',
        tag: 'Bulk Orders',
        displayOrder: 4,
        isActive: true,
      },
      {
        title: 'Cooler Rental',
        icon: '❄️',
        description: 'Desert coolers and industrial air coolers for outdoor events. Beat the heat and keep your guests comfortable through every season.',
        tag: 'All Seasons',
        displayOrder: 5,
        isActive: true,
      },
      {
        title: 'Event Management',
        icon: '🎪',
        description: 'End-to-end event planning, coordination and execution. From venue selection to tear-down — our dedicated team manages it all.',
        tag: 'Turnkey Service',
        displayOrder: 6,
        isActive: true,
      },
      {
        title: 'Stall Booking',
        icon: '🏪',
        description: 'Custom food stalls, exhibition counters, and vendor booths for fairs, melas, and corporate expos. Professional setup with branding options.',
        tag: 'Custom Setup',
        displayOrder: 7,
        isActive: true,
      },
      {
        title: 'Event Anchoring',
        icon: '🎙️',
        description: 'Experienced emcees and anchors for weddings, corporate events, and cultural programs. Bilingual hosting in Hindi and English.',
        tag: 'Live Hosting',
        displayOrder: 8,
        isActive: true,
      },
    ],
  });
  console.log('Seeded all 8 default services cleanly');

  // 5. Seed Gallery Items (6 photos for bento grid)
  await prisma.galleryItem.deleteMany({});
  await prisma.galleryItem.createMany({
    data: [
      {
        title: 'Grand Wedding Décor',
        category: 'Wedding',
        imageUrl: '/grand_wedding_decor/3dce2ebd-b344-485c-80e0-88cad120d299.jpg',
        isActive: true,
      },
      {
        title: 'Live Food Counters',
        category: 'Catering',
        imageUrl: '/grand_wedding_decor/7b473ea8-3932-41ab-bac7-910973b59980.jpg',
        isActive: true,
      },
      {
        title: 'DJ & Sound Setup',
        category: 'DJ & Sound',
        imageUrl: '/grand_wedding_decor/8e631f19-fd48-4e0b-aeff-1d652baa5f7e.jpg',
        isActive: true,
      },
      {
        title: 'Floral Stage Design',
        category: 'Floral',
        imageUrl: '/grand_wedding_decor/93f97c61-cb64-4b24-b9ed-3cef9082b0f4.jpg',
        isActive: true,
      },
      {
        title: 'Birthday Celebrations',
        category: 'Birthday',
        imageUrl: '/grand_wedding_decor/b65e738d-5f72-41ef-b881-aa71397225c5.jpg',
        isActive: true,
      },
      {
        title: 'Candle Lit Mandap',
        category: 'Wedding',
        imageUrl: '/grand_wedding_decor/fd3ad0c0-af52-4014-9461-a00f49abc506.jpg',
        isActive: true,
      },
    ],
  });
  console.log('Seeded 6 gallery items for bento grid');

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
