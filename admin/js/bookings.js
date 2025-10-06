/**
 * Riad Gold - Admin Bookings Management JavaScript
 * Handles functionality for the bookings management page
 */

document.addEventListener('DOMContentLoaded', function() {
    loadBookings();

    // Filter functionality
    const applyFiltersBtn = document.getElementById('apply-filters');
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', function() {
            loadBookings();
        });
    }
});

/**
 * Load bookings based on filters
 */
function loadBookings() {
    const bookingsTable = document.getElementById('bookings-table');

    if (!bookingsTable) return;

    // Get filter values
    const statusFilter = document.getElementById('status-filter').value;
    const dateFrom = document.getElementById('date-from').value;
    const dateTo = document.getElementById('date-to').value;

    // Show loading
    bookingsTable.innerHTML = `
        <tr class="text-center">
            <td colspan="6" class="px-6 py-4 text-sm text-gray-500">
                <i class="fas fa-spinner fa-spin mr-2"></i> Loading bookings...
            </td>
        </tr>
    `;

    // In a real application, this would fetch from an API with filter parameters
    // For now, we'll use mock data
    setTimeout(() => {
        // Generate mock bookings data
        const bookings = generateMockBookings();

        // Filter bookings
        let filteredBookings = bookings;

        if (statusFilter !== 'all') {
            filteredBookings = filteredBookings.filter(booking => booking.status === statusFilter);
        }

        if (dateFrom) {
            const fromDate = new Date(dateFrom);
            filteredBookings = filteredBookings.filter(booking => {
                const bookingDate = new Date(booking.date);
                return bookingDate >= fromDate;
            });
        }

        if (dateTo) {
            const toDate = new Date(dateTo);
            toDate.setHours(23, 59, 59, 999); // End of the day
            filteredBookings = filteredBookings.filter(booking => {
                const bookingDate = new Date(booking.date);
                return bookingDate <= toDate;
            });
        }

        // Update table
        updateBookingsTable(filteredBookings);
    }, 1000);
}

/**
 * Generate mock bookings data
 * @returns {Array} - Array of booking objects
 */
function generateMockBookings() {
    const bookings = [];
    const statuses = ['pending', 'confirmed', 'cancelled'];
    const names = ['John Smith', 'Maria Garcia', 'Ahmed Khan', 'Sarah Johnson', 'Michael Brown', 'Lisa Wilson', 'David Miller', 'Emma Davis'];

    for (let i = 0; i < 50; i++) {
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const name = names[Math.floor(Math.random() * names.length)];

        // Generate a random date within the next 30 days
        const today = new Date();
        const bookingDate = new Date(today);
        bookingDate.setDate(today.getDate() + Math.floor(Math.random() * 30));

        // Generate a random hour between 8 and 22
        const hour = Math.floor(Math.random() * 15) + 8;

        bookings.push({
            id: `B${1000 + i}`,
            name: name,
            phone: `+1 ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 9000) + 1000}`,
            email: `${name.toLowerCase().replace(' ', '.')}@example.com`,
            date: bookingDate.toISOString().split('T')[0],
            hour: hour,
            status: status,
            createdAt: new Date(today.getTime() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)) // Random time in the past week
        });
    }

    return bookings;
}

/**
 * Update the bookings table with data
 * @param {Array} bookings - Array of booking objects
 */
function updateBookingsTable(bookings) {
    const bookingsTable = document.getElementById('bookings-table');

    if (!bookingsTable) return;

    // Clear table
    bookingsTable.innerHTML = '';

    if (bookings.length === 0) {
        bookingsTable.innerHTML = `
            <tr class="text-center">
                <td colspan="6" class="px-6 py-4 text-sm text-gray-500">
                    No bookings found matching the selected filters.
                </td>
            </tr>
        `;
        return;
    }

    // Add bookings to table
    bookings.forEach(booking => {
        const row = document.createElement('tr');

        let statusBadge;
        switch (booking.status) {
            case 'pending':
                statusBadge = '<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span>';
                break;
            case 'confirmed':
                statusBadge = '<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Confirmed</span>';
                break;
            case 'cancelled':
                statusBadge = '<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Cancelled</span>';
                break;
        }

        let actions = '';
        if (booking.status === 'pending') {
            actions = `
                <button class="text-green-600 hover:text-green-900 mr-3 confirm-booking" data-id="${booking.id}">Confirm</button>
                <button class="text-red-600 hover:text-red-900 cancel-booking" data-id="${booking.id}">Cancel</button>
            `;
        } else if (booking.status === 'confirmed') {
            actions = `
                <button class="text-red-600 hover:text-red-900 cancel-booking" data-id="${booking.id}">Cancel</button>
            `;
        } else {
            actions = '<span class="text-gray-500">No actions</span>';
        }

        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${booking.id}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${booking.name}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div>${booking.phone}</div>
                <div class="text-gray-400">${booking.email}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${formatDate(new Date(booking.date), true)}<br>
                ${booking.hour}:00 - ${booking.hour + 1}:00
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${statusBadge}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                ${actions}
                <button class="text-blue-600 hover:text-blue-900 ml-3 view-booking" data-id="${booking.id}">View</button>
            </td>
        `;

        bookingsTable.appendChild(row);
    });

    // Add event listeners to action buttons
    document.querySelectorAll('.confirm-booking').forEach(button => {
        button.addEventListener('click', function() {
            const bookingId = this.dataset.id;
            confirmBooking(bookingId);
        });
    });

    document.querySelectorAll('.cancel-booking').forEach(button => {
        button.addEventListener('click', function() {
            const bookingId = this.dataset.id;
            cancelBooking(bookingId);
        });
    });

    document.querySelectorAll('.view-booking').forEach(button => {
        button.addEventListener('click', function() {
            const bookingId = this.dataset.id;
            viewBooking(bookingId);
        });
    });
}

/**
 * Confirm a booking
 * @param {string} bookingId - The ID of the booking to confirm
 */
function confirmBooking(bookingId) {
    // In a real application, this would send a request to the API
    console.log('Confirming booking:', bookingId);

    // Show success message
    alert(`Booking ${bookingId} has been confirmed.`);

    // Reload bookings
    loadBookings();
}

/**
 * Cancel a booking
 * @param {string} bookingId - The ID of the booking to cancel
 */
function cancelBooking(bookingId) {
    // In a real application, this would send a request to the API
    console.log('Cancelling booking:', bookingId);

    // Show success message
    alert(`Booking ${bookingId} has been cancelled.`);

    // Reload bookings
    loadBookings();
}

/**
 * View booking details
 * @param {string} bookingId - The ID of the booking to view
 */
function viewBooking(bookingId) {
    // In a real application, this would open a modal or redirect to a details page
    console.log('Viewing booking:', bookingId);

    // For now, just show an alert with the booking ID
    alert(`Viewing details for booking: ${bookingId}\n\nIn a full implementation, this would open a detailed view with all booking information.`);
}

/**
 * Format a date object to a readable format
 * @param {Date} date - The date to format
 * @param {boolean} dateOnly - Whether to return date only (no time)
 * @returns {string} - The formatted date
 */
function formatDate(date, dateOnly = false) {
    if (dateOnly) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    };

    return date.toLocaleString('en-US', options);
}