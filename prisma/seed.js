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
  await prisma.service.deleteMany({});
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

  // 5. Seed Site Settings
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
      aboutTag: 'Why Us',
      aboutTitle: 'Why Choose Shree Balaji Caterers',
      aboutSubtitle: 'With 15+ years of experience and 500+ successful events in Delhi NCR, we bring passion, precision, and a personal touch to every celebration.',
    },
  });
  console.log('Seeded site settings');

  // 6. Seed Hero Section & Related Data
  await prisma.heroStatistic.deleteMany({});
  await prisma.heroImage.deleteMany({});
  await prisma.heroFloatingCard.deleteMany({});

  await prisma.heroSection.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      isEnabled: true,
      layoutType: 'split',
      backgroundType: 'gradient',
      themeStyle: 'light',
      logoUrl: '/new-logo.png',
      badgeShow: true,
      badgeText: "Delhi NCR's Premier Event Partner",
      badgeIcon: '⭐',
      heading: 'Every Celebration, Perfectly Crafted.',
      subheading: 'From grand royal weddings to intimate family gatherings — Shree Balaji Caterers brings you world-class catering, stunning floral décor, seamless sound, and complete event management.',
      primaryBtnText: 'Book Your Event ✨',
      primaryBtnLink: '#contact',
      secondaryBtnText: 'View Our Work 🎨',
      secondaryBtnLink: '#portfolio',
      sliderAutoPlay: true,
      sliderSpeed: 5000,
      statistics: {
        create: [
          { icon: '🏆', number: '500+', title: 'Events Managed', sortOrder: 1 },
          { icon: '⭐', number: '15+', title: 'Years Experience', sortOrder: 2 },
          { icon: '❤️', number: '1000+', title: 'Happy Families', sortOrder: 3 },
          { icon: '💯', number: '100%', title: 'Satisfaction', sortOrder: 4 },
        ],
      },
      floatingCards: {
        create: [
          { icon: '🍽️', title: 'Catering', description: 'North & Fusion', color: 'amber', sortOrder: 1 },
          { icon: '🌸', title: 'Floral Décor', description: 'Custom Mandaps', color: 'orange', sortOrder: 2 },
          { icon: '📢', title: 'Sound & DJ', description: 'Pro Audio & Lights', color: 'blue', sortOrder: 3 },
          { icon: '🎉', title: 'Full Events', description: 'End-to-End Execution', color: 'emerald', sortOrder: 4 },
        ],
      },
      images: {
        create: [
          { imageUrl: '/grand_wedding_decor/3dce2ebd-b344-485c-80e0-88cad120d299.jpg', altText: 'Grand Royal Wedding Mandap', displayOrder: 1 },
          { imageUrl: '/grand_wedding_decor/7b473ea8-3932-41ab-bac7-910973b59980.jpg', altText: 'Lavish Food Buffets', displayOrder: 2 },
          { imageUrl: '/grand_wedding_decor/93f97c61-cb64-4b24-b9ed-3cef9082b0f4.jpg', altText: 'Floral Stage Design', displayOrder: 3 },
        ],
      },
    },
  });
  console.log('Seeded Hero section and items');

  // 7. Seed Dynamic Portfolio Categories & Items
  await prisma.portfolio.deleteMany({});
  await prisma.portfolioCategory.deleteMany({});

  const catWedding = await prisma.portfolioCategory.create({
    data: {
      categoryName: 'Wedding',
      slug: 'wedding',
      description: 'Royal mandap setups, floral entryways, and luxury wedding feasts.',
      icon: '💍',
      displayOrder: 1,
      active: true,
    },
  });

  const catFloral = await prisma.portfolioCategory.create({
    data: {
      categoryName: 'Floral Décor',
      slug: 'floral-decor',
      description: 'Exquisite flower mandaps, stage arrangements, and floral gates.',
      icon: '🌸',
      displayOrder: 2,
      active: true,
    },
  });

  const catCatering = await prisma.portfolioCategory.create({
    data: {
      categoryName: 'Catering',
      slug: 'catering',
      description: 'Lavish North Indian, South Indian, and Continental live counters.',
      icon: '🍽️',
      displayOrder: 3,
      active: true,
    },
  });

  const catDJ = await prisma.portfolioCategory.create({
    data: {
      categoryName: 'DJ & Sound',
      slug: 'dj-sound',
      description: 'Concert-grade sound systems, ambient LED lights, and live DJ setups.',
      icon: '🔊',
      displayOrder: 4,
      active: true,
    },
  });

  const catBirthday = await prisma.portfolioCategory.create({
    data: {
      categoryName: 'Birthday Party',
      slug: 'birthday-party',
      description: 'Theme birthday setups, balloon decor, and kid-friendly food stations.',
      icon: '🎂',
      displayOrder: 5,
      active: true,
    },
  });

  const catCorporate = await prisma.portfolioCategory.create({
    data: {
      categoryName: 'Corporate Event',
      slug: 'corporate-event',
      description: 'Professional conference setups, executive lunches, and branding booths.',
      icon: '💼',
      displayOrder: 6,
      active: true,
    },
  });

  console.log('Seeded 6 Portfolio Categories');

  // Seed Rich Portfolio items linked to categories
  await prisma.portfolio.createMany({
    data: [
      {
        title: 'Royal Mandap & Grand Reception Decor',
        slug: 'royal-mandap-grand-reception-decor',
        shortDescription: 'Lavish red & gold rose mandap setup with candle chandeliers and ambient lighting in Dwarka.',
        longDescription: 'A magnificent wedding setup designed for 800+ guests. Featured a 40-foot floral canopy entrance, hand-carved mandap pillars decorated with fresh red roses and orchids, custom stage seating, and warm ambient spotlighting.',
        categoryId: catWedding.id,
        coverImage: '/grand_wedding_decor/3dce2ebd-b344-485c-80e0-88cad120d299.jpg',
        galleryImages: JSON.stringify([
          '/grand_wedding_decor/3dce2ebd-b344-485c-80e0-88cad120d299.jpg',
          '/grand_wedding_decor/fd3ad0c0-af52-4014-9461-a00f49abc506.jpg',
          '/grand_wedding_decor/93f97c61-cb64-4b24-b9ed-3cef9082b0f4.jpg',
        ]),
        featuredImage: '/grand_wedding_decor/3dce2ebd-b344-485c-80e0-88cad120d299.jpg',
        altText: 'Royal Red Mandap Decoration',
        seoTitle: 'Royal Wedding Mandap Decor | Shree Balaji Caterers Delhi',
        seoDescription: 'Check out our royal wedding mandap setup in Delhi NCR with floral entryways and live counters.',
        tags: JSON.stringify(['Wedding', 'Royal Mandap', 'Delhi NCR', 'Luxury']),
        featured: true,
        displayOrder: 1,
        active: true,
      },
      {
        title: 'Authentic 50-Item Royal Buffet & Live Chaat Counter',
        slug: 'authentic-50-item-royal-buffet',
        shortDescription: 'Comprehensive catering spread featuring live Delhi chaat, authentic North Indian main course, and dessert bars.',
        longDescription: 'An opulent multi-cuisine wedding feast serving over 1,200 attendees. Highlights included a live Dilli 6 Street Chaat counter, fresh Tandoori breads, Dum Biryani counters, and a 6-tier dessert lounge featuring warm Gulab Jamuns and live Jalebi Rabri.',
        categoryId: catCatering.id,
        coverImage: '/grand_wedding_decor/7b473ea8-3932-41ab-bac7-910973b59980.jpg',
        galleryImages: JSON.stringify([
          '/grand_wedding_decor/7b473ea8-3932-41ab-bac7-910973b59980.jpg',
          '/grand_wedding_decor/b65e738d-5f72-41ef-b881-aa71397225c5.jpg',
        ]),
        featuredImage: '/grand_wedding_decor/7b473ea8-3932-41ab-bac7-910973b59980.jpg',
        altText: 'Catering Live Counter Spread',
        seoTitle: 'Royal Buffet Catering | Shree Balaji Caterers Delhi NCR',
        seoDescription: 'Authentic North Indian multi-cuisine catering spread with live food counters in Delhi.',
        tags: JSON.stringify(['Catering', 'Live Chaat', 'Multi-Cuisine', 'Buffet']),
        featured: true,
        displayOrder: 2,
        active: true,
      },
      {
        title: 'JBL Line Array Concert DJ & Intelligent Lighting',
        slug: 'jbl-line-array-concert-dj-lighting',
        shortDescription: 'High-power sound system setup for Sangeet night with moving head laser lights and fog machines.',
        longDescription: 'Complete audio-visual production for a high-energy Sangeet and DJ night in Gurugram. Equipped with JBL VRX line arrays, dual subwoofers, DMX-controlled intelligent beam lights, hazers, and LED backdrop screens.',
        categoryId: catDJ.id,
        coverImage: '/grand_wedding_decor/8e631f19-fd48-4e0b-aeff-1d652baa5f7e.jpg',
        galleryImages: JSON.stringify([
          '/grand_wedding_decor/8e631f19-fd48-4e0b-aeff-1d652baa5f7e.jpg',
        ]),
        featuredImage: '/grand_wedding_decor/8e631f19-fd48-4e0b-aeff-1d652baa5f7e.jpg',
        altText: 'DJ & Sound System Setup',
        seoTitle: 'Pro DJ & Sound Setup | Shree Balaji Caterers',
        seoDescription: 'High performance DJ sound systems and concert lighting for weddings in Delhi NCR.',
        tags: JSON.stringify(['DJ Sound', 'Sangeet', 'LED Lights', 'JBL']),
        featured: true,
        displayOrder: 3,
        active: true,
      },
      {
        title: 'Exquisite White Orchid & Marigold Stage Theme',
        slug: 'white-orchid-marigold-stage-theme',
        shortDescription: 'Contemporary floral stage backdrop with white orchids, carnations, and royal golden sofas.',
        longDescription: 'Designed for an elegant engagement ceremony in South Delhi. Features handcrafted floral walls using thousands of fresh white lilies, imported orchids, and golden accent frames creating a royal visual backdrop for photographs.',
        categoryId: catFloral.id,
        coverImage: '/grand_wedding_decor/93f97c61-cb64-4b24-b9ed-3cef9082b0f4.jpg',
        galleryImages: JSON.stringify([
          '/grand_wedding_decor/93f97c61-cb64-4b24-b9ed-3cef9082b0f4.jpg',
          '/grand_wedding_decor/3dce2ebd-b344-485c-80e0-88cad120d299.jpg',
        ]),
        featuredImage: '/grand_wedding_decor/93f97c61-cb64-4b24-b9ed-3cef9082b0f4.jpg',
        altText: 'Floral Stage Backdrop',
        seoTitle: 'Floral Decor Stage Design | Shree Balaji Caterers',
        seoDescription: 'Custom floral stage decoration with orchids and marigolds for engagement & reception.',
        tags: JSON.stringify(['Floral Decor', 'Stage Setup', 'Engagement', 'Orchids']),
        featured: false,
        displayOrder: 4,
        active: true,
      },
      {
        title: 'Theme Birthday Celebration & Custom Live Stations',
        slug: 'theme-birthday-celebration-live-stations',
        shortDescription: 'Vibrant theme party setup with balloon archway, popcorn machines, and custom cake counter.',
        longDescription: 'A joyful 1st birthday milestone celebration hosted at a private lawn in Noida. Included custom pastel balloon styling, kids live pasta counter, chocolate fountain station, and interactive game host.',
        categoryId: catBirthday.id,
        coverImage: '/grand_wedding_decor/b65e738d-5f72-41ef-b881-aa71397225c5.jpg',
        galleryImages: JSON.stringify([
          '/grand_wedding_decor/b65e738d-5f72-41ef-b881-aa71397225c5.jpg',
        ]),
        featuredImage: '/grand_wedding_decor/b65e738d-5f72-41ef-b881-aa71397225c5.jpg',
        altText: 'Birthday Party Setup',
        seoTitle: 'Birthday Party Catering & Setup | Shree Balaji Caterers',
        seoDescription: 'Complete birthday party catering and balloon decoration services in Delhi NCR.',
        tags: JSON.stringify(['Birthday', 'Party Decor', 'Live Counter', 'Kids Special']),
        featured: false,
        displayOrder: 5,
        active: true,
      },
      {
        title: 'Candlelit Evening Mandap & Pheras Setup',
        slug: 'candlelit-evening-mandap-pheras-setup',
        shortDescription: 'Romantic evening lawn mandap illuminated by fairy light canopies and scented candles.',
        longDescription: 'An intimate sunset wedding ceremony setup featuring a clear-roof glass mandap, vintage lanterns, floral aisles, and soft instrumental acoustic background sound.',
        categoryId: catWedding.id,
        coverImage: '/grand_wedding_decor/fd3ad0c0-af52-4014-9461-a00f49abc506.jpg',
        galleryImages: JSON.stringify([
          '/grand_wedding_decor/fd3ad0c0-af52-4014-9461-a00f49abc506.jpg',
          '/grand_wedding_decor/3dce2ebd-b344-485c-80e0-88cad120d299.jpg',
        ]),
        featuredImage: '/grand_wedding_decor/fd3ad0c0-af52-4014-9461-a00f49abc506.jpg',
        altText: 'Candlelit Pheras Mandap',
        seoTitle: 'Evening Lawn Wedding Mandap | Shree Balaji Caterers',
        seoDescription: 'Sunset outdoor wedding setup with fairy lights and candlelit mandap in Delhi.',
        tags: JSON.stringify(['Outdoor Wedding', 'Candlelit Mandap', 'Night Decor']),
        featured: true,
        displayOrder: 6,
        active: true,
      },
    ],
  });

  console.log('Seeded 6 Rich Portfolio Items');

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
