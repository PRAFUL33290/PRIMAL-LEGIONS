/**
 * PRIMAL LEGIONS - Main JavaScript
 * Interactions and animations for the game website
 */

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navigation background on scroll
    const mainNav = document.querySelector('.main-nav');
    let lastScrollY = window.scrollY;

    const updateNavBackground = () => {
        if (window.scrollY > 100) {
            mainNav.style.background = 'rgba(10, 10, 15, 0.98)';
        } else {
            mainNav.style.background = 'linear-gradient(180deg, rgba(10, 10, 15, 0.98), rgba(10, 10, 15, 0.9))';
        }
        lastScrollY = window.scrollY;
    };

    window.addEventListener('scroll', updateNavBackground, { passive: true });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for fade-in
    document.querySelectorAll('.faction-card, .feature, .rules-block, .card-anatomy').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeInObserver.observe(el);
    });

    // Energy bar animation
    const energyPoints = document.querySelectorAll('.energy-point');
    let currentEnergy = 0;

    const animateEnergy = () => {
        energyPoints.forEach((point, index) => {
            if (index <= currentEnergy && index < 5) {
                setTimeout(() => {
                    point.classList.add('active');
                }, index * 200);
            }
        });
    };

    // Trigger energy animation when section is visible
    const energySection = document.querySelector('.energy-system');
    if (energySection) {
        const energyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    currentEnergy = 4;
                    animateEnergy();
                    energyObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        energyObserver.observe(energySection);
    }

    // Card hover effect
    const exampleCard = document.querySelector('.example-card');
    if (exampleCard) {
        exampleCard.addEventListener('mousemove', (e) => {
            const rect = exampleCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            exampleCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        exampleCard.addEventListener('mouseleave', () => {
            exampleCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    }

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');

    const highlightNav = () => {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', highlightNav, { passive: true });

    // Console easter egg
    console.log('%c PRIMAL LEGIONS ', 'background: #c9a227; color: #0a0a0f; font-size: 24px; font-weight: bold; padding: 10px;');
    console.log('%c Invoquez vos guerriers. Dominez le champ de bataille.', 'color: #9a9a9a; font-style: italic;');
});
