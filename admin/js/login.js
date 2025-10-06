/**
 * Riad Gold - Admin Login JavaScript
 * Handles functionality for the admin login page
 */

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const rememberMe = document.getElementById('remember-me').checked;
            
            // Authenticate user
            authenticateUser(username, password, rememberMe);
        });
    }
    
    // Check if user is already logged in
    checkAuthStatus();
});

/**
 * Authenticate user with provided credentials
 * @param {string} username - The username
 * @param {string} password - The password
 * @param {boolean} rememberMe - Whether to remember the login
 */
function authenticateUser(username, password, rememberMe) {
    const errorMessage = document.getElementById('error-message');
    
    // In a real application, this would send a request to an API
    // For now, we'll use mock credentials
    if (username === 'admin' && password === 'riadgold123') {
        // Successful login
        
        // Store authentication token
        const authToken = generateAuthToken();
        const expiryTime = rememberMe ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000; // 30 days or 1 day
        const expiryDate = new Date(Date.now() + expiryTime);
        
        // Store in localStorage
        localStorage.setItem('authToken', authToken);
        localStorage.setItem('authExpiry', expiryDate.toISOString());
        localStorage.setItem('username', username);
        
        // Hide error message if visible
        if (errorMessage) {
            errorMessage.classList.add('hidden');
        }
        
        // Redirect to dashboard
        window.location.href = 'index.html';
    } else {
        // Failed login
        if (errorMessage) {
            errorMessage.classList.remove('hidden');
        }
    }
}

/**
 * Check if user is already authenticated
 */
function checkAuthStatus() {
    const authToken = localStorage.getItem('authToken');
    const authExpiry = localStorage.getItem('authExpiry');
    
    if (authToken && authExpiry) {
        const expiryDate = new Date(authExpiry);
        
        if (expiryDate > new Date()) {
            // Token is still valid, redirect to dashboard
            window.location.href = 'index.html';
        } else {
            // Token has expired, clear storage
            localStorage.removeItem('authToken');
            localStorage.removeItem('authExpiry');
            localStorage.removeItem('username');
        }
    }
}

/**
 * Generate a random authentication token
 * @returns {string} - A random token
 */
function generateAuthToken() {
    // In a real application, this would be a JWT or other secure token
    // For now, we'll just generate a random string
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
}
/**
 * Redirect to admin dashboard after successful login
 */
function redirectToDashboard() {
    window.location.href = 'index.html';
}