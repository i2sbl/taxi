// Service Worker Registration
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

// Form handling
const reservationForm = document.getElementById('reservationForm');
if (reservationForm) {
    reservationForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            date: document.getElementById('date').value,
            location: document.getElementById('location').value,
            destination: document.getElementById('destination').value
        };

        // Construct WhatsApp message (optional)
        const message = `Bonjour, je souhaite réserver un taxi:\nNom: ${formData.name}\nTéléphone: ${formData.phone}\nDate/Heure: ${formData.date}\nDépart: ${formData.location}\nDestination: ${formData.destination}`;

        // Show confirmation and redirect to call
        alert('Merci pour votre demande! Un de nos chauffeurs vous contactera très rapidement.');

        // Reset form
        reservationForm.reset();

        // Redirect to phone call
        window.location.href = 'tel:0749927055';
    });
}

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

// Apply observer to service cards, zone items, and benefits
document.querySelectorAll('.service-card, .zone-item, .benefit, .contact-form').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add active state to navigation based on scroll position
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.05)';
    }
});

// Mobile menu handling
const navMenu = document.querySelector('.nav-menu');
const navItems = document.querySelectorAll('.nav-menu a');

navItems.forEach(item => {
    item.addEventListener('click', function(e) {
        navItems.forEach(i => i.classList.remove('active'));
        this.classList.add('active');
    });
});

console.log('Taxi Driver Courchevel - Site loaded successfully');
