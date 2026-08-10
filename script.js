document.addEventListener('DOMContentLoaded', () => {
    // 1. Update copyright year
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // 2. Sticky Navbar & Active Menu Item
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (window.scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (current && link.getAttribute('href') && link.getAttribute('href').includes(current)) {
                    link.classList.add('active');
                }
            });
        });
    }

    // 3. Hamburger Mobile Menu
    const hamburger = document.getElementById('hamburger');
    const navLinksContainer = document.getElementById('nav-links');

    if (hamburger && navLinksContainer) {
        hamburger.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            hamburger.classList.toggle('open');
            const icon = hamburger.querySelector('i');
            if (icon) {
                if (navLinksContainer.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                    icon.style.color = '#800000';
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                    icon.style.color = window.scrollY > 50 ? '#800000' : '#ffffff';
                }
            }
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinksContainer.classList.remove('active');
                hamburger.classList.remove('open');
                const icon = hamburger.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // 4. Scroll Animations (Intersection Observer)
    const fadeUpElements = document.querySelectorAll('.fade-up');
    const slideLeftElements = document.querySelectorAll('.slide-in-left');
    const slideRightElements = document.querySelectorAll('.slide-in-right');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const flexObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeUpElements.forEach(el => flexObserver.observe(el));
    slideLeftElements.forEach(el => flexObserver.observe(el));
    slideRightElements.forEach(el => flexObserver.observe(el));

    setTimeout(() => {
        document.querySelectorAll('.hero .fade-up').forEach(el => el.classList.add('visible'));
    }, 100);

    // 5. Gallery Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(button => button.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.classList.remove('hide');
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.classList.add('hide');
                    }, 300);
                }
            });
        });
    });

    // 6. Lightbox for Gallery
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightbox = document.querySelector('.close-lightbox');
    const galleryImages = document.querySelectorAll('.gallery-item img');

    if (lightbox && lightboxImg) {
        galleryImages.forEach(img => {
            if (img.parentElement) {
                img.parentElement.addEventListener('click', () => {
                    lightbox.classList.add('active');
                    lightboxImg.src = img.src;
                });
            }
        });

        if (closeLightbox) {
            closeLightbox.addEventListener('click', () => {
                lightbox.classList.remove('active');
            });
        }

        lightbox.addEventListener('click', (e) => {
            if (e.target !== lightboxImg) {
                lightbox.classList.remove('active');
            }
        });
    }

    // 7. Quote Form Modal System & Mailto Link Interception
    const modal = document.getElementById('quoteModal');
    const modalCloseBtn = document.getElementById('quoteModalClose');

    window.openQuoteModal = function() {
        if (modal) {
            modal.classList.add('open');
            document.body.style.overflow = 'hidden';
        }
    };

    window.closeQuoteModal = function() {
        if (modal) {
            modal.classList.remove('open');
            document.body.style.overflow = '';
        }
    };

    // Attach open handler to all triggers (buttons, mailto links, etc.)
    document.querySelectorAll('.open-quote-modal, .btn-quote, a[href^="mailto:"]').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            openQuoteModal();
        });
    });

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeQuoteModal);
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeQuoteModal();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
            closeQuoteModal();
        }
    });

    // 8. Event Tracking: Quote Form Submission
    const quoteForm = document.getElementById('quoteModalForm') || document.getElementById('bookingForm');
    if (quoteForm) {
        quoteForm.addEventListener('submit', function() {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                'event': 'quote_request',
                'event_category': 'Lead Generation',
                'event_label': 'Get Free Quote Form'
            });
            if (typeof fbq === 'function') {
                fbq('track', 'Lead');
            }
        });
    }

    // 9. Event Tracking: Phone Number Clicks
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        link.addEventListener('click', function() {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                'event': 'phone_click',
                'phone_number': this.getAttribute('href')
            });
        });
    });

    // 10. Event Tracking: WhatsApp Floating Button Clicks
    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
        link.addEventListener('click', function() {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                'event': 'whatsapp_click',
                'whatsapp_number': '+919810483544'
            });
        });
    });

    // 11. Event Tracking: Package Card Scroll View (IntersectionObserver)
    const packageCards = document.querySelectorAll('.package-card, [data-package-name]');
    if (packageCards.length > 0) {
        const packageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const packageName = entry.target.getAttribute('data-package-name') || 
                                        entry.target.querySelector('h3, h4, .package-title')?.textContent.trim() || 
                                        'Package Card';
                    window.dataLayer = window.dataLayer || [];
                    window.dataLayer.push({
                        'event': 'package_view',
                        'package_name': packageName
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        packageCards.forEach(card => packageObserver.observe(card));
    }
});
