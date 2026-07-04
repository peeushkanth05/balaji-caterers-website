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
  } else {
    console.log('Super Admin already exists:', superAdminEmail);
  }

  // 2. Create Sample Staff Admin
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

  // 3. Create Sample Packages
  const packageCount = await prisma.package.count();
  if (packageCount === 0) {
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
    console.log('Seeded sample catering packages');
  }

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
