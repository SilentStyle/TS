/**
 * Riad Gold - Booking JavaScript
 * Handles functionality for the booking page
 */

// Global variables
let selectedSlots = [];
let availableSlots = {};

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Initialize date picker with today's date
    const bookingDateInput = document.getElementById('booking-date');
    if (bookingDateInput) {
        const today = new Date();
        const formattedDate = formatDate(today);
        bookingDateInput.value = formattedDate;
        bookingDateInput.min = formattedDate; // Prevent selecting past dates

        // Check if date was passed in URL
        const urlParams = new URLSearchParams(window.location.search);
        const dateParam = urlParams.get('date');
        if (dateParam) {
            bookingDateInput.value = dateParam;
        }

        // Load slots for the selected date
        loadTimeSlots(bookingDateInput.value);

        // Add event listener for date change
        bookingDateInput.addEventListener('change', function() {
            loadTimeSlots(this.value);
            // Clear selected slots when date changes
            selectedSlots = [];
            updateSelectedSlotsUI();
        });
    }

    // Button event listeners
    const clearSelectionBtn = document.getElementById('clear-selection');
    if (clearSelectionBtn) {
        clearSelectionBtn.addEventListener('click', function() {
            selectedSlots = [];
            updateSelectedSlotsUI();
            updateTimeSlotSelections();
        });
    }

    const proceedToDetailsBtn = document.getElementById('proceed-to-details');
    if (proceedToDetailsBtn) {
        proceedToDetailsBtn.addEventListener('click', function() {
            if (selectedSlots.length === 0) {
                alert('Please select at least one time slot before proceeding.');
                return;
            }
            document.getElementById('selected-slots-summary').classList.add('hidden');
            document.getElementById('booking-details-form').classList.remove('hidden');

            // Update booking process steps
            updateBookingSteps(2);
        });
    }

    const backToSlotsBtn = document.getElementById('back-to-slots');
    if (backToSlotsBtn) {
        backToSlotsBtn.addEventListener('click', function() {
            document.getElementById('booking-details-form').classList.add('hidden');
            document.getElementById('selected-slots-summary').classList.remove('hidden');

            // Update booking process steps
            updateBookingSteps(1);
        });
    }

    // Booking form submission
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value,
                notes: document.getElementById('notes').value,
                date: document.getElementById('booking-date').value,
                slots: selectedSlots
            };

            // Validate form
            if (!formData.name || !formData.phone || !formData.email) {
                alert('Please fill in all required fields.');
                return;
            }

            // Submit booking
            submitBooking(formData);
        });
    }

    // Notify modal
    const closeNotifyModalBtn = document.getElementById('close-notify-modal');
    if (closeNotifyModalBtn) {
        closeNotifyModalBtn.addEventListener('click', function() {
            document.getElementById('notify-modal').classList.add('hidden');
        });
    }

    // Notify form submission
    const notifyForm = document.getElementById('notify-form');
    if (notifyForm) {
        notifyForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const slotId = document.getElementById('notify-slot-id').value;
            const email = document.getElementById('notify-email').value;
            const phone = document.getElementById('notify-phone').value;

            if (!email) {
                alert('Please enter your email address.');
                return;
            }

            // Submit notification request
            submitNotification(slotId, email, phone);
        });
    }
});

/**
 * Load time slots for the selected date
 * @param {string} date - The selected date in YYYY-MM-DD format
 */
function loadTimeSlots(date) {
    const timeSlotsContainer = document.getElementById('time-slots');
    const loadingElement = document.getElementById('loading-slots');

    if (!timeSlotsContainer) return;

    // Show loading
    timeSlotsContainer.innerHTML = '';
    if (loadingElement) {
        loadingElement.classList.remove('hidden');
        timeSlotsContainer.appendChild(loadingElement);
    }

    // In a real application, this would fetch from an API
    // For now, we'll simulate an API call with setTimeout
    setTimeout(() => {
        // Generate mock data for time slots
        availableSlots = generateMockTimeSlots(date);

        // Remove loading indicator
        if (loadingElement) {
            loadingElement.classList.add('hidden');
        }

        // Clear the container first
        timeSlotsContainer.innerHTML = '';

        // Create time labels container
        const timeLabelsDiv = document.createElement('div');
        timeLabelsDiv.className = 'col-span-1 space-y-2';

        // Create slots grid container
        const slotsGrid = document.createElement('div');
        slotsGrid.className = 'col-span-11 grid grid-cols-1 gap-2';

        // Add time slots (8:00 to 22:00)
        for (let hour = 8; hour < 23; hour++) {
            // Time label
            const timeLabel = document.createElement('div');
            timeLabel.className = 'h-12 flex items-center justify-end pr-2 font-medium';
            timeLabel.textContent = `${hour}:00`;
            timeLabelsDiv.appendChild(timeLabel);

            // Slot
            const slotId = `${date}-${hour}`;
            const slot = availableSlots[slotId];
            const slotDiv = document.createElement('div');
            slotDiv.className = 'h-12 rounded flex items-center justify-center text-center cursor-pointer transition-colors duration-200';
            slotDiv.dataset.slotId = slotId;

            // Set slot appearance based on status
            if (slot.status === 'available') {
                slotDiv.className += ' bg-green-100 hover:bg-green-200 text-green-800 border border-green-300';
                slotDiv.textContent = 'Available';
                slotDiv.addEventListener('click', function() {
                    toggleSlotSelection(slotId);
                });
            } else if (slot.status === 'pending') {
                slotDiv.className += ' bg-yellow-100 text-yellow-800 border border-yellow-300';
                slotDiv.innerHTML = `<span class="text-xs">Pending</span>`;
                slotDiv.addEventListener('click', function() {
                    openNotifyModal(slotId);
                });
            } else if (slot.status === 'confirmed') {
                slotDiv.className += ' bg-red-100 text-red-800 border border-red-300';
                slotDiv.innerHTML = `<span class="text-xs">Booked</span>`;
                slotDiv.addEventListener('click', function() {
                    openNotifyModal(slotId);
                });
            } else if (slot.status === 'maintenance') {
                slotDiv.className += ' bg-gray-100 text-gray-500 border border-gray-300 cursor-not-allowed';
                slotDiv.innerHTML = `<span class="text-xs">Unavailable</span>`;
            }

            slotsGrid.appendChild(slotDiv);
        }

        // Add containers to main container
        timeSlotsContainer.appendChild(timeLabelsDiv);
        timeSlotsContainer.appendChild(slotsGrid);

        // Update selected slots UI if there are any
        updateSelectedSlotsUI();
        updateTimeSlotSelections();
    }, 500); // Simulate network delay
}

/**
 * Generate mock time slots for a given date
 * @param {string} date - The date in YYYY-MM-DD format
 * @returns {Object} - Object with slot IDs as keys and slot data as values
 */
function generateMockTimeSlots(date) {
    const slots = {};
    const today = new Date();
    const selectedDate = new Date(date);

    // Reset today's time to compare dates properly
    const todayReset = new Date(today);
    todayReset.setHours(0, 0, 0, 0);
    const selectedDateReset = new Date(selectedDate);
    selectedDateReset.setHours(0, 0, 0, 0);

    // Generate a different pattern based on the day of the week
    const dayOfWeek = selectedDate.getDay();

    for (let hour = 8; hour < 23; hour++) {
        const slotId = `${date}-${hour}`;

        // Default to available
        let status = 'available';

        // Make past hours unavailable
        if (selectedDateReset.getTime() === todayReset.getTime() && hour <= today.getHours()) {
            status = 'maintenance';
        } else {
            // Make some slots booked based on patterns
            if (dayOfWeek === 0 || dayOfWeek === 6) { // Weekend
                // Weekends have more bookings
                if (hour >= 16 && hour <= 20) {
                    // Peak hours (70% booked)
                    status = Math.random() > 0.3 ? (Math.random() > 0.5 ? 'pending' : 'confirmed') : 'available';
                } else {
                    // Off-peak hours (30% booked)
                    status = Math.random() > 0.7 ? (Math.random() > 0.5 ? 'pending' : 'confirmed') : 'available';
                }
            } else { // Weekday
                if (hour >= 18 && hour <= 21) {
                    // Peak hours after work (50% booked)
                    status = Math.random() > 0.5 ? (Math.random() > 0.5 ? 'pending' : 'confirmed') : 'available';
                } else {
                    // Off-peak hours (20% booked)
                    status = Math.random() > 0.8 ? (Math.random() > 0.5 ? 'pending' : 'confirmed') : 'available';
                }
            }
        }

        slots[slotId] = {
            id: slotId,
            date: date,
            hour: hour,
            status: status
        };
    }

    return slots;
}

/**
 * Toggle selection of a time slot
 * @param {string} slotId - The ID of the slot to toggle
 */
function toggleSlotSelection(slotId) {
    const index = selectedSlots.indexOf(slotId);

    if (index === -1) {
        // Add to selected slots
        selectedSlots.push(slotId);
    } else {
        // Remove from selected slots
        selectedSlots.splice(index, 1);
    }

    // Update UI
    updateSelectedSlotsUI();
    updateTimeSlotSelections();
}

/**
 * Update the UI to reflect selected slots
 */
function updateSelectedSlotsUI() {
    const selectedSlotsContainer = document.getElementById('selected-slots-summary');
    const selectedSlotsList = document.getElementById('selected-slots-list');

    if (!selectedSlotsContainer || !selectedSlotsList) return;

    if (selectedSlots.length === 0) {
        selectedSlotsContainer.classList.add('hidden');
        return;
    }

    // Sort slots by hour
    selectedSlots.sort((a, b) => {
        const hourA = parseInt(a.split('-')[1]);
        const hourB = parseInt(b.split('-')[1]);
        return hourA - hourB;
    });

    // Clear list
    selectedSlotsList.innerHTML = '';

    // Add each slot to the list
    selectedSlots.forEach(slotId => {
        const [date, hour] = slotId.split('-');
        const slotItem = document.createElement('div');
        slotItem.className = 'flex justify-between items-center p-3 bg-gray-50 rounded mb-2 border';
        slotItem.innerHTML = `
            <div>
                <p class="font-semibold">${formatDate(new Date(date), true)}</p>
                <p class="text-sm text-gray-600">${hour}:00 - ${parseInt(hour) + 1}:00</p>
            </div>
            <button class="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors" data-slot-id="${slotId}" title="Remove time slot">
                <i class="fas fa-times"></i>
            </button>
        `;

        // Add event listener to remove button
        const removeButton = slotItem.querySelector('button');
        removeButton.addEventListener('click', function() {
            toggleSlotSelection(this.dataset.slotId);
        });

        selectedSlotsList.appendChild(slotItem);
    });

    // Show the container
    selectedSlotsContainer.classList.remove('hidden');
}

/**
 * Update the visual selection state of time slots
 */
function updateTimeSlotSelections() {
    const slotElements = document.querySelectorAll('[data-slot-id]');

    slotElements.forEach(element => {
        const slotId = element.dataset.slotId;
        const slot = availableSlots[slotId];

        if (slot && slot.status === 'available') {
            if (selectedSlots.includes(slotId)) {
                element.classList.remove('bg-green-100', 'hover:bg-green-200', 'text-green-800', 'border-green-300');
                element.classList.add('bg-blue-500', 'text-white', 'border-blue-600');
                element.innerHTML = '<span class="text-xs">Selected</span>';
            } else {
                element.classList.remove('bg-blue-500', 'text-white', 'border-blue-600');
                element.classList.add('bg-green-100', 'hover:bg-green-200', 'text-green-800', 'border-green-300');
                element.innerHTML = '<span class="text-xs">Available</span>';
            }
        }
    });
}

/**
 * Open the notify modal for a booked slot
 * @param {string} slotId - The ID of the booked slot
 */
function openNotifyModal(slotId) {
    const notifyModal = document.getElementById('notify-modal');
    const notifySlotIdInput = document.getElementById('notify-slot-id');

    if (notifyModal && notifySlotIdInput) {
        notifySlotIdInput.value = slotId;

        // Set the slot info in the modal
        const [date, hour] = slotId.split('-');
        const modalTitle = notifyModal.querySelector('h2');
        if (modalTitle) {
            modalTitle.textContent = `Get Notified: ${formatDate(new Date(date), true)} at ${hour}:00`;
        }

        notifyModal.classList.remove('hidden');
    }
}

/**
 * Submit a notification request
 * @param {string} slotId - The ID of the slot to be notified about
 * @param {string} email - The email address for notifications
 * @param {string} phone - The phone number for SMS notifications (optional)
 */
function submitNotification(slotId, email, phone) {
    // In a real application, this would send data to an API
    console.log('Notification request submitted:', { slotId, email, phone });

    // Close the modal
    document.getElementById('notify-modal').classList.add('hidden');

    // Reset form
    document.getElementById('notify-email').value = '';
    document.getElementById('notify-phone').value = '';

    // Show success message
    alert('You will be notified if this slot becomes available. We will contact you at: ' + email);
}

/**
 * Submit a booking
 * @param {Object} formData - The booking form data
 */
function submitBooking(formData) {
    // In a real application, this would send data to an API
    console.log('Booking submitted:', formData);

    // Validate slots
    if (!formData.slots || formData.slots.length === 0) {
        alert('Please select at least one time slot.');
        return;
    }

    // Generate a mock booking ID
    const bookingId = 'B' + Math.floor(1000 + Math.random() * 9000);

    // Show loading state
    const submitBtn = document.querySelector('#booking-form button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Processing...';
    submitBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
        // Redirect to booking status page
        window.location.href = `booking-status.html?id=${bookingId}`;
    }, 1500);
}

/**
 * Update the booking process steps
 * @param {number} step - The current step (1, 2, or 3)
 */
function updateBookingSteps(step) {
    const steps = document.querySelectorAll('.bg-white .flex.flex-wrap.justify-center > div');

    if (steps.length < 3) return;

    // Reset all steps
    steps.forEach((stepElement, index) => {
        const icon = stepElement.querySelector('.rounded-full');
        const text = stepElement.querySelector('h3');

        if (index + 1 <= step) {
            // Active step
            icon.classList.remove('bg-gray-300', 'text-gray-600');
            icon.classList.add('bg-riad-gold', 'text-white');
            text.classList.remove('text-gray-600');
            text.classList.add('font-semibold', 'text-riad-gold');
        } else {
            // Inactive step
            icon.classList.remove('bg-riad-gold', 'text-white');
            icon.classList.add('bg-gray-300', 'text-gray-600');
            text.classList.remove('font-semibold', 'text-riad-gold');
            text.classList.add('text-gray-600');
        }
    });
}

/**
 * Format a date object to YYYY-MM-DD string or a readable format
 * @param {Date} date - The date to format
 * @param {boolean} readable - Whether to return a human-readable format
 * @returns {string} - The formatted date
 */
function formatDate(date, readable = false) {
    if (readable) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}