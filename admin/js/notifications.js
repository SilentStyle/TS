/**
 * Riad Gold - Admin Notifications JavaScript
 * Handles functionality for the notifications management page
 */

document.addEventListener('DOMContentLoaded', function() {
    loadNotifications();
});

/**
 * Load notifications
 */
function loadNotifications() {
    const notificationsTable = document.getElementById('notifications-table');

    if (!notificationsTable) return;

    // Mock notifications data
    const notifications = [
        {
            id: 'N1001',
            type: 'booking_confirmation',
            recipient: 'john@example.com',
            message: 'Your booking B1001 has been confirmed',
            status: 'sent',
            sent: new Date('2023-06-15T10:30:00')
        },
        {
            id: 'N1002',
            type: 'booking_reminder',
            recipient: '+1234567890',
            message: 'Reminder: Your booking is tomorrow at 5 PM',
            status: 'sent',
            sent: new Date('2023-06-14T18:00:00')
        },
        {
            id: 'N1003',
            type: 'cancellation_notice',
            recipient: 'sarah@example.com',
            message: 'Your booking has been cancelled',
            status: 'failed',
            sent: new Date('2023-06-13T14:20:00')
        },
        {
            id: 'N1004',
            type: 'availability_alert',
            recipient: 'mike@example.com',
            message: 'A slot you wanted is now available',
            status: 'sent',
            sent: new Date('2023-06-12T09:15:00')
        }
    ];

    // Update table
    updateNotificationsTable(notifications);
}

/**
 * Update the notifications table with data
 * @param {Array} notifications - Array of notification objects
 */
function updateNotificationsTable(notifications) {
    const notificationsTable = document.getElementById('notifications-table');

    if (!notificationsTable) return;

    // Clear table
    notificationsTable.innerHTML = '';

    // Add notifications to table
    notifications.forEach(notification => {
        const row = document.createElement('tr');

        let typeBadge, statusBadge;

        // Set type badge
        switch (notification.type) {
            case 'booking_confirmation':
                typeBadge = '<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Confirmation</span>';
                break;
            case 'booking_reminder':
                typeBadge = '<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">Reminder</span>';
                break;
            case 'cancellation_notice':
                typeBadge = '<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Cancellation</span>';
                break;
            case 'availability_alert':
                typeBadge = '<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Alert</span>';
                break;
            default:
                typeBadge = '<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">Other</span>';
        }

        // Set status badge
        switch (notification.status) {
            case 'sent':
                statusBadge = '<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Sent</span>';
                break;
            case 'failed':
                statusBadge = '<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Failed</span>';
                break;
            case 'pending':
                statusBadge = '<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span>';
                break;
            default:
                statusBadge = '<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">Unknown</span>';
        }

        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${typeBadge}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${notification.recipient}</td>
            <td class="px-6 py-4 text-sm text-gray-500">${notification.message}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${statusBadge}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${formatDateTime(notification.sent)}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button class="text-blue-600 hover:text-blue-900 mr-3 view-notification" data-id="${notification.id}">View</button>
                <button class="text-red-600 hover:text-red-900 resend-notification" data-id="${notification.id}">Resend</button>
            </td>
        `;

        notificationsTable.appendChild(row);
    });

    // Add event listeners to action buttons
    document.querySelectorAll('.view-notification').forEach(button => {
        button.addEventListener('click', function() {
            const notificationId = this.dataset.id;
            viewNotification(notificationId);
        });
    });

    document.querySelectorAll('.resend-notification').forEach(button => {
        button.addEventListener('click', function() {
            const notificationId = this.dataset.id;
            resendNotification(notificationId);
        });
    });
}

/**
 * View notification details
 * @param {string} notificationId - The ID of the notification to view
 */
function viewNotification(notificationId) {
    // In a real application, this would fetch notification details
    console.log('Viewing notification:', notificationId);
    alert(`Viewing details for notification: ${notificationId}`);
}

/**
 * Resend a notification
 * @param {string} notificationId - The ID of the notification to resend
 */
function resendNotification(notificationId) {
    // In a real application, this would resend the notification
    console.log('Resending notification:', notificationId);
    alert(`Notification ${notificationId} has been resent.`);
}

/**
 * Format date and time for display
 * @param {Date} date - The date to format
 * @returns {string} - Formatted date and time
 */
function formatDateTime(date) {
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    };

    return date.toLocaleString('en-US', options);
}