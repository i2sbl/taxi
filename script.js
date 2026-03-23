// Smart Navbar Hide/Show on Scroll
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 80) {
        // Scrolling down - hide navbar
        if (scrollTop > lastScrollTop) {
            navbar.classList.add('navbar-hidden');
            navbar.classList.remove('navbar-reduced');
        }
        // Scrolling up - show navbar reduced
        else {
            navbar.classList.remove('navbar-hidden');
            navbar.classList.add('navbar-reduced');
        }
    } else {
        // At top - full navbar
        navbar.classList.remove('navbar-hidden');
        navbar.classList.remove('navbar-reduced');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(registration => {
                console.log('Service Worker enregistré avec succès:', registration);
            })
            .catch(error => {
                console.log('Erreur Service Worker:', error);
            });
    });
}

function toggleDarkMode() {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);

    // Close mobile menu after dark mode toggle
    const navMenu = document.querySelector('.nav-menu');
    const menuBurger = document.querySelector('.menu-burger');
    if (navMenu && menuBurger) {
        navMenu.classList.remove('active');
        menuBurger.classList.remove('active');
    }
}

// Restore dark mode preference on page load
window.addEventListener('load', () => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (savedDarkMode) {
        document.body.classList.add('dark-mode');
    }

    // Attach click listeners to all dark mode toggle buttons
    const darkModeToggles = document.querySelectorAll('.dark-mode-toggle');
    darkModeToggles.forEach(toggle => {
        toggle.addEventListener('click', toggleDarkMode);
    });
});

// Menu Burger Toggle
const menuBurger = document.querySelector('.menu-burger');
const navMenu = document.querySelector('.nav-menu');

if (menuBurger && navMenu) {
    menuBurger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuBurger.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuBurger.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar')) {
            navMenu.classList.remove('active');
            menuBurger.classList.remove('active');
        }
    });
}

// Language Switching
window.addEventListener('load', () => {
    const langButtons = document.querySelectorAll('.lang-btn');

    langButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = button.getAttribute('data-lang');
            if (typeof changeLanguage === 'function') {
                changeLanguage(lang);

                // Close mobile menu after language change
                const navMenu = document.querySelector('.nav-menu');
                const menuBurger = document.querySelector('.menu-burger');
                if (navMenu && menuBurger) {
                    navMenu.classList.remove('active');
                    menuBurger.classList.remove('active');
                }
            } else {
                console.warn('changeLanguage function not found');
            }
        });
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply observer to cards
document.querySelectorAll('.service-card, .zone-item, .benefit').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add scroll effect to navbar
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.12)';
    } else {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
    }
});

// Accessibility: Close burger menu with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        menuBurger.classList.remove('active');
    }
});

console.log('Taxi Driver Courchevel - Site loaded successfully with multi-language and dark mode support');
