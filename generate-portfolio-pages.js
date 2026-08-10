const fs = require('fs');
const path = require('path');

const pages = [
    {
        filename: 'live-food-counters.html',
        title: 'Live Food Counters | Verma Caterers and Events',
        description: "View Verma Caterers and Events' portfolio: Live Food Counters. Professional catering, live chaat, pav bhaji & continental counters in Delhi NCR by Sandeep Verma. Call +91 98104 83544.",
        h1: 'Authentic Live Food Counters',
        subtitle: 'Interactive Culinary Delights',
        intro: 'Verma Caterers and Events brings interactive live cooking stations to your wedding, birthday, or corporate event in Delhi NCR. From sizzling North Indian chaats, pani puri, pav bhaji to live pasta & mocktail counters, Sandeep Verma ensures high hygiene, fresh ingredients, and memorable flavors.',
        galleryDir: 'Live food counters',
        images: [
            'Live food counters/1500ee3b-bd94-4d82-b700-11239eb1bf59.jpg',
            'Live food counters/37bc23b2-658b-491c-b8e2-9b2ee0a9050d.jpg',
            'Live food counters/a60fbbf0-df58-450f-90e9-aaabdf3173d1.jpg',
            'Live food counters/d57ee574-d4b9-47ff-b633-bd85fdd4c8f5.jpg'
        ]
    },
    {
        filename: 'dj-sound-setup.html',
        title: 'Concert DJ & Sound Setup | Verma Caterers and Events',
        description: "View Verma Caterers and Events' portfolio: Concert DJ & Sound Setup. JBL Line Array sound system, intelligent stage lights & DJ for Delhi NCR events by Sandeep Verma. Call +91 98104 83544.",
        h1: 'JBL Line Array DJ & Intelligent Lighting',
        subtitle: 'Unforgettable Music & Light Experience',
        intro: 'Elevate your sangeet, wedding reception, or corporate bash with Verma Caterers and Events sound & lighting setup. Powered by JBL Line Array speakers, moving head laser lights, smoke machines, and expert DJs to keep your guests dancing all night.',
        galleryDir: 'Dj',
        images: [
            'Dj/59fcccc7-28f5-4406-a7f8-0c829808ca1a.jpg',
            'Dj/cad47cdc-6afe-4546-bf99-5af54802a7b0.jpg',
            'Dj/f5a9e601-eae2-49d9-810d-ed8e187c9b30.jpg'
        ]
    },
    {
        filename: 'floral-stage-design.html',
        title: 'Floral Stage Design & Decor | Verma Caterers and Events',
        description: "View Verma Caterers and Events' portfolio: Floral Stage Design. Exquisite white orchid & marigold entrance gates & stage backdrops in Delhi NCR by Sandeep Verma. Call +91 98104 83544.",
        h1: 'White Orchid & Marigold Floral Stage Design',
        subtitle: 'Royal Floral Elegance',
        intro: 'Transform your event venue with bespoke floral stage backdrops, entrance archways, and aisle decor created by Sandeep Verma and team. We use fresh white orchids, Dutch roses, carnations, and traditional marigolds for a regal visual experience.',
        galleryDir: 'Floral decor',
        images: [
            'Floral decor/08b0f2e8-0a6e-4d84-b515-ec9f61facf8f.jpg',
            'Floral decor/136dafda-29b7-4208-93db-9470077ffb78.jpg',
            'Floral decor/384cb0e8-ed87-4940-b6e6-ed4dcd4ae8ef.jpg'
        ]
    },
    {
        filename: 'birthday-celebration.html',
        title: 'Theme Birthday Party Celebrations | Verma Caterers and Events',
        description: "View Verma Caterers and Events' portfolio: Theme Birthday Celebrations. Grand birthday catering starting ₹550/plate with custom live counters in Delhi NCR by Sandeep Verma. Call +91 98104 83544.",
        h1: 'Theme Birthday Celebrations & Custom Live Stations',
        subtitle: 'Grand Birthday Packages @ ₹550/plate',
        intro: 'Make family birthdays and kids theme parties extra special with Verma Caterers and Events. We provide vibrant balloon & floral themes, cartoon cutouts, dedicated kids menu, popcorn/cotton candy machines, and live food counters across Delhi NCR.',
        galleryDir: 'Birthday',
        images: [
            'Birthday/148c53c2-5fed-4431-823a-09523fd4c0e0.jpg',
            'Birthday/408f8ead-c208-44b6-a88c-a3363c004067.jpg',
            'Birthday/40eef530-cc2b-4535-8e05-4a20aed0b235.jpg'
        ]
    },
    {
        filename: 'candle-lit-mandap.html',
        title: 'Candlelit Evening Mandap Setup | Verma Caterers and Events',
        description: "View Verma Caterers and Events' portfolio: Candlelit Evening Mandap Setup. Romantic wedding mandap pheras lighting & floral design in Delhi NCR by Sandeep Verma. Call +91 98104 83544.",
        h1: 'Candlelit Evening Mandap Pheras Setup',
        subtitle: 'Enchanting Night Pheras',
        intro: 'Experience divine ambiance for evening pheras with our candlelit mandap installations. Warm golden fairy lights, brass lamps, crystal chandeliers, and fresh floral pillars create an intimate atmosphere for the sacred wedding vows.',
        galleryDir: 'Candle lit',
        images: [
            'Candle lit/60027fbf-8a74-4ef1-ba3f-5cd959ec6954.jpg',
            'Candle lit/7ff1efc6-4fba-4292-bf43-79360abe7b72.jpg',
            'Candle lit/cd80de67-256b-4202-8889-dd0f27b989bc.jpg'
        ]
    },
    {
        filename: 'delicious-spreads.html',
        title: '50-Item Royal Buffet Spreads | Verma Caterers and Events',
        description: "View Verma Caterers and Events' portfolio: Delicious Spreads. Authentic 50-item royal North Indian & Continental buffet spread in Delhi NCR by Sandeep Verma. Call +91 98104 83544.",
        h1: '50-Item Royal Buffet & Gourmet Spreads',
        subtitle: 'Culinary Craftsmanship at Its Finest',
        intro: 'Explore lavish 50+ item buffet spreads featuring Dal Makhani, Paneer Lababdar, Dum Biryani, Naan varieties, Gulab Jamun, Rasmalai, and international Continental dishes crafted under the personal direction of Sandeep Verma.',
        galleryDir: 'Delicious spread',
        images: [
            'Delicious spread/2e45cd6f-0a1f-43f9-a776-6aaa6bfcc398.jpg',
            'Delicious spread/5a04e4ba-2c9f-44f8-9cde-72e8c9e2b308.jpg',
            'Delicious spread/78879222-3e18-431d-a5aa-05efd84a4fe9.jpg'
        ]
    },
    {
        filename: 'cooler-arrangement.html',
        title: 'Event Tent & Cooler Rental Services | Verma Caterers and Events',
        description: "View Verma Caterers and Events' portfolio: Cooler & Mattress Arrangement. High-capacity duct coolers, mist fans & comfortable bedding rental in Delhi NCR by Sandeep Verma. Call +91 98104 83544.",
        h1: 'Heavy-Duty Tent Coolers & Bedding Rental',
        subtitle: 'Guest Comfort Solutions for Summer & Outdoor Events',
        intro: 'Keep your guests cool and comfortable during outdoor summer weddings and mandap ceremonies. Verma Caterers provides industrial duct coolers, mist fans, plush mattresses, white sheets, and VIP seating arrangements across Delhi NCR.',
        galleryDir: 'Cooler arrangement',
        images: [
            'Cooler arrangement/8f99e334-a131-419b-a010-093fe78d655f.jpg',
            'Cooler arrangement/a5ea5ef4-118e-4364-a696-2be514ecb3ed.jpg',
            'Cooler arrangement/df28cf99-6fa6-43f3-94c6-4dd8f7318ec8.jpg'
        ]
    }
];

function generateHTML(page) {
    const imagesHTML = page.images.map((img, i) => `
        <div class="decor-item reveal">
            <img src="${img}" alt="${page.h1} item ${i + 1} by Verma Caterers" loading="lazy">
        </div>
    `).join('\n');

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="${page.description}">
    <meta name="keywords" content="Verma Caterers and Events, Sandeep Verma, ${page.h1}, caterers Delhi NCR, event management Dwarka">
    <meta name="author" content="Sandeep Verma">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="https://vermacaterersevents.com/${page.filename}">
    <link rel="icon" type="image/x-icon" href="/favicon.ico">

    <!-- Open Graph -->
    <meta property="og:title" content="${page.title}">
    <meta property="og:description" content="${page.description}">
    <meta property="og:image" content="https://vermacaterersevents.com/images/og-image.jpg">
    <meta property="og:url" content="https://vermacaterersevents.com/${page.filename}">
    <meta property="og:type" content="website">
    <meta property="og:locale" content="en_IN">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${page.title}">
    <meta name="twitter:description" content="${page.description}">
    <meta name="twitter:image" content="https://vermacaterersevents.com/images/og-image.jpg">

    <!-- Performance Preconnect -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="dns-prefetch" href="https://www.googletagmanager.com">
    <link rel="dns-prefetch" href="https://www.google-analytics.com">

    <title>${page.title}</title>

    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Nunito:wght@300;400;600;700;800&display=swap&font-display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">

    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-XXXXXX');</script>

    <!-- Meta Pixel Code -->
    <script>
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', 'META_PIXEL_ID');
    fbq('track', 'PageView');
    </script>
</head>
<body>
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXX" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <a href="#main-content" class="skip-link">Skip to main content</a>

    <nav id="main-nav">
        <div class="nav-brand">
            <a href="/" class="nav-logo-badge">
                <img src="new-logo.png" alt="Verma Caterers Logo" class="nav-logo-img">
            </a>
        </div>
        <ul class="nav-links">
            <li><a href="/">Home</a></li>
            <li><a href="/#services">Services</a></li>
            <li><a href="/#portfolio">Gallery</a></li>
            <li><a href="/#contact">Contact</a></li>
        </ul>
    </nav>

    <main id="main-content">
        <section class="decor-hero reveal" style="min-height:50vh; background: #111; display:flex; align-items:center; justify-content:center; text-align:center; padding:100px 20px 40px; color:#fff;">
            <div class="decor-hero-content">
                <p class="hero-subtitle" style="color:var(--gold,#f5a623); letter-spacing:3px; text-transform:uppercase; font-weight:800; margin-bottom:10px;">${page.subtitle}</p>
                <h1 style="font-family:'Playfair Display',serif; font-size:clamp(2.5rem,5vw,4rem); margin:0;">${page.h1}</h1>
            </div>
        </section>

        <section class="intro-section reveal" style="padding:60px 6%; text-align:center; background:#fff;">
            <div class="intro-container" style="max-width:850px; margin:auto;">
                <h2 class="intro-title" style="font-family:'Playfair Display',serif; font-size:2.2rem; color:#e08a00; margin-bottom:20px;">Personalized Service by Sandeep Verma</h2>
                <p class="intro-text" style="font-size:1.1rem; line-height:1.8; color:#555;">${page.intro}</p>
            </div>
        </section>

        <section class="gallery-section" style="padding:60px 6%; background:#fcf9f2;">
            <h2 class="gallery-title reveal" style="text-align:center; font-family:'Playfair Display',serif; font-size:2.5rem; margin-bottom:40px;">Gallery &amp; Showcase</h2>
            <div class="decor-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:25px; max-width:1200px; margin:auto;">
                ${imagesHTML}
            </div>
        </section>

        <section class="cta-section reveal" style="padding:80px 6%; background:linear-gradient(135deg, #f5a623, #ff6b2b); text-align:center; color:#fff;">
            <h2 style="font-family:'Playfair Display',serif; font-size:2.5rem; margin-bottom:15px;">Ready to Book This Service?</h2>
            <p style="font-size:1.15rem; margin-bottom:30px; opacity:0.95;">Get in touch with Sandeep Verma today for a free custom quote and site inspection.</p>
            <button type="button" class="btn-book open-quote-modal" style="background:#fff; color:#ff6b2b; padding:14px 36px; border:none; border-radius:50px; font-weight:800; font-size:1.1rem; cursor:pointer;">Request Free Quote</button>
        </section>
    </main>

    <footer style="background:#111; color:#ddd; padding:50px 6%; text-align:center;">
        <img src="logo.jpg" alt="Verma Caterers Logo" class="footer-logo-img" style="width:70px; border-radius:50%; margin-bottom:15px;">
        <p>Your trusted partner for catering, floral decoration, sound setup, and complete event management in Delhi NCR.</p>
        <p>&copy; 2026 Verma Caterers and Events. All rights reserved.</p>
    </footer>

    <div id="lightbox">
        <span id="close-lightbox">&times;</span>
        <img id="lightbox-img" src="" alt="Gallery Preview">
    </div>

    <!-- Floating WhatsApp Button -->
    <a href="https://wa.me/919810483544?text=Hi%20Verma%20Caterers%20and%20Events%2C%20I%20am%20interested%20in%20${encodeURIComponent(page.h1)}." class="whatsapp-float" target="_blank" rel="noopener noreferrer" aria-label="Chat with Sandeep Verma on WhatsApp">
        <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 2a13 13 0 0 0-11 20L3 29l7-2a13 13 0 1 0 6-25zm0 24a11 11 0 0 1-5.6-1.5l-.4-.2-4.1 1.1 1.1-4-.3-.4A11 11 0 1 1 16 26zm6-8.2c-.3-.2-1.9-1-2.2-1.1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7 0a9 9 0 0 1-2.6-1.6 10 10 0 0 1-1.8-2.3c-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.4.3-.6a.6.6 0 0 0 0-.6c0-.2-.7-1.7-1-2.3-.3-.6-.6-.5-.8-.5h-.7c-.2 0-.7.1-1 .5s-1.3 1.3-1.3 3.1 1.4 3.6 1.5 3.8 2.7 4.1 6.5 5.8c.9.4 1.6.6 2.2.8.9.3 1.8.2 2.5.1.8-.1 2.5-1 2.8-2s.3-1.9.2-2c-.1-.1-.3-.2-.6-.4z"/></svg>
        <span class="whatsapp-tooltip">Chat with Sandeep Verma</span>
    </a>

    <!-- Modal Form -->
    <div class="quote-modal-overlay" id="quoteModal" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
        <div class="quote-modal-container">
            <button type="button" class="quote-modal-close" id="quoteModalClose" aria-label="Close quote modal">&times;</button>
            <h2 class="quote-modal-title" id="modalTitle">Get Free Quote from Sandeep Verma</h2>
            <p class="quote-modal-subtitle">Fill in your event details below for a customized catering &amp; decor proposal within 2 hours.</p>
            <form id="quoteModalForm" action="https://formspree.io/f/FORM_ID" method="POST">
                <input type="hidden" name="_next" value="https://vermacaterersevents.com/thank-you.html">
                <div class="modal-form-group">
                    <label for="quoteFullName">Full Name <span class="required">*</span></label>
                    <input type="text" id="quoteFullName" name="fullName" class="modal-form-control" placeholder="e.g. Rahul Sharma" required>
                </div>
                <div class="modal-form-row">
                    <div class="modal-form-group">
                        <label for="quotePhone">Phone Number <span class="required">*</span></label>
                        <input type="tel" id="quotePhone" name="phone" class="modal-form-control" placeholder="10-digit mobile number" pattern="[6-9]\\d{9}" title="Please enter a valid 10-digit Indian mobile number" required>
                    </div>
                    <div class="modal-form-group">
                        <label for="quoteEmail">Email Address (Optional)</label>
                        <input type="email" id="quoteEmail" name="email" class="modal-form-control" placeholder="name@example.com">
                    </div>
                </div>
                <div class="modal-form-row">
                    <div class="modal-form-group">
                        <label for="quoteEventType">Event Type <span class="required">*</span></label>
                        <select id="quoteEventType" name="eventType" class="modal-form-control" required>
                            <option value="">Select Event Type</option>
                            <option value="Wedding">Wedding</option>
                            <option value="Birthday Party">Birthday Party</option>
                            <option value="Corporate Event">Corporate Event</option>
                            <option value="Engagement">Engagement</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div class="modal-form-group">
                        <label for="quoteEventDate">Event Date <span class="required">*</span></label>
                        <input type="date" id="quoteEventDate" name="eventDate" class="modal-form-control" required>
                    </div>
                </div>
                <div class="modal-form-row">
                    <div class="modal-form-group">
                        <label for="quoteExpectedGuests">Expected Guests <span class="required">*</span></label>
                        <select id="quoteExpectedGuests" name="expectedGuests" class="modal-form-control" required>
                            <option value="">Select Guest Count</option>
                            <option value="50-100">50 - 100 Guests</option>
                            <option value="100-200">100 - 200 Guests</option>
                            <option value="200-500">200 - 500 Guests</option>
                            <option value="500-1000">500 - 1000 Guests</option>
                            <option value="1000+">1000+ Guests</option>
                        </select>
                    </div>
                    <div class="modal-form-group">
                        <label for="quoteLocation">Location / Venue</label>
                        <input type="text" id="quoteLocation" name="location" class="modal-form-control" placeholder="e.g. Dwarka / Gurgaon">
                    </div>
                </div>
                <div class="modal-form-group">
                    <label for="quoteMessage">Special Requirements / Message</label>
                    <textarea id="quoteMessage" name="message" class="modal-form-control" rows="3" placeholder="Tell us about food preferences, themes, decor..."></textarea>
                </div>
                <button type="submit" class="modal-submit-btn">Get Free Quote from Sandeep Verma</button>
            </form>
        </div>
    </div>

    <script src="script.js" defer></script>
</body>
</html>`;
}

pages.forEach(p => {
    const html = generateHTML(p);
    const rootPath = path.join(__dirname, p.filename);
    const vermaPath = path.join(__dirname, 'verma-caterers', p.filename);
    fs.writeFileSync(rootPath, html);
    fs.writeFileSync(vermaPath, html);
    console.log(`Generated ${p.filename} in root and verma-caterers/`);
});
