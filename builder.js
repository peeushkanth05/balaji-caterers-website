const fs = require('fs');
const path = require('path');

const templateHtml = fs.readFileSync('wedding-decor.html', 'utf-8');

const pages = [
    {
        url: 'wedding-decor',
        title: 'Grand Wedding Décor',
        desc: 'At Shree Balaji Caterers, we specialize in creating grand and elegant wedding decorations that turn your big day into a magical celebration. From beautifully designed mandaps to stunning floral backdrops and luxurious stage setups, every element is carefully crafted to match your wedding theme and vision. Our team focuses on creating breathtaking venues that leave a lasting impression on every guest.',
        imgDir: 'grand_wedding_decor',
        services: [
            { t: 'Mandap Decoration', p: 'Traditional and modern mandap setups with premium fabrics, floral arrangements, and elegant draping.', i: '🏛️' },
            { t: 'Luxury Stage & Backdrop Setup', p: 'Beautifully designed stages with floral walls, decorative panels, and lighting for stunning photos.', i: '✨' },
            { t: 'Floral Arrangements', p: 'Fresh flowers and beautiful floral designs to create a magical atmosphere.', i: '🌸' },
            { t: 'Entrance & Walkway Decoration', p: 'Grand entrance gates and decorated pathways that welcome guests in style.', i: '🛤️' },
            { t: 'Ambient Lighting', p: 'Fairy lights, chandeliers, and ambient lighting to set the perfect mood.', i: '💡' }
        ],
        ctaTitle: 'Plan Your Dream Wedding With Us'
    },
    {
        url: 'live-food-counters',
        title: 'Live Food Counters',
        desc: 'Make your event more interactive and exciting with our live food counters. Shree Balaji Caterers offers a wide variety of freshly prepared dishes served live in front of guests, adding both entertainment and flavor to your celebration. From sizzling street food to gourmet delicacies, our chefs prepare delicious dishes that delight every guest.',
        imgDir: 'Live food stall',
        services: [
            { t: 'Live Chaat Counters', p: 'Authentic street food cooked live with the perfect blend of spices.', i: '🥘' },
            { t: 'South Indian Counters', p: 'Freshly made dosas, idlis, and vadas served hot and crispy.', i: '🍲' },
            { t: 'Chinese & Indo-Chinese Counters', p: 'Sizzling noodles, manchurian, and stir-fries made exactly to order.', i: '🥡' },
            { t: 'Dessert & Sweet Stations', p: 'Live jalebis, freshly made waffles, and interactive dessert bars.', i: '🍨' },
            { t: 'Professional Live Chefs', p: 'Expert chefs providing an engaging and hygienic live cooking experience.', i: '👨‍🍳' }
        ],
        ctaTitle: 'Add Live Counters To Your Event'
    },
    {
        url: 'dj-sound-setup',
        title: 'DJ & Sound Setup',
        desc: 'Create the perfect party atmosphere with our professional DJ and sound setup services. We provide high-quality sound systems, energetic DJs, and dynamic lighting setups to keep your guests entertained throughout the event. Whether it is a wedding sangeet, birthday party, or celebration night, we ensure the music never stops.',
        imgDir: 'Dj',
        services: [
            { t: 'Professional DJ', p: 'Experienced DJs who know how to keep the dance floor packed all night.', i: '🎧' },
            { t: 'Premium Sound Systems', p: 'Crystal clear, high-fidelity audio equipment for an immersive sound experience.', i: '🔊' },
            { t: 'Dance Floor Lighting', p: 'Dynamic laser and LED lights that sync perfectly with the music.', i: '💡' },
            { t: 'Party Atmosphere Setup', p: 'Smoke machines and special effects to make every celebration memorable.', i: '🎉' }
        ],
        ctaTitle: 'Book DJ & Music For Your Event'
    },
    {
        url: 'floral-stage-design',
        title: 'Floral Stage Design',
        desc: 'Our floral stage designs bring elegance and beauty to every celebration. Using fresh flowers, artistic arrangements, and creative backdrops, we design stages that become the centerpiece of your event. Whether it’s a wedding reception or engagement ceremony, our floral stages create the perfect setting for memorable photos and moments.',
        imgDir: 'Floral decor',
        services: [
            { t: 'Fresh Flower Decorations', p: 'Premium quality fresh flowers sourced directly for your celebration.', i: '💐' },
            { t: 'Custom Stage Designs', p: 'Unique and personalized stage layouts that perfectly match your vision.', i: '✨' },
            { t: 'Elegant Backdrops', p: 'Stunning photo-ready backdrops designed with creative floral artistry.', i: '📸' },
            { t: 'Theme Based Styling', p: 'Cohesive floral themes that tie your entire event venue together.', i: '🎨' }
        ],
        ctaTitle: 'Design Your Floral Stage'
    },
    {
        url: 'birthday-celebration',
        title: 'Birthday Celebrations',
        desc: 'Celebrate birthdays in style with beautifully designed party decorations by Shree Balaji Caterers. From colorful themes and balloon decorations to complete event setups, we create joyful and memorable birthday celebrations for kids and adults alike.',
        imgDir: 'Birthday',
        services: [
            { t: 'Theme Decorations', p: 'Fun and creative themes customized for the birthday star.', i: '🎈' },
            { t: 'Balloon Arrangements', p: 'Arches, pillars, and creative balloon art to brighten any room.', i: '🎊' },
            { t: 'Cake Table Setup', p: 'A beautiful centerpiece table designed specifically for the cake cutting.', i: '🎂' },
            { t: 'Kids Party Decor', p: 'Specialized arrangements featuring favorite characters and vibrant colors.', i: '🧸' }
        ],
        ctaTitle: 'Plan A Memorable Birthday'
    },
    {
        url: 'cooler-arrangement',
        title: 'Cooler Arrangement',
        desc: 'Keep your guests comfortable during outdoor events with our efficient cooler arrangement services. We provide well-placed cooling systems and proper airflow setups that ensure your venue remains pleasant and enjoyable even during warm weather.',
        imgDir: 'mock_coolers', // Will use placeholder text images
        services: [
            { t: 'Outdoor Event Cooling', p: 'Strategic cooler placement to combat the heat in open venues.', i: '❄️' },
            { t: 'High Capacity Coolers', p: 'Industrial-grade equipment designed to cool large event spaces efficiently.', i: '🌬️' },
            { t: 'Proper Airflow Setup', p: 'Expert positioning to ensure comfortable breeze distribution for all guests.', i: '🎐' },
            { t: 'Comfortable Guest Experience', p: 'Ensuring your attendees are relaxed and focused on the celebration.', i: '😊' }
        ],
        ctaTitle: 'Arrange Cooling For Your Event'
    },
    {
        url: 'candle-lit-mandap',
        title: 'Candle Lit Mandap',
        desc: 'Our candle lit mandap setups create a romantic and magical atmosphere for weddings and special ceremonies. With elegant candle arrangements, warm lighting, and beautiful décor elements, we design mandaps that feel intimate, peaceful, and visually stunning.',
        imgDir: 'Candle lit',
        services: [
            { t: 'Romantic Candle Lighting', p: 'Hundreds of glowing candles meticulously arranged for a magical feel.', i: '🕯️' },
            { t: 'Elegant Mandap Designs', p: 'Intimate spatial designs that glow beautifully in the evening.', i: '🌌' },
            { t: 'Warm Ambient Lighting', p: 'Soft environmental lighting designed to compliment the candlelight.', i: '✨' },
            { t: 'Perfect For Evening Weddings', p: 'A breathtaking aesthetic created specifically for sunset and night ceremonies.', i: '🌙' }
        ],
        ctaTitle: 'Create A Magical Wedding Setup'
    },
    {
        url: 'delicious-spreads',
        title: 'Delicious Spreads',
        desc: 'Food is the heart of every celebration. At Shree Balaji Caterers, we prepare delicious spreads that combine taste, presentation, and variety. Our menus include traditional dishes, modern cuisines, and beautifully presented buffet setups that make every event memorable.',
        imgDir: 'Delicious spread',
        services: [
            { t: 'Multi-Cuisine Menus', p: 'A diverse selection of authentic Indian and international dishes.', i: '🍽️' },
            { t: 'Beautiful Buffet Presentation', p: 'Food displayed elegantly using premium chafing dishes and props.', i: '🍱' },
            { t: 'Fresh Ingredients', p: 'Locally sourced, high-quality ingredients ensuring the best flavors.', i: '🥗' },
            { t: 'Professional Catering Staff', p: 'Courteous and hygienic service staff dedicated to your guests.', i: '🤵' }
        ],
        ctaTitle: 'Explore Our Catering Services'
    }
];

function getImages(imgDir) {
    if (imgDir === 'mock_coolers') {
        return [
            'https://placehold.co/600x400/fcf9f2/666?text=Cooler+1',
            'https://placehold.co/600x600/fcf9f2/666?text=Cooler+2',
            'https://placehold.co/800x600/fcf9f2/666?text=Cooler+3',
            'https://placehold.co/600x400/fcf9f2/666?text=Cooler+4'
        ];
    }
    const dirPath = path.join(__dirname, imgDir);
    if (fs.existsSync(dirPath)) {
        const files = fs.readdirSync(dirPath);
        return files.filter(f => f.match(/\.(jpg|jpeg|png|webp)$/i)).map(f => `${imgDir}/${f}`);
    }
    return [];
}

const buildPages = () => {
    pages.forEach(page => {
        let html = templateHtml;

        // Update Title tags
        html = html.replace(/<title>.*?<\/title>/, `<title>${page.title} | Shree Balaji Caterers</title>`);
        html = html.replace(/<meta name="description" content=".*?">/, `<meta name="description" content="${page.desc.substring(0, 150)}...">`);

        // Hero
        const imgs = getImages(page.imgDir);

        let heroSlidesHtml = "";
        if (imgs.length > 0) {
            heroSlidesHtml = imgs.slice(0, 3).map((img, i) =>
                `<div class="hero-slide ${i === 0 ? 'active' : ''}" style="background-image: url('${img}');"></div>`
            ).join('\n        ');
        }

        html = html.replace(/<!-- Slideshow Backgrounds -->[\s\S]*?<div class="hero-overlay">/m, `<!-- Slideshow Backgrounds -->\n        ${heroSlidesHtml}\n        <div class="hero-overlay">`);

        html = html.replace(/\.decor-hero h1 \{[\s\S]*?\}/, `.decor-hero h1 {
            font-family: 'Playfair Display', serif;
            font-size: clamp(3rem, 6vw, 5rem);
            font-weight: 900;
            margin-bottom: 10px;
            text-shadow: 3px 6px 20px rgba(0, 0, 0, 0.8);
            color: #ffffff !important;
        }

        .hero-subtitle {
            color: var(--gold);
            font-family: 'Nunito', sans-serif;
            text-transform: uppercase;
            letter-spacing: 4px;
            font-size: 1.1rem;
            margin-bottom: 25px;
            font-weight: 800;
            text-shadow: 2px 4px 10px rgba(0, 0, 0, 0.8);
        }`);

        html = html.replace(/\.decor-hero p \{[\s\S]*?\}/, `.decor-hero p {
            font-size: clamp(1.1rem, 2vw, 1.3rem);
            font-weight: 400;
            opacity: 0.95;
            line-height: 1.8;
            text-shadow: 1px 2px 10px rgba(0, 0, 0, 0.8);
        }`);

        html = html.replace(/<div class="decor-hero-content">[\s\S]*?<\/div>/, `
        <div class="decor-hero-content"></div>`);

        // Intro Section
        html = html.replace(/<h2 class="intro-title">.*?<\/h2>\s*<p class="intro-text">[\s\S]*?<\/p>/, `
            <h2 class="intro-title">Elegance in Every Detail</h2>
            <p class="intro-text">${page.desc}</p>`);

        // Gallery
        html = html.replace(/<h2 class="gallery-title reveal">.*?<\/h2>/, `<h2 class="gallery-title reveal">Our ${page.title} Gallery</h2>`);

        const galleryItemsHtml = imgs.map(img =>
            `<div class="decor-item reveal"><img src="${img}" alt="${page.title}"></div>`
        ).join('\n            ');

        html = html.replace(/<div class="decor-grid">[\s\S]*?<\/div>(\s*)<\/section>/, `<div class="decor-grid">\n            ${galleryItemsHtml}\n        </div>$1</section>`);

        // Remove Services Section as requested ("big cards")
        html = html.replace(/<section class="services-section">[\s\S]*?<\/section>/, '');

        // CTA
        html = html.replace(/<section class="cta-section reveal">[\s\S]*?<\/section>/, `
    <section class="cta-section reveal">
        <h2>${page.ctaTitle}</h2>
        <p>Planning your event? Let Shree Balaji Caterers transform your venue into a breathtaking celebration space.</p>
        <a href="/#contact" class="btn-book">Book Your Event</a>
    </section>`);

        fs.writeFileSync(`${page.url}.html`, html);
        console.log(`Generated -> ${page.url}.html`);
    });
}
buildPages();
