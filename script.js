/* ============================================
   DONATE A COMPUTER KENYA - WEBSITE SCRIPTS
   ============================================
   
   This file contains all the JavaScript functionality for the website.
   
   FUNCTIONS IN THIS FILE:
   1. Slideshow Animation (auto-rotating hero images)
   2. Computer Parts Animation (cycling icons)
   3. Smooth Scroll Navigation
   4. Form Submission Handler
   5. Scroll Animations
   
   TEAM NOTES:
   - The slideshow changes every 5 seconds
   - Users can manually control with arrows or dots
   - Computer icon cycles through different tech items
   - Contact form shows alert on submit
   
   ============================================ */


// ========================================
// SLIDESHOW FUNCTIONALITY
// ========================================

let currentSlideIndex = 0;
let slideElements = [];
let dotElements = [];
let autoSlideTimer = null;

// Initialize slideshow when page is fully loaded
window.addEventListener('load', function() {
    console.log('Page loaded, initializing slideshow...');
    setupSlideshow();
});

function setupSlideshow() {
    // Get all slide and dot elements
    slideElements = document.querySelectorAll('.slide');
    dotElements = document.querySelectorAll('.dot');
    
    console.log('Found ' + slideElements.length + ' slides');
    console.log('Found ' + dotElements.length + ' dots');
    
    if (slideElements.length === 0) {
        console.error('No slides found!');
        return;
    }
    
    // Show first slide
    displaySlide(0);
    
    // Start automatic slideshow
    startAutoSlide();
    
    console.log('Slideshow initialized successfully');
}

function displaySlide(index) {
    // Make sure index is valid
    if (index >= slideElements.length) {
        currentSlideIndex = 0;
    } else if (index < 0) {
        currentSlideIndex = slideElements.length - 1;
    } else {
        currentSlideIndex = index;
    }
    
    // Remove active class from all slides and dots
    for (let i = 0; i < slideElements.length; i++) {
        slideElements[i].classList.remove('active');
    }
    for (let i = 0; i < dotElements.length; i++) {
        dotElements[i].classList.remove('active');
    }
    
    // Add active class to current slide and dot
    slideElements[currentSlideIndex].classList.add('active');
    if (dotElements[currentSlideIndex]) {
        dotElements[currentSlideIndex].classList.add('active');
    }
    
    console.log('Showing slide ' + currentSlideIndex);
}

function changeSlide(direction) {
    console.log('Change slide by: ' + direction);
    stopAutoSlide();
    currentSlideIndex = currentSlideIndex + direction;
    displaySlide(currentSlideIndex);
    startAutoSlide();
}

function currentSlide(index) {
    console.log('Jump to slide: ' + index);
    stopAutoSlide();
    displaySlide(index);
    startAutoSlide();
}

function startAutoSlide() {
    stopAutoSlide(); // Clear any existing timer
    autoSlideTimer = setInterval(function() {
        currentSlideIndex++;
        displaySlide(currentSlideIndex);
    }, 5000); // Change every 5 seconds
    console.log('Auto-slide started');
}

function stopAutoSlide() {
    if (autoSlideTimer) {
        clearInterval(autoSlideTimer);
        autoSlideTimer = null;
        console.log('Auto-slide stopped');
    }
}

// ========================================
// NAVIGATION FUNCTIONS
// ========================================

// Navigate to Stories section
function goToStories() {
    const storiesSection = document.getElementById('stories');
    if (storiesSection) {
        storiesSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// ========================================
// COMPUTER PARTS ANIMATION
// ========================================

// Array of computer-related icons/text to cycle through
const icons = [
    { content: '💻', size: '8rem' },
    { content: '⌨️', size: '8rem' },
    { content: '🖱️', size: '8rem' },
    { content: '🖥️', size: '8rem' },
    { content: '🖨️', size: '8rem' },
    { content: 'Raspberry Pi', size: '3rem' },
    { content: 'IoT Devices', size: '3rem' }
];

let currentIndex = 0;
const iconDisplay = document.getElementById('iconDisplay');

function cycleIcons() {
    if (iconDisplay) {
        currentIndex = (currentIndex + 1) % icons.length;
        const currentIcon = icons[currentIndex];
        iconDisplay.textContent = currentIcon.content;
        iconDisplay.style.fontSize = currentIcon.size;
    }
}

// Change icon every 2 seconds
setInterval(cycleIcons, 2000);

// ========================================
// FORM HANDLING
// ========================================

// Form is now handled by Formspree (https://formspree.io/f/xlgwbpnd)
// Submissions go directly to your email: donateacomputerke@gmail.com
// No JavaScript needed - Formspree handles everything!

// ========================================
// SCROLL ANIMATIONS
// ========================================

// Add scroll animation to elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animation to these elements
document.querySelectorAll('.mission-card, .donation-card, .impact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// ========================================
// END OF SCRIPT
// ========================================
