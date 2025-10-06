/**
 * Riad Gold - Admin Announcements Management JavaScript
 * Handles functionality for the announcements management page
 */

document.addEventListener('DOMContentLoaded', function() {
    loadAnnouncements();

    // Form submission
    const announcementForm = document.getElementById('announcement-form');
    if (announcementForm) {
        announcementForm.addEventListener('submit', function(e) {
            e.preventDefault();
            createAnnouncement();
        });
    }
});

/**
 * Load active announcements
 */
function loadAnnouncements() {
    const announcementsTable = document.getElementById('announcements-table');

    if (!announcementsTable) return;

    // Show loading
    announcementsTable.innerHTML = `
        <tr class="text-center">
            <td colspan="5" class="px-6 py-4 text-sm text-gray-500">
                <i class="fas fa-spinner fa-spin mr-2"></i> Loading announcements...
            </td>
        </tr>
    `;

    // In a real application, this would fetch from an API
    // For now, we'll use mock data
    setTimeout(() => {
        // Mock announcements data
        const announcements = [
            {
                id: 'A1001',
                title: 'Maintenance Notice',
                content: 'The field will be undergoing maintenance on June 25th from 2 PM to 4 PM.',
                type: 'maintenance',
                published: new Date('2023-06-15'),
                expires: new Date('2023-06-26')
            },
            {
                id: 'A1002',
                title: 'Summer Promotion',
                content: 'Get 20% off all bookings made for July! Use code SUMMER20 at checkout.',
                type: 'promotion',
                published: new Date('2023-06-10'),
                expires: new Date('2023-06-30')
            },
            {
                id: 'A1003',
                title: 'New Booking System',
                content: 'We have launched a new booking system. Please report any issues to our support team.',
                type: 'info',
                published: new Date('2023-06-01'),
                expires: new Date('2023-07-01')
            }
        ];

        // Update table
        updateAnnouncementsTable(announcements);
    }, 1000);
}

/**
 * Update the announcements table with data
 * @param {Array} announcements - Array of announcement objects
 */
function updateAnnouncementsTable(announcements) {
    const announcementsTable = document.getElementById('announcements-table');

    if (!announcementsTable) return;

    // Clear table
    announcementsTable.innerHTML = '';

    if (announcements.length === 0) {
        announcementsTable.innerHTML = `
            <tr class="text-center">
                <td colspan="5" class="px-6 py-4 text-sm text-gray-500">
                    No active announcements.
                </td>
            </tr>
        `;
        return;
    }

    // Add announcements to table
    announcements.forEach(announcement => {
        const row = document.createElement('tr');

        let typeBadge;
        switch (announcement.type) {
            case 'info':
                typeBadge = '<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">Info</span>';
                break;
            case 'warning':
                typeBadge = '<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Warning</span>';
                break;
            case 'maintenance':
                typeBadge = '<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-orange-800">Maintenance</span>';
                break;
            case 'promotion':
                typeBadge = '<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Promotion</span>';
                break;
        }

        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${announcement.title}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${typeBadge}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${formatDate(announcement.published, true)}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${formatDate(announcement.expires, true)}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button class="text-blue-600 hover:text-blue-900 mr-3 view-announcement" data-id="${announcement.id}">View</button>
                <button class="text-red-600 hover:text-red-900 delete-announcement" data-id="${announcement.id}">Delete</button>
            </td>
        `;

        announcementsTable.appendChild(row);
    });

    // Add event listeners to action buttons
    document.querySelectorAll('.view-announcement').forEach(button => {
        button.addEventListener('click', function() {
            const announcementId = this.dataset.id;
            viewAnnouncement(announcementId);
        });
    });

    document.querySelectorAll('.delete-announcement').forEach(button => {
        button.addEventListener('click', function() {
            const announcementId = this.dataset.id;
            deleteAnnouncement(announcementId);
        });
    });
}

/**
 * Create a new announcement
 */
function createAnnouncement() {
    const titleInput = document.getElementById('announcement-title');
    const contentInput = document.getElementById('announcement-content');
    const typeInput = document.getElementById('announcement-type');
    const expiryInput = document.getElementById('announcement-expiry');

    const title = titleInput.value.trim();
    const content = contentInput.value.trim();
    const type = typeInput.value;
    const expiry = expiryInput.value;

    // Validate inputs
    if (!title || !content) {
        alert('Please fill in both title and content fields.');
        return;
    }

    // In a real application, this would send a request to the API
    console.log('Creating announcement:', { title, content, type, expiry });

    // Show success message
    alert('Announcement has been published successfully!');

    // Reset form
    titleInput.value = '';
    contentInput.value = '';
    typeInput.value = 'info';
    expiryInput.value = '';

    // Reload announcements
    loadAnnouncements();
}

/**
 * View announcement details
 * @param {string} announcementId - The ID of the announcement to view
 */
function viewAnnouncement(announcementId) {
    // In a real application, this would fetch the announcement details from the API
    console.log('Viewing announcement:', announcementId);

    // For now, just show an alert with the announcement ID
    alert(`Viewing details for announcement: ${announcementId}\n\nIn a full implementation, this would open a modal with the full announcement content.`);
}

/**
 * Delete an announcement
 * @param {string} announcementId - The ID of the announcement to delete
 */
function deleteAnnouncement(announcementId) {
    // Confirm deletion
    if (!confirm('Are you sure you want to delete this announcement?')) {
        return;
    }

    // In a real application, this would send a request to the API
    console.log('Deleting announcement:', announcementId);

    // Show success message
    alert(`Announcement ${announcementId} has been deleted.`);

    // Reload announcements
    loadAnnouncements();
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