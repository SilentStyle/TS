/**
 * Riad Gold - Admin Dashboard JavaScript
 * Handles functionality for the admin dashboard
 */

document.addEventListener('DOMContentLoaded', function() {
    loadDashboardData();
    setupAnalyticsButtons();
});

/**
 * Load dashboard data
 */
function loadDashboardData() {
    // In a real application, this would fetch from an API
    // For now, we'll use mock data

    // Simulate API call with setTimeout
    setTimeout(() => {
        // Mock data
        const dashboardData = {
            totalBookings: 124,
            pendingBookings: 8,
            confirmedBookings: 98,
            cancelledBookings: 18
        };

        // Update stats
        document.getElementById('total-bookings').textContent = dashboardData.totalBookings;
        document.getElementById('pending-bookings').textContent = dashboardData.pendingBookings;
        document.getElementById('confirmed-bookings').textContent = dashboardData.confirmedBookings;
        document.getElementById('cancelled-bookings').textContent = dashboardData.cancelledBookings;

        // Load pending bookings
        loadPendingBookings();

        // Load notifications
        loadNotifications();

        // Initialize charts
        initializeCharts();
    }, 1000);
}

/**
 * Setup analytics range buttons
 */
function setupAnalyticsButtons() {
    const rangeButtons = document.querySelectorAll('.analytics-range-btn');

    rangeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            rangeButtons.forEach(btn => {
                btn.classList.remove('active', 'bg-riad-gold', 'text-white');
                btn.classList.add('bg-white', 'border', 'border-gray-300');
            });

            // Add active class to clicked button
            this.classList.remove('bg-white', 'border', 'border-gray-300');
            this.classList.add('active', 'bg-riad-gold', 'text-white');

            // Update charts with new range
            const range = this.dataset.range;
            updateCharts(range);
        });
    });
}

/**
 * Initialize charts
 */
function initializeCharts() {
    // Most Booked Hours Chart
    const hoursCtx = document.getElementById('hours-chart').getContext('2d');
    const hoursChart = new Chart(hoursCtx, {
        type: 'bar',
        data: {
            labels: ['8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM'],
            datasets: [{
                label: 'Bookings',
                data: [5, 8, 12, 15, 20, 18, 22, 25, 30, 35, 40, 38, 32, 25, 15],
                backgroundColor: '#B8860B',
                borderColor: '#A67C00',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Bookings'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Time of Day'
                    }
                }
            }
        }
    });

    // Most Booked Days Chart
    const daysCtx = document.getElementById('days-chart').getContext('2d');
    const daysChart = new Chart(daysCtx, {
        type: 'line',
        data: {
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            datasets: [{
                label: 'Bookings',
                data: [25, 30, 35, 32, 45, 65, 55],
                backgroundColor: 'rgba(184, 134, 11, 0.2)',
                borderColor: '#B8860B',
                borderWidth: 2,
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Bookings'
                    }
                }
            }
        }
    });

    // Store charts for later updates
    window.hoursChart = hoursChart;
    window.daysChart = daysChart;
}

/**
 * Update charts with new data range
 * @param {string} range - The time range (week, month)
 */
function updateCharts(range) {
    // In a real application, this would fetch new data from the API
    // For now, we'll just update with mock data based on range

    let hoursData, daysData;

    if (range === 'week') {
        hoursData = [5, 8, 12, 15, 20, 18, 22, 25, 30, 35, 40, 38, 32, 25, 15];
        daysData = [25, 30, 35, 32, 45, 65, 55];
    } else if (range === 'month') {
        hoursData = [8, 12, 18, 22, 28, 25, 30, 35, 42, 48, 52, 50, 45, 38, 25];
        daysData = [120, 135, 142, 138, 155, 210, 185];
    }

    // Update hours chart
    if (window.hoursChart) {
        window.hoursChart.data.datasets[0].data = hoursData;
        window.hoursChart.update();
    }

    // Update days chart
    if (window.daysChart) {
        window.daysChart.data.datasets[0].data = daysData;
        window.daysChart.update();
    }
}

/**
 * Load pending bookings
 */
function loadPendingBookings() {
    const pendingBookingsTable = document.getElementById('pending-bookings-table');

    if (!pendingBookingsTable) return;

    // Mock pending bookings data
    const pendingBookings = [
        { id: 'B1001', customer: 'John Smith', dateTime: '2023-06-20 17:00', deadline: '2023-06-19 17:00' },
        { id: 'B1002', customer: 'Maria Garcia', dateTime: '2023-06-21 18:00', deadline: '2023-06-20 18:00' },
        { id: 'B1003', customer: 'Ahmed Khan', dateTime: '2023-06-22 19:00', deadline: '2023-06-21 19:00' },
        { id: 'B1004', customer: 'Sarah Johnson', dateTime: '2023-06-23 20:00', deadline: '2023-06-22 20:00' }
    ];

    // Clear loading message
    pendingBookingsTable.innerHTML = '';

    // Add bookings to table
    pendingBookings.forEach(booking => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${booking.id}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${booking.customer}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${formatDateTime(booking.dateTime)}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${formatDateTime(booking.deadline)}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button class="text-green-600 hover:text-green-900 mr-3 confirm-booking" data-id="${booking.id}">Confirm</button>
                <button class="text-red-600 hover:text-red-900 cancel-booking" data-id="${booking.id}">Cancel</button>
            </td>
        `;

        pendingBookingsTable.appendChild(row);
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
}

/**
 * Load notifications
 */
function loadNotifications() {
    const notificationsList = document.getElementById('notifications-list');

    if (!notificationsList) return;

    // Mock notifications data
    const notifications = [
        { type: 'booking', message: 'New booking request from John Smith', time: '2 hours ago' },
        { type: 'cancellation', message: 'Booking B0998 has been cancelled', time: '5 hours ago' },
        { type: 'system', message: 'System maintenance scheduled for tonight', time: '1 day ago' },
        { type: 'booking', message: 'New booking request from Lisa Brown', time: '1 day ago' }
    ];

    // Clear loading message
    notificationsList.innerHTML = '';

    // Add notifications to list
    notifications.forEach(notification => {
        const listItem = document.createElement('li');
        listItem.className = 'py-4';

        let iconClass, textColor;
        switch (notification.type) {
            case 'booking':
                iconClass = 'fa-calendar-plus text-blue-500';
                textColor = 'text-blue-600';
                break;
            case 'cancellation':
                iconClass = 'fa-calendar-minus text-red-500';
                textColor = 'text-red-600';
                break;
            case 'system':
                iconClass = 'fa-cog text-gray-500';
                textColor = 'text-gray-600';
                break;
            default:
                iconClass = 'fa-bell text-yellow-500';
                textColor = 'text-yellow-600';
        }

        listItem.innerHTML = `
            <div class="flex items-start">
                <div class="flex-shrink-0">
                    <i class="fas ${iconClass} text-lg"></i>
                </div>
                <div class="ml-3">
                    <p class="text-sm font-medium ${textColor}">${notification.message}</p>
                    <p class="text-sm text-gray-500">${notification.time}</p>
                </div>
            </div>
        `;

        notificationsList.appendChild(listItem);
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

    // Reload pending bookings
    loadPendingBookings();

    // Update dashboard stats
    const pendingElement = document.getElementById('pending-bookings');
    const confirmedElement = document.getElementById('confirmed-bookings');

    if (pendingElement && confirmedElement) {
        const pendingCount = parseInt(pendingElement.textContent) - 1;
        const confirmedCount = parseInt(confirmedElement.textContent) + 1;

        pendingElement.textContent = pendingCount;
        confirmedElement.textContent = confirmedCount;
    }
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

    // Reload pending bookings
    loadPendingBookings();

    // Update dashboard stats
    const pendingElement = document.getElementById('pending-bookings');
    const cancelledElement = document.getElementById('cancelled-bookings');

    if (pendingElement && cancelledElement) {
        const pendingCount = parseInt(pendingElement.textContent) - 1;
        const cancelledCount = parseInt(cancelledElement.textContent) + 1;

        pendingElement.textContent = pendingCount;
        cancelledElement.textContent = cancelledCount;
    }
}

/**
 * Format date and time for display
 * @param {string} dateTimeString - The date/time string to format
 * @returns {string} - Formatted date and time
 */
function formatDateTime(dateTimeString) {
    const dateTime = new Date(dateTimeString);
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    };

    return dateTime.toLocaleString('en-US', options);
}