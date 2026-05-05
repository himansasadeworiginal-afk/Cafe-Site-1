document.addEventListener('DOMContentLoaded', () => {
    // Search Functionality
    const searchInput = document.getElementById('searchInput');
    const productCards = document.querySelectorAll('.product-card');
    const noResultsMsg = document.getElementById('noResults');

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        let visibleCount = 0;

        productCards.forEach(card => {
            const productName = card.getAttribute('data-name').toLowerCase();
            if (productName.includes(searchTerm)) {
                card.style.display = 'block';
                // Small animation for appearing
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1) translateY(0)';
                }, 10);
                visibleCount++;
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.9) translateY(10px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300); // match transition duration
            }
        });

        if (visibleCount === 0) {
            setTimeout(() => {
                noResultsMsg.classList.remove('hidden');
            }, 300);
        } else {
            noResultsMsg.classList.add('hidden');
        }
    });

    // Intersection Observer for scroll animations
    const faders = document.querySelectorAll('.fade-in');
    
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(
        entries, 
        appearOnScroll
    ) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // Custom Cursor and Parallax effect
    const cursor = document.getElementById('custom-cursor');
    const cursorGlow = document.getElementById('cursor-glow');
    const heroSection = document.getElementById('hero');
    const heroImgContainer = document.querySelector('.hero-image-container');
    const glassOrb = document.querySelector('.glass-orb');
    
    // Custom cursor movement
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // Add a slight delay to the glow for a trailing effect
        setTimeout(() => {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
        }, 50);
    });

    // Hover effects on interactive elements
    const interactives = document.querySelectorAll('a, button, input, .product-card');
    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(2)';
            cursor.style.backgroundColor = 'transparent';
            cursor.style.border = '1px solid var(--caramel)';
            cursorGlow.style.transform = 'translate(-50%, -50%) scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.backgroundColor = 'var(--caramel)';
            cursor.style.border = 'none';
            cursorGlow.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
    // Spline Model Parallax & Scroll Animation
    const splineWrapper = document.getElementById('spline-wrapper');
    if (splineWrapper) {
        // Scroll animation: subtle rotation and vertical shift
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const rotateVal = scrollY * 0.05;
            const translateY = scrollY * 0.15;
            splineWrapper.style.transform = `translateY(${translateY}px) rotateX(${rotateVal}deg) rotateY(${rotateVal * 0.5}deg)`;
        });

        // Mouse movement: subtle tilt to react "in a neat way"
        document.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth / 2 - e.clientX) * 0.02;
            const y = (window.innerHeight / 2 - e.clientY) * 0.02;
            const scrollY = window.scrollY;
            const rotateX = scrollY * 0.05 + y * 0.5;
            const rotateY = scrollY * 0.025 - x * 0.5;
            splineWrapper.style.transform = `translate(${x}px, ${y}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
    }

});
