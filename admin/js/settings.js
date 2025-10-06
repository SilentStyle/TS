/**
 * Riad Gold - Admin Settings JavaScript
 * Handles functionality for the settings page
 */

document.addEventListener('DOMContentLoaded', function() {
    // Form submissions
    const businessHoursForm = document.getElementById('business-hours-form');
    if (businessHoursForm) {
        businessHoursForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveBusinessHours();
        });
    }

    const bookingSettingsForm = document.getElementById('booking-settings-form');
    if (bookingSettingsForm) {
        bookingSettingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveBookingSettings();
        });
    }

    const notificationSettingsForm = document.getElementById('notification-settings-form');
    if (notificationSettingsForm) {
        notificationSettingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveNotificationSettings();
        });
    }
});

/**
 * Save business hours settings
 */
function saveBusinessHours() {
    // In a real application, this would send data to the API
    console.log('Saving business hours...');

    // Show success message
    showSuccessMessage('Business hours updated successfully!');
}

/**
 * Save booking settings
 */
function saveBookingSettings() {
    // In a real application, this would send data to the API
    console.log('Saving booking settings...');

    // Show success message
    showSuccessMessage('Booking settings updated successfully!');
}

/**
 * Save notification settings
 */
function saveNotificationSettings() {
    // In a real application, this would send data to the API
    console.log('Saving notification settings...');

    // Show success message
    showSuccessMessage('Notification settings updated successfully!');
}

/**
 * Show success message
 * @param {string} message - The success message to display
 */
function showSuccessMessage(message) {
    // Create success message element
    const successMessage = document.createElement('div');
    successMessage.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-transform duration-300 translate-x-0';
    successMessage.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-check-circle mr-2"></i>
            <span>${message}</span>
        </div>
    `;

    // Add to page
    document.body.appendChild(successMessage);

    // Remove after 3 seconds
    setTimeout(() => {
        successMessage.classList.add('translate-x-full');
        setTimeout(() => {
            document.body.removeChild(successMessage);
        }, 300);
    }, 3000);
}