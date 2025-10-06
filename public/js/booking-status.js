/**
 * Riad Gold - Booking Status JavaScript
 * Handles functionality for the booking status page
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Get booking ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const bookingId = urlParams.get('id');
    
    if (bookingId) {
        // Load booking details
        loadBookingDetails(bookingId);
    } else {
        // No booking ID provided, redirect to booking page
        window.location.href = 'booking.html';
    }
    
    // Cancel booking button
    const cancelBookingBtn = document.getElementById('cancel-booking-btn');
    if (cancelBookingBtn) {
        cancelBookingBtn.addEventListener('click', function() {
            // Show cancellation confirmation modal
            document.getElementById('cancel-modal').classList.remove('hidden');
        });
    }
    
    // Cancel modal close button
    const closeCancelModalBtn = document.getElementById('close-cancel-modal');
    if (closeCancelModalBtn) {
        closeCancelModalBtn.addEventListener('click', function() {
            document.getElementById('cancel-modal').classList.add('hidden');
        });
    }
    
    // Cancel modal "No" button
    const cancelNoBtn = document.getElementById('cancel-no');
    if (cancelNoBtn) {
        cancelNoBtn.addEventListener('click', function() {
            document.getElementById('cancel-modal').classList.add('hidden');
        });
    }
    
    // Cancel modal "Yes" button
    const cancelYesBtn = document.getElementById('cancel-yes');
    if (cancelYesBtn) {
        cancelYesBtn.addEventListener('click', function() {
            cancelBooking(bookingId);
        });
    }
});

/**
 * Load booking details from the API
 * @param {string} bookingId - The ID of the booking to load
 */
function loadBookingDetails(bookingId) {
    // In a real application, this would fetch from an API
    // For now, we'll use mock data
    
    // Simulate API call with setTimeout
    setTimeout(() => {
        // Generate mock booking data
        const booking = generateMockBooking(bookingId);
        
        // Update UI with booking details
        updateBookingUI(booking);
    }, 500); // Simulate network delay
}

/**
 * Generate mock booking data
 * @param {string} bookingId - The ID of the booking
 * @returns {Object} - Mock booking data
 */
function generateMockBooking(bookingId) {
    // Get a random status (mostly pending for demo purposes)
    const statusRandom = Math.random();
    let status;
    
    if (statusRandom < 0.7) {
        status = 'pending';
    } else if (statusRandom < 0.9) {
        status = 'confirmed';
    } else {
        status = 'cancelled';
    }
    
    // Generate a random date within the next 7 days
    const today = new Date();
    const bookingDate = new Date(today);
    bookingDate.setDate(today.getDate() + Math.floor(Math.random() * 7) + 1);
    
    // Generate a random hour between 8 and 22
    const hour = Math.floor(Math.random() * 15) + 8;
    
    // Calculate confirmation deadline (earlier of 24h after booking or 12h before match)
    const createdAt = new Date(today);
    createdAt.setHours(today.getHours() - Math.floor(Math.random() * 12)); // Random time in the past 12 hours
    
    const deadline1 = new Date(createdAt);
    deadline1.setHours(createdAt.getHours() + 24); // 24 hours after booking creation
    
    const deadline2 = new Date(bookingDate);
    deadline2.setHours(hour - 12); // 12 hours before match start
    
    const confirmationDeadline = deadline1 < deadline2 ? deadline1 : deadline2;
    
    return {
        id: bookingId,
        status: status,
        date: bookingDate,
        hour: hour,
        name: 'John Doe',
        phone: '+1 234 567 890',
        email: 'john.doe@example.com',
        createdAt: createdAt,
        confirmationDeadline: confirmationDeadline
    };
}

/**
 * Update the UI with booking details
 * @param {Object} booking - The booking data
 */
function updateBookingUI(booking) {
    // Update booking ID
    const bookingIdElement = document.getElementById('booking-id');
    if (bookingIdElement) {
        bookingIdElement.textContent = booking.id;
    }
    
    // Update booking date
    const bookingDateElement = document.getElementById('booking-date');
    if (bookingDateElement) {
        bookingDateElement.textContent = formatDate(booking.date, true);
    }
    
    // Update booking time
    const bookingTimeElement = document.getElementById('booking-time');
    if (bookingTimeElement) {
        bookingTimeElement.textContent = `${booking.hour}:00 - ${booking.hour + 1}:00`;
    }
    
    // Update booking name
    const bookingNameElement = document.getElementById('booking-name');
    if (bookingNameElement) {
        bookingNameElement.textContent = booking.name;
    }
    
    // Update confirmation deadline
    const confirmationDeadlineElement = document.getElementById('confirmation-deadline');
    if (confirmationDeadlineElement) {
        confirmationDeadlineElement.textContent = formatDateTime(booking.confirmationDeadline);
    }
    
    // Update status
    updateBookingStatus(booking.status);
    
    // Hide cancellation section if booking is not pending
    if (booking.status !== 'pending') {
        const cancellationSection = document.getElementById('cancellation-section');
        if (cancellationSection) {
            cancellationSection.classList.add('hidden');
        }
    }
    
    // Hide confirmation deadline section if booking is not pending
    if (booking.status !== 'pending') {
        const confirmationDeadlineSection = document.getElementById('confirmation-deadline-section');
        if (confirmationDeadlineSection) {
            confirmationDeadlineSection.classList.add('hidden');
        }
    }
}

/**
 * Update the booking status display
 * @param {string} status - The booking status (pending, confirmed, cancelled)
 */
function updateBookingStatus(status) {
    const pendingStatus = document.getElementById('status-pending');
    const confirmedStatus = document.getElementById('status-confirmed');
    const cancelledStatus = document.getElementById('status-cancelled');
    
    if (pendingStatus && confirmedStatus && cancelledStatus) {
        // Hide all status elements
        pendingStatus.classList.add('hidden');
        confirmedStatus.classList.add('hidden');
        cancelledStatus.classList.add('hidden');
        
        // Show the appropriate status element
        if (status === 'pending') {
            pendingStatus.classList.remove('hidden');
        } else if (status === 'confirmed') {
            confirmedStatus.classList.remove('hidden');
        } else if (status === 'cancelled') {
            cancelledStatus.classList.remove('hidden');
        }
    }
}

/**
 * Cancel a booking
 * @param {string} bookingId - The ID of the booking to cancel
 */
function cancelBooking(bookingId) {
    // In a real application, this would send a request to the API
    console.log('Cancelling booking:', bookingId);
    
    // Hide the cancellation modal
    document.getElementById('cancel-modal').classList.add('hidden');
    
    // Update the status to cancelled
    updateBookingStatus('cancelled');
    
    // Hide the cancellation section
    const cancellationSection = document.getElementById('cancellation-section');
    if (cancellationSection) {
        cancellationSection.classList.add('hidden');
    }
    
    // Hide the confirmation deadline section
    const confirmationDeadlineSection = document.getElementById('confirmation-deadline-section');
    if (confirmationDeadlineSection) {
        confirmationDeadlineSection.classList.add('hidden');
    }
    
    // Show a success message
    alert('Your booking has been cancelled.');
}

/**
 * Format a date object to a readable format
 * @param {Date} date - The date to format
 * @param {boolean} dateOnly - Whether to return date only (no time)
 * @returns {string} - The formatted date
 */
function formatDate(date, dateOnly = false) {
    if (dateOnly) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }
    
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    };
    
    return date.toLocaleString('en-US', options);
}

/**
 * Format a date object to a readable date and time format
 * @param {Date} date - The date to format
 * @returns {string} - The formatted date and time
 */
function formatDateTime(date) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    };
    
    return date.toLocaleString('en-US', options);
}