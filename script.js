// ============================================
// CUSTOM CURSOR
// ============================================
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

let mouseX = 0;
let mouseY = 0;
let followerX = 0;
let followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
});

// Smooth follower animation
function animateFollower() {
    const distX = mouseX - followerX;
    const distY = mouseY - followerY;
    
    followerX += distX / 10;
    followerY += distY / 10;
    
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';
    
    requestAnimationFrame(animateFollower);
}
animateFollower();

// Cursor hover effects
const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-tag, .contact-card');
hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
    });
});

// ============================================
// NAVIGATION
// ============================================
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a');
const menuToggle = document.querySelector('.menu-toggle');
const navLinksContainer = document.querySelector('.nav-links');

// Scrolled state
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinksContainer.classList.toggle('active');
});

// Close mobile menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinksContainer.classList.remove('active');
    });
});

// Active nav link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ============================================
// SCROLL ANIMATIONS
// ============================================
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe all animatable elements
const animatableElements = document.querySelectorAll(
    '.section-header, .about-text, .about-image, .skill-category, ' +
    '.project-card, .education-card, .contact-card, .resume-preview, .resume-stats, .contact-form-wrapper'
);

animatableElements.forEach(el => observer.observe(el));

// ============================================
// STAGGERED ANIMATIONS
// ============================================
const skillCategories = document.querySelectorAll('.skill-category');
skillCategories.forEach((category, index) => {
    category.style.transitionDelay = `${index * 0.1}s`;
});

const contactCards = document.querySelectorAll('.contact-card');
contactCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

const educationCards = document.querySelectorAll('.education-card');
educationCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.15}s`;
});

const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.2}s`;
});

// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// PARALLAX EFFECT
// ============================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const orbs = document.querySelectorAll('.bg-gradient-orb');
    
    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 0.05;
        orb.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ============================================
// TYPING EFFECT FOR HERO SUBTITLE
// ============================================
const typingText = document.querySelector('.hero-subtitle');
const originalText = typingText.textContent;
typingText.textContent = '';

let charIndex = 0;
function typeWriter() {
    if (charIndex < originalText.length) {
        typingText.textContent += originalText.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 50);
    }
}

// Start typing after page load
window.addEventListener('load', () => {
    setTimeout(typeWriter, 1000);
});

// ============================================
// LOADING ANIMATION
// ============================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ============================================
// CONTACT CARD CLICK TO COPY
// ============================================
contactCards.forEach(card => {
    const copyFeedback = () => {
        const link = card.querySelector('a');
        if (link) {
            const text = link.textContent;
            navigator.clipboard.writeText(text).then(() => {
                // Visual feedback
                const originalBorder = card.style.borderColor;
                card.style.borderColor = 'var(--accent)';
                
                // Create temporary notification
                const notification = document.createElement('div');
                notification.textContent = 'Copied!';
                notification.style.cssText = `
                    position: fixed;
                    top: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: var(--accent);
                    color: var(--dark);
                    padding: 10px 20px;
                    border-radius: 5px;
                    font-family: var(--font-mono);
                    font-size: 14px;
                    z-index: 10000;
                    animation: slideDown 0.3s ease;
                `;
                document.body.appendChild(notification);
                
                setTimeout(() => {
                    card.style.borderColor = originalBorder;
                    notification.remove();
                }, 1500);
            }).catch(err => {
                console.log('Failed to copy:', err);
            });
        }
    };
    
    // Add click handler
    card.addEventListener('click', copyFeedback);
});

// ============================================
// DYNAMIC YEAR IN FOOTER
// ============================================
const currentYear = new Date().getFullYear();
const footerText = document.querySelector('.footer-text');
if (footerText) {
    footerText.innerHTML = 
        `Designed & Built with <span>❤</span> by Dhaval Prajapati<br>
        © ${currentYear} All rights reserved.`;
}

// ============================================
// SCROLL PROGRESS INDICATOR
// ============================================
const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, var(--primary), var(--accent));
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
};

createScrollProgress();

// ============================================
// SKILLS TAG INTERACTION
// ============================================
const skillTags = document.querySelectorAll('.skill-tag');
skillTags.forEach(tag => {
    tag.addEventListener('click', () => {
        // Create ripple effect
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            width: 100%;
            height: 100%;
            background: var(--accent);
            opacity: 0.5;
            border-radius: inherit;
            animation: ripple 0.6s ease;
            top: 0;
            left: 0;
            pointer-events: none;
        `;
        
        tag.style.position = 'relative';
        tag.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation to document
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        0% {
            transform: scale(0);
            opacity: 0.5;
        }
        100% {
            transform: scale(1.5);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// PREVENT ANIMATION ON PAGE LOAD FOR SECTIONS
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Remove no-animation class after a brief delay
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// ============================================
// EASTER EGG: KONAMI CODE
// ============================================
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join('') === konamiPattern.join('')) {
        // Activate party mode!
        document.body.style.animation = 'rainbow 2s infinite';
        
        const partyStyle = document.createElement('style');
        partyStyle.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(partyStyle);
        
        setTimeout(() => {
            document.body.style.animation = '';
            partyStyle.remove();
        }, 5000);
    }
});

// ============================================
// PERFORMANCE: LAZY LOAD IMAGES (IF ANY ARE ADDED)
// ============================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// ACCESSIBILITY: KEYBOARD NAVIGATION
// ============================================
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape' && navLinksContainer.classList.contains('active')) {
        menuToggle.classList.remove('active');
        navLinksContainer.classList.remove('active');
    }
});

// ============================================
// CONTACT FORM HANDLING
// ============================================
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submission
        
        const submitBtn = contactForm.querySelector('.btn-submit');
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        formStatus.className = 'form-status';
        formStatus.innerHTML = '<i class="fas fa-info-circle"></i> Sending your message...';
        
        // Create hidden iframe for background submission
        let iframe = document.getElementById('formsubmit-iframe');
        if (!iframe) {
            iframe = document.createElement('iframe');
            iframe.id = 'formsubmit-iframe';
            iframe.name = 'formsubmit-iframe';
            iframe.style.display = 'none';
            document.body.appendChild(iframe);
        }
        
        // Set form target to iframe
        contactForm.target = 'formsubmit-iframe';
        
        // Submit form to iframe (runs in background)
        contactForm.submit();
        
        // Immediately redirect to thank you page
        setTimeout(() => {
            const currentUrl = window.location.href;
            const baseUrl = currentUrl.substring(0, currentUrl.lastIndexOf('/') + 1);
            window.location.href = baseUrl + 'thank-you.html';
        }, 500); // Small delay to ensure form submission starts
    });
}

// Form validation
const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
formInputs.forEach(input => {
    input.addEventListener('invalid', function(e) {
        e.preventDefault();
        this.classList.add('error');
    });
    
    input.addEventListener('input', function() {
        this.classList.remove('error');
    });
});

// ============================================
// CONSOLE MESSAGE
// ============================================
console.log('%c👋 Hello Developer!', 'color: #FF6B35; font-size: 20px; font-weight: bold;');
console.log('%cLooking at the code? I appreciate your curiosity!', 'color: #00D9FF; font-size: 14px;');
console.log('%cFeel free to reach out: dhavalprajapati4518@gmail.com', 'color: #F7B801; font-size: 12px;');

// ============================================
// EXPORT FOR MODULE USAGE (IF NEEDED)
// ============================================
// PDF RESUME VIEWER
// ============================================
function viewResume() {
    const viewer = document.getElementById('pdfViewer');
    if (viewer) {
        viewer.style.display = 'flex';
    }
}

function closePdfViewer() {
    const viewer = document.getElementById('pdfViewer');
    if (viewer) {
        viewer.style.display = 'none';
    }
}

function downloadResume(event) {
    // Allow default download behavior
    const link = event.target.closest('a');
    if (link) {
        link.setAttribute('target', '_self');
    }
}

// Close PDF viewer when clicking outside
document.addEventListener('click', (e) => {
    const viewer = document.getElementById('pdfViewer');
    if (viewer && viewer.style.display === 'flex' && e.target === viewer) {
        closePdfViewer();
    }
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initCursor: animateFollower,
        initScrollAnimations: observer
    };
}