document.addEventListener('DOMContentLoaded', () => {

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

    // Intersection Observer for Reveal Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active-reveal');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-zoom');
    revealElements.forEach(el => observer.observe(el));

    // --- Hero Carousel Logic ---
    const heroImages = [
        "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1600&auto=format&fit=crop", // Slide 01: Front
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800", // Slide 02: Action
        "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800", // Slide 03: Back
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800"  // Slide 04: Detail
    ];

    let currentHeroIndex = 0;
    const heroImgElement = document.getElementById('hero-image');
    const indicators = document.querySelectorAll('.hero-indicator');
    const btnPrev = document.getElementById('hero-prev');
    const btnNext = document.getElementById('hero-next');

    // Preload images
    heroImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    function updateCarousel(index) {
        // Wrap around logic
        if (index < 0) index = heroImages.length - 1;
        if (index >= heroImages.length) index = 0;

        currentHeroIndex = index;

        // Animate Image Fade
        if (heroImgElement) {
            heroImgElement.style.opacity = '0'; // begin fade out
            setTimeout(() => {
                heroImgElement.src = heroImages[currentHeroIndex];
                heroImgElement.style.opacity = '1'; // fade in
            }, 300);
        }

        // Update Indicators
        indicators.forEach((btn, i) => {
            if (i === currentHeroIndex) {
                // Active State: Big Black Number
                btn.classList.add('text-5xl', 'text-kinetic-black', 'font-black');
                btn.classList.remove('text-sm', 'font-bold', 'text-gray-400', 'hover:text-kinetic-black');
            } else {
                // Inactive State: Small Gray Number
                btn.classList.add('text-sm', 'font-bold', 'text-gray-400', 'hover:text-kinetic-black');
                btn.classList.remove('text-5xl', 'text-kinetic-black', 'font-black');
            }
        });
    }

    if (btnPrev && btnNext) {
        btnPrev.addEventListener('click', () => updateCarousel(currentHeroIndex - 1));
        btnNext.addEventListener('click', () => updateCarousel(currentHeroIndex + 1));
    }

    indicators.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.getAttribute('data-index'));
            updateCarousel(index);
        });
    });
    // --- Search Overlay Logic ---
    const searchBtn = document.getElementById('search-btn');
    const searchOverlay = document.getElementById('search-overlay');
    const closeSearchBtn = document.getElementById('close-search-btn');
    const searchInput = document.getElementById('search-input-field');

    if (searchBtn && searchOverlay && closeSearchBtn) {
        function openSearch() {
            searchOverlay.classList.remove('opacity-0', 'pointer-events-none');
            searchOverlay.classList.add('opacity-100', 'pointer-events-auto');
            setTimeout(() => searchInput.focus(), 100);
        }

        function closeSearch() {
            searchOverlay.classList.remove('opacity-100', 'pointer-events-auto');
            searchOverlay.classList.add('opacity-0', 'pointer-events-none');
        }

        searchBtn.addEventListener('click', openSearch);
        closeSearchBtn.addEventListener('click', closeSearch);

        // Close on ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && searchOverlay.classList.contains('opacity-100')) {
                closeSearch();
            }
        });
    }

    // --- Mobile Menu Logic ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMobileMenuBtn = document.getElementById('close-mobile-menu');

    if (mobileMenuBtn && mobileMenu && closeMobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('translate-x-full');
        });

        closeMobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('translate-x-full');
        });

        // Close menu when clicking a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('translate-x-full');
            });
        });
    }
});
