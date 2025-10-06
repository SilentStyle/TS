/**
 * Riad Gold - Admin Authentication JavaScript
 * Handles authentication for admin pages
 */

document.addEventListener('DOMContentLoaded', function() {
    checkAuthStatus();

    // Logout functionality
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            logoutUser();
        });
    }

    // Mobile menu toggle for admin pages
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
});

/**
 * Check if user is authenticated
 */
function checkAuthStatus() {
    const authToken = localStorage.getItem('authToken');
    const authExpiry = localStorage.getItem('authExpiry');
    const username = localStorage.getItem('username');

    // Update username display
    const usernameDisplay = document.getElementById('username-display');
    if (usernameDisplay && username) {
        usernameDisplay.textContent = username;
    }

    if (!authToken || !authExpiry) {
        // No token or expiry, redirect to login
        redirectToLogin();
        return;
    }

    const expiryDate = new Date(authExpiry);

    if (expiryDate <= new Date()) {
        // Token has expired, clear storage and redirect
        logoutUser();
        redirectToLogin();
    }
}

/**
 * Logout user and clear storage
 */
function logoutUser() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authExpiry');
    localStorage.removeItem('username');
    redirectToLogin();
}

/**
 * Redirect to login page
 */
function redirectToLogin() {
    // Only redirect if we're not already on the login page
    if (!window.location.pathname.includes('login.html')) {
        window.location.href = 'login.html';
    }
}