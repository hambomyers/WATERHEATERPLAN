// Water Heater Plan - Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Pricing Region Toggle (Pricing Page)
    const regionToggle = document.getElementById('regionToggle');
    if (regionToggle) {
        const valleyPrices = document.querySelectorAll('.valley-price');
        const basePrices = document.querySelectorAll('.base-price');
        const toggleOptions = document.querySelectorAll('.toggle-option');
        
        regionToggle.addEventListener('change', function() {
            if (this.checked) {
                // Show base prices
                valleyPrices.forEach(el => el.style.display = 'none');
                basePrices.forEach(el => el.style.display = 'table-cell');
                toggleOptions[0].classList.remove('active');
                toggleOptions[1].classList.add('active');
            } else {
                // Show valley prices
                valleyPrices.forEach(el => el.style.display = 'table-cell');
                basePrices.forEach(el => el.style.display = 'none');
                toggleOptions[0].classList.add('active');
                toggleOptions[1].classList.remove('active');
            }
        });
    }

    // Form Validation and Submission
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#EF4444';
                } else {
                    field.style.borderColor = '';
                }
            });
            
            if (isValid) {
                // In production, this would submit to a backend
                // For now, show success message
                showNotification('Thank you! We\'ll be in touch within 24 hours.', 'success');
                form.reset();
            } else {
                showNotification('Please fill in all required fields.', 'error');
            }
        });
    });

    // Newsletter Form
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                showNotification('Thanks for subscribing! Check your email for confirmation.', 'success');
                this.reset();
            }
        });
    });

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#signup') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Fade-in Animation on Scroll
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

    // Observe fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Blog Post Expand/Collapse (if implementing read more)
    const readMoreLinks = document.querySelectorAll('.link-arrow');
    readMoreLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const postContent = this.closest('.post-content');
            const fullContent = postContent.querySelector('.post-full-content');
            
            if (fullContent) {
                if (fullContent.style.display === 'block') {
                    fullContent.style.display = 'none';
                    this.textContent = 'Read full article →';
                } else {
                    fullContent.style.display = 'block';
                    this.textContent = 'Show less ←';
                }
            }
        });
    });

    // Sticky Header on Scroll
    let lastScroll = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
        }
        
        lastScroll = currentScroll;
    });

    // Notification System
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existing = document.querySelector('.notification');
        if (existing) {
            existing.remove();
        }

        // Create notification
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style notification
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background-color: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
            max-width: 400px;
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }

    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // QR Code Click Tracking (for analytics)
    document.querySelectorAll('.qr-code-header, .hero-qr, .footer-qr, .qr-code-large').forEach(qr => {
        qr.addEventListener('click', function() {
            console.log('QR Code clicked - Track this event in analytics');
            // In production: gtag('event', 'qr_code_click', { location: 'header' });
        });
    });

    // Track CTA Button Clicks
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
        btn.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            console.log(`CTA clicked: ${buttonText}`);
            // In production: gtag('event', 'cta_click', { button_text: buttonText });
        });
    });

    // Initialize tooltips or popovers if needed
    // This is a placeholder for future enhancements

    console.log('Water Heater Plan website initialized successfully');
});

// Utility function for email validation
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Utility function for phone validation
function isValidPhone(phone) {
    const re = /^[\d\s\-\(\)]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
}
