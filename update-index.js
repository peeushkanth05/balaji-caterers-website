const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf-8');

const cssToAdd = `
        .g-slides {
            position: absolute;
            inset: 0;
            z-index: 1;
        }
        .g-slide {
            position: absolute;
            inset: 0;
            background-size: cover;
            background-position: center;
            opacity: 0;
            animation: galleryCrossfade 12s infinite linear;
        }
        .g-slide:nth-child(1) { animation-delay: 0s; }
        .g-slide:nth-child(2) { animation-delay: 4s; }
        .g-slide:nth-child(3) { animation-delay: 8s; }
        
        @keyframes galleryCrossfade {
            0% { opacity: 0; transform: scale(1); }
            5% { opacity: 1; }
            33% { opacity: 1; transform: scale(1.05); }
            38% { opacity: 0; }
            100% { opacity: 0; transform: scale(1); }
        }

        .gallery-item .g-label {
            position: relative;
            z-index: 3;
            font-weight: 800;
            font-size: 1.1rem;
            color: #2c2c2c;
            background: rgba(255, 255, 255, 0.95);
            padding: 10px 24px;
            border-radius: 50px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            transition: transform 0.3s ease;
        }
        
        .gallery-item:hover .g-label {
            transform: translateY(-5px);
        }

        .gallery-item .g-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.5));
            z-index: 2;
        }
`;

html = html.replace('.gallery-item .g-label {', cssToAdd + '\n        .gallery-item .old-label {');

const newGridHtml = `
        <div class="gallery-grid reveal">
            <a href="/wedding-decor" class="gallery-item wide tall" style="display: flex; text-decoration: none;">
                <div class="g-slides">
                    <div class="g-slide" style="background-image: url('grand_wedding_decor/3dce2ebd-b344-485c-80e0-88cad120d299.jpg');"></div>
                    <div class="g-slide" style="background-image: url('grand_wedding_decor/7b473ea8-3932-41ab-bac7-910973b59980.jpg');"></div>
                    <div class="g-slide" style="background-image: url('grand_wedding_decor/8e631f19-fd48-4e0b-aeff-1d652baa5f7e.jpg');"></div>
                </div>
                <div class="g-overlay"></div>
                <div class="g-label">Grand Wedding D&eacute;cor</div>
            </a>
            <a href="/live-food-counters" class="gallery-item wide" style="display: flex; text-decoration: none;">
                <div class="g-slides">
                    <div class="g-slide" style="background-image: url('Live food stall/43a315a7-b974-47e8-a0ba-caf638adad07.jpg');"></div>
                    <div class="g-slide" style="background-image: url('Live food stall/92da9252-2680-44b0-be2f-a2cf6450fd28.jpg');"></div>
                    <div class="g-slide" style="background-image: url('Live food stall/b422e124-ef0d-44f8-9153-6ec657f9fbcb.jpg');"></div>
                </div>
                <div class="g-overlay"></div>
                <div class="g-label">Live Food Counters</div>
            </a>
            <a href="/dj-sound-setup" class="gallery-item" style="display: flex; text-decoration: none;">
                <div class="g-slides">
                    <div class="g-slide" style="background-image: url('Dj/59fcccc7-28f5-4406-a7f8-0c829808ca1a.jpg');"></div>
                    <div class="g-slide" style="background-image: url('Dj/cad47cdc-6afe-4546-bf99-5af54802a7b0.jpg');"></div>
                    <div class="g-slide" style="background-image: url('Dj/f5a9e601-eae2-49d9-810d-ed8e187c9b30.jpg');"></div>
                </div>
                <div class="g-overlay"></div>
                <div class="g-label">DJ & Sound Setup</div>
            </a>
            <a href="/floral-stage-design" class="gallery-item" style="display: flex; text-decoration: none;">
                <div class="g-slides">
                    <div class="g-slide" style="background-image: url('Floral decor/08b0f2e8-0a6e-4d84-b515-ec9f61facf8f.jpg');"></div>
                    <div class="g-slide" style="background-image: url('Floral decor/136dafda-29b7-4208-93db-9470077ffb78.jpg');"></div>
                    <div class="g-slide" style="background-image: url('Floral decor/384cb0e8-ed87-4940-b6e6-ed4dcd4ae8ef.jpg');"></div>
                </div>
                <div class="g-overlay"></div>
                <div class="g-label">Floral Stage Design</div>
            </a>
            <a href="/birthday-celebration" class="gallery-item" style="display: flex; text-decoration: none;">
                <div class="g-slides">
                    <div class="g-slide" style="background-image: url('Birthday/148c53c2-5fed-4431-823a-09523fd4c0e0.jpg');"></div>
                    <div class="g-slide" style="background-image: url('Birthday/408f8ead-c208-44b6-a88c-a3363c004067.jpg');"></div>
                    <div class="g-slide" style="background-image: url('Birthday/40eef530-cc2b-4535-8e05-4a20aed0b235.jpg');"></div>
                </div>
                <div class="g-overlay"></div>
                <div class="g-label">Birthday Celebration</div>
            </a>
            <a href="/candle-lit-mandap" class="gallery-item wide" style="display: flex; text-decoration: none;">
                <div class="g-slides">
                    <div class="g-slide" style="background-image: url('Candle lit/60027fbf-8a74-4ef1-ba3f-5cd959ec6954.jpg');"></div>
                    <div class="g-slide" style="background-image: url('Candle lit/7ff1efc6-4fba-4292-bf43-79360abe7b72.jpg');"></div>
                    <div class="g-slide" style="background-image: url('Candle lit/cd80de67-256b-4202-8889-dd0f27b989bc.jpg');"></div>
                </div>
                <div class="g-overlay"></div>
                <div class="g-label">Candle Lit Mandap</div>
            </a>
            <a href="/delicious-spreads" class="gallery-item" style="display: flex; text-decoration: none;">
                <div class="g-slides">
                    <div class="g-slide" style="background-image: url('Delicious spread/2e45cd6f-0a1f-43f9-a776-6aaa6bfcc398.jpg');"></div>
                    <div class="g-slide" style="background-image: url('Delicious spread/5a04e4ba-2c9f-44f8-9cde-72e8c9e2b308.jpg');"></div>
                    <div class="g-slide" style="background-image: url('Delicious spread/78879222-3e18-431d-a5aa-05efd84a4fe9.jpg');"></div>
                </div>
                <div class="g-overlay"></div>
                <div class="g-label">Delicious Spreads</div>
            </a>
        </div>
`;

html = html.replace(/<div class="gallery-grid reveal">[\s\S]*?<\/section>/, newGridHtml + '    </section>');

fs.writeFileSync('index.html', html);
console.log('Updated index.html!');
