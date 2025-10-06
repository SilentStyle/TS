/**
 * Riad Gold - Enhanced Main JavaScript
 * Handles functionality for the main page with professional features
 */

document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

/**
 * Initialize all website functionality
 */
function initializeWebsite() {
    initializeMobileMenu();
    initializeQuickSearch();
    initializeSmoothScrolling();
    initializeAnimations();
    loadAnnouncements();
    initializeContactForm();
}

/**
 * Initialize mobile menu functionality
 */
function initializeMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('animate-fade-in-up');

            // Toggle menu icon
            const icon = mobileMenuButton.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close mobile menu when clicking on links
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuButton.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
}

/**
 * Initialize quick search form
 */
function initializeQuickSearch() {
    const quickSearchForm = document.getElementById('quick-search-form');

    if (quickSearchForm) {
        // Set minimum date to today
        const dateInput = document.getElementById('date');
        if (dateInput) {
            const today = new Date();
            const formattedDate = formatDate(today);
            dateInput.min = formattedDate;
            dateInput.value = formattedDate;
        }

        quickSearchForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const dateInput = document.getElementById('date');
            const timeSelect = document.getElementById('time');

            if (dateInput && dateInput.value) {
                let url = `booking.html?date=${dateInput.value}`;

                // Add time parameter if selected
                if (timeSelect && timeSelect.value) {
                    url += `&time=${timeSelect.value}`;
                }

                // Redirect to booking page
                window.location.href = url;
            }
        });
    }
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initializeSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Initialize scroll animations
 */
function initializeAnimations() {
    // Add intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature-card, .pricing-card, .facility-item, .stat-card');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

/**
 * Load announcements with enhanced design
 */
function loadAnnouncements() {
    const announcementsContainer = document.getElementById('announcements-container');

    if (!announcementsContainer) return;

    // Show loading state with better design
    announcementsContainer.innerHTML = `
        <div class="col-span-1 md:col-span-2 lg:col-span-3 text-center py-12">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-riad-gold/10 rounded-2xl mb-4">
                <i class="fas fa-newspaper text-riad-gold text-2xl"></i>
            </div>
            <h3 class="text-xl font-semibold text-riad-dark mb-2">Loading Updates</h3>
            <p class="text-gray-600">Getting the latest news and announcements...</p>
        </div>
    `;

    // Simulate API call
    setTimeout(() => {
        const announcements = [
            {
                title: 'New Turf Installation Complete!',
                content: 'We have successfully installed new professional-grade turf on Field 2. Experience enhanced playability and safety.',
                date: 'June 18, 2023',
                type: 'improvement',
                icon: 'fas fa-grass'
            },
            {
                title: 'Summer Tournament Registration Open',
                content: 'Register your team for our annual summer tournament. Great prizes and competitive matches await!',
                date: 'June 15, 2023',
                type: 'event',
                icon: 'fas fa-trophy'
            },
            {
                title: 'Extended Weekend Hours',
                content: 'We are now open until 11:00 PM on Fridays and Saturdays to accommodate more players.',
                date: 'June 10, 2023',
                type: 'update',
                icon: 'fas fa-clock'
            }
        ];

        updateAnnouncementsUI(announcements);
    }, 1500);
}

/**
 * Update announcements UI
 * @param {Array} announcements - Array of announcement objects
 */
function updateAnnouncementsUI(announcements) {
    const announcementsContainer = document.getElementById('announcements-container');

    if (!announcementsContainer) return;

    // Clear container
    announcementsContainer.innerHTML = '';

    // Add announcements
    announcements.forEach(announcement => {
        const announcementElement = document.createElement('div');
        announcementElement.className = 'feature-card text-left';

        let typeColor = 'bg-gray-100 text-gray-800';
        switch (announcement.type) {
            case 'improvement':
                typeColor = 'bg-green-100 text-green-800';
                break;
            case 'event':
                typeColor = 'bg-blue-100 text-blue-800';
                break;
            case 'update':
                typeColor = 'bg-purple-100 text-purple-800';
                break;
        }

        announcementElement.innerHTML = `
            <div class="flex items-start justify-between mb-4">
                <div class="flex items-center space-x-3">
                    <div class="w-12 h-12 bg-riad-gold/10 rounded-xl flex items-center justify-center">
                        <i class="${announcement.icon} text-riad-gold text-lg"></i>
                    </div>
                    <div>
                        <h3 class="text-xl font-semibold text-riad-dark">${announcement.title}</h3>
                        <span class="text-xs px-2 py-1 rounded-full ${typeColor} font-medium">${announcement.type}</span>
                    </div>
                </div>
            </div>
            <p class="text-gray-600 mb-4 leading-relaxed">${announcement.content}</p>
            <div class="flex items-center justify-between text-sm text-gray-500">
                <span><i class="fas fa-calendar mr-1"></i>${announcement.date}</span>
                <button class="text-riad-gold font-semibold hover:text-amber-700 transition-colors">
                    Read More <i class="fas fa-arrow-right ml-1"></i>
                </button>
            </div>
        `;

        announcementsContainer.appendChild(announcementElement);
    });
}

/**
 * Initialize contact form functionality
 */
function initializeContactForm() {
    const contactForm = document.querySelector('#contact form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = {
                firstName: this.querySelector('input[type="text"]:nth-child(1)').value,
                lastName: this.querySelector('input[type="text"]:nth-child(2)').value,
                email: this.querySelector('input[type="email"]').value,
                subject: this.querySelectorAll('input[type="text"]')[2].value,
                message: this.querySelector('textarea').value
            };

            // Validate form
            if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }

            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                showNotification('Thank you for your message! We will get back to you within 24 hours.', 'success');
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

/**
 * Show notification message
 * @param {string} message - The message to display
 * @param {string} type - The type of notification (success, error, warning)
 */
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.custom-notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `custom-notification fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transform transition-transform duration-300 translate-x-0 ${
        type === 'success' ? 'bg-green-500 text-white' :
        type === 'error' ? 'bg-red-500 text-white' :
        'bg-yellow-500 text-white'
    }`;

    const icon = type === 'success' ? 'fa-check-circle' :
                 type === 'error' ? 'fa-exclamation-circle' :
                 'fa-exclamation-triangle';

    notification.innerHTML = `
        <div class="flex items-center space-x-3">
            <i class="fas ${icon} text-xl"></i>
            <span class="font-semibold">${message}</span>
        </div>
    `;

    // Add to page
    document.body.appendChild(notification);

    // Remove after 5 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

/**
 * Format date to YYYY-MM-DD
 * @param {Date} date - The date to format
 * @returns {string} - Formatted date
 */
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

/**
 * Handle page visibility changes
 */
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        // Page became visible, you could refresh data here
        console.log('Page is now visible');
    }
});

// Add loading state for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');

    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });

        img.addEventListener('error', function() {
            this.classList.add('error');
            console.warn('Failed to load image:', this.src);
        });
    });
});