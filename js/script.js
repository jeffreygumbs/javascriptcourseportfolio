// Mobile menu handling
document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.querySelector('.menu-btn');
    const navMenu = document.querySelector('nav ul');

    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking a link
        const navLinks = document.querySelectorAll('nav ul li a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuBtn.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
});

// Get the form element
const form = document.querySelector('form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

// Create toast container
const toastContainer = document.createElement('div');
toastContainer.className = 'toast-container';
document.body.appendChild(toastContainer);

// Function to create and show toast
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = document.createElement('span');
    icon.className = 'toast-icon';
    icon.innerHTML = type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ';
    
    const messageSpan = document.createElement('span');
    messageSpan.className = 'toast-message';
    messageSpan.textContent = message;
    
    toast.appendChild(icon);
    toast.appendChild(messageSpan);
    toastContainer.appendChild(toast);
    
    // Trigger reflow to enable transition
    toast.offsetHeight;
    toast.classList.add('show');
    
    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toastContainer.removeChild(toast);
        }, 300);
    }, 3000);
}

// Function to validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Add form submission event listener
form.addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;
    
    // Validate name
    if (nameInput.value.trim() === '') {
        showToast('Name is required', 'error');
        nameInput.style.borderColor = 'red';
        isValid = false;
    } else {
        nameInput.style.borderColor = '';
    }
    
    // Validate email
    if (emailInput.value.trim() === '') {
        showToast('Email is required', 'error');
        emailInput.style.borderColor = 'red';
        isValid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
        showToast('Please enter a valid email', 'error');
        emailInput.style.borderColor = 'red';
        isValid = false;
    } else {
        emailInput.style.borderColor = '';
    }
    
    // Validate message
    if (messageInput.value.trim() === '') {
        showToast('Message is required', 'error');
        messageInput.style.borderColor = 'red';
        isValid = false;
    } else {
        messageInput.style.borderColor = '';
    }
    
    // If form is valid, show success toast and reset form
    if (isValid) {
        showToast('Form submitted successfully!', 'success');
        form.reset();
    }
});

// Contact Form Handling
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: contactForm.name.value.trim(),
                email: contactForm.email.value.trim(),
                subject: contactForm.subject.value.trim(),
                message: contactForm.message.value.trim()
            };
            
            // Basic validation
            if (!formData.name || !formData.email || !formData.subject || !formData.message) {
                showToast('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(formData.email)) {
                showToast('Please enter a valid email address', 'error');
                return;
            }
            
            // Here you would typically send the form data to a server
            // For now, we'll just show a success message
            showToast('Message sent successfully!', 'success');
            contactForm.reset();
        });
    }
});

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Toast notification system
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    const container = document.querySelector('.toast-container') || createToastContainer();
    container.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(0)';
    }, 10);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function createToastContainer() {
    const container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
    return container;
}

// Navigation Handling
document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    // Handle navigation background on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
    
    // Handle smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Update active link
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });
    
    // Update active navigation link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});

// Skills Slider
function initSkillsSlider() {
    const slider = document.querySelector('.skills-slider');
    if (!slider) return;
    
    const track = slider.querySelector('.skills-track');
    const items = track.querySelectorAll('.skill-item');
    
    // Clone items for infinite scroll
    items.forEach(item => {
        const clone = item.cloneNode(true);
        track.appendChild(clone);
    });
}

// Initialize slider when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initSkillsSlider();
});

// Scroll Reveal Animation
function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', reveal);

// Add wave emoji to greeting
document.addEventListener('DOMContentLoaded', () => {
    const greeting = document.querySelector('.greeting');
    if (greeting) {
        greeting.innerHTML = greeting.textContent.replace('Hello,', 'Hello <span class="wave-emoji">👋</span>,');
    }
    
    // Initialize scroll reveal
    reveal();
    
    // Add scroll reveal class to sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('reveal');
    });
    
    // Smooth scroll for all anchor links
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
    
    // Parallax effect for home section
    const homeSection = document.querySelector('.home-section');
    if (homeSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            homeSection.style.backgroundPositionY = scrolled * 0.5 + 'px';
        });
    }
    
    // Typing animation for role text
    const roleText = document.querySelector('.role');
    if (roleText) {
        const text = roleText.textContent;
        roleText.textContent = '';
        let charIndex = 0;
        
        function typeText() {
            if (charIndex < text.length) {
                roleText.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeText, 100);
            }
        }
        
        // Start typing animation after initial animations
        setTimeout(typeText, 1000);
    }
});

// Add hover effect to tech stack icons
document.querySelectorAll('.tech-icons i').forEach(icon => {
    icon.addEventListener('mouseover', () => {
        icon.style.transform = 'translateY(-5px) scale(1.1)';
    });
    
    icon.addEventListener('mouseout', () => {
        icon.style.transform = 'translateY(0) scale(1)';
    });
});