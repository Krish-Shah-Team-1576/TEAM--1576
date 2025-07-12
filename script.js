// script.js - ReWear Application JavaScript

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initSmoothScrolling();
    initCarousel();
    initUserProfileDropdown();
    initImageUpload();
    initFilterDropdown();
    initContactForm();
    initFAQAccordion();
    initThumbnailGallery();
});

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Update URL without page reload
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                } else {
                    window.location.hash = targetId;
                }
            }
        });
    });
}

// Carousel functionality
function initCarousel() {
    const carousel = document.querySelector('.carousel');
    const items = document.querySelectorAll('.carousel-item');
    const dots = document.querySelectorAll('.carousel-dot');
    
    if (!carousel || items.length === 0) return;
    
    let currentIndex = 0;
    const itemCount = items.length;
    let autoRotateInterval;

    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    // Dot click event
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
            resetAutoRotate();
        });
    });

    // Auto-rotate carousel
    function startAutoRotate() {
        autoRotateInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % itemCount;
            updateCarousel();
        }, 5000);
    }

    function resetAutoRotate() {
        clearInterval(autoRotateInterval);
        startAutoRotate();
    }

    // Start auto rotation
    startAutoRotate();

    // Pause on hover
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoRotateInterval);
    });

    carousel.addEventListener('mouseleave', () => {
        startAutoRotate();
    });
}

// User profile dropdown
function initUserProfileDropdown() {
    const userProfile = document.querySelector('.user-profile');
    if (!userProfile) return;
    
    const dropdown = userProfile.querySelector('.dropdown-menu');
    
    userProfile.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('show');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
        dropdown.classList.remove('show');
    });
}

// Image upload functionality
function initImageUpload() {
    const imageUpload = document.querySelector('.image-upload');
    if (!imageUpload) return;
    
    const fileInput = imageUpload.querySelector('input[type="file"]');
    
    imageUpload.addEventListener('click', function() {
        fileInput.click();
    });

    fileInput.addEventListener('change', function(e) {
        if (e.target.files.length > 0) {
            imageUpload.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <p>${e.target.files.length} image(s) selected</p>
            `;
            
            // Preview images if needed
            // You could add image preview functionality here
        }
    });
}

// Filter dropdown functionality
function initFilterDropdown() {
    const filterBtn = document.querySelector('.filter-btn');
    const filterOptions = document.querySelector('.filter-options');
    
    if (!filterBtn || !filterOptions) return;
    
    filterBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        filterOptions.classList.toggle('show');
    });

    // Close filter dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.filter-dropdown')) {
            filterOptions.classList.remove('show');
        }
    });
}

// Contact form submission
function initContactForm() {
    const contactForm = document.querySelector('.contact-form form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Form validation
        const name = this.querySelector('#contact-name').value.trim();
        const email = this.querySelector('#contact-email').value.trim();
        const message = this.querySelector('#contact-message').value.trim();
        
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        if (!validateEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // In a real app, you would send this data to a server
        console.log('Form submitted:', { name, email, message });
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}

// Email validation helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// FAQ accordion functionality
function initFAQAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    if (faqQuestions.length === 0) return;
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            // Toggle this item
            answer.classList.toggle('show');
            
            // Rotate icon
            if (answer.classList.contains('show')) {
                icon.style.transform = 'rotate(180deg)';
            } else {
                icon.style.transform = 'rotate(0deg)';
            }
            
            // Close other open items if needed
            // faqQuestions.forEach(q => {
            //     if (q !== question) {
            //         q.nextElementSibling.classList.remove('show');
            //         q.querySelector('i').style.transform = 'rotate(0deg)';
            //     }
            // });
        });
    });
}

// Thumbnail gallery functionality
function initThumbnailGallery() {
    const mainImage = document.querySelector('.item-gallery .main-image img');
    const thumbnails = document.querySelectorAll('.thumbnail-container .thumbnail img');
    
    if (!mainImage || thumbnails.length === 0) return;
    
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            // Update main image
            mainImage.src = this.src;
            
            // Highlight selected thumbnail
            thumbnails.forEach(t => t.parentElement.classList.remove('active'));
            this.parentElement.classList.add('active');
        });
    });
}

// Additional functions that could be added:

// Form validation for signup/login
function validateSignupForm() {
    // Implementation would go here
}

// Item listing form submission
function handleItemListing() {
    // Implementation would go here
}

// Swap request functionality
function handleSwapRequest() {
    // Implementation would go here
}

// Points redemption functionality
function handlePointsRedemption() {
    // Implementation would go here
}

// Admin moderation actions
function handleAdminActions() {
    // Implementation would go here
}