// DOM Elements
const editPersonalBtn = document.getElementById('editPersonalBtn');
const savePersonalBtn = document.getElementById('savePersonalBtn');
const cancelPersonalBtn = document.getElementById('cancelPersonalBtn');
const personalActionButtons = document.getElementById('personalActionButtons');

// Sensitive info reveal buttons
const revealAccountBtn = document.getElementById('revealAccountBtn');
const revealPanBtn = document.getElementById('revealPanBtn');
const revealAadhaarBtn = document.getElementById('revealAadhaarBtn');

// Modal elements
const securityModal = document.getElementById('securityModal');
const securityPassword = document.getElementById('securityPassword');
const confirmReveal = document.getElementById('confirmReveal');
const cancelReveal = document.getElementById('cancelReveal');

// Store original values for cancel functionality
let originalValues = {};

// Edit Personal Information
editPersonalBtn.addEventListener('click', () => {
    const fields = ['userName', 'userEmail', 'userPhone', 'userDOB', 'userAddress'];
    
    fields.forEach(field => {
        const valueElement = document.getElementById(field);
        const inputElement = document.getElementById(field + 'Input');
        
        // Store original value
        originalValues[field] = valueElement.textContent;
        
        // Show input, hide value
        valueElement.style.display = 'none';
        inputElement.style.display = 'block';
        
        // Set input value
        if (field === 'userDOB') {
            // Convert date format for input
            const date = new Date(valueElement.textContent);
            inputElement.value = date.toISOString().split('T')[0];
        } else {
            inputElement.value = valueElement.textContent;
        }
    });
    
    // Show action buttons
    personalActionButtons.style.display = 'flex';
    editPersonalBtn.style.display = 'none';
});

// Save Personal Information
savePersonalBtn.addEventListener('click', () => {
    const fields = ['userName', 'userEmail', 'userPhone', 'userDOB', 'userAddress'];
    
    fields.forEach(field => {
        const valueElement = document.getElementById(field);
        const inputElement = document.getElementById(field + 'Input');
        
        // Update value with input content
        if (field === 'userDOB') {
            // Format date for display
            const date = new Date(inputElement.value);
            valueElement.textContent = date.toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
        } else {
            valueElement.textContent = inputElement.value;
        }
        
        // Hide input, show value
        valueElement.style.display = 'block';
        inputElement.style.display = 'none';
    });
    
    // Hide action buttons
    personalActionButtons.style.display = 'none';
    editPersonalBtn.style.display = 'block';
    
    // Show success message
    showNotification('Personal information updated successfully!', 'success');
});

// Cancel Edit
cancelPersonalBtn.addEventListener('click', () => {
    const fields = ['userName', 'userEmail', 'userPhone', 'userDOB', 'userAddress'];
    
    fields.forEach(field => {
        const valueElement = document.getElementById(field);
        const inputElement = document.getElementById(field + 'Input');
        
        // Restore original value
        valueElement.textContent = originalValues[field];
        
        // Hide input, show value
        valueElement.style.display = 'block';
        inputElement.style.display = 'none';
    });
    
    // Hide action buttons
    personalActionButtons.style.display = 'none';
    editPersonalBtn.style.display = 'block';
});

// Sensitive Information Reveal
let currentRevealAction = null;

function setupRevealButton(button, targetId, realValue) {
    button.addEventListener('click', () => {
        currentRevealAction = { targetId, realValue };
        securityModal.style.display = 'flex';
        securityPassword.value = '';
        securityPassword.focus();
    });
}

// Setup reveal buttons with actual values
setupRevealButton(revealAccountBtn, 'accountNumber', '1234 5678 9012 4582');
setupRevealButton(revealPanBtn, 'panNumber', 'ABCDE1234F');
setupRevealButton(revealAadhaarBtn, 'aadhaarNumber', '1234 5678 9012');

// Modal Actions
confirmReveal.addEventListener('click', () => {
    // In a real app, you would verify the password with the backend
    if (securityPassword.value.trim() !== '') {
        if (currentRevealAction) {
            const targetElement = document.getElementById(currentRevealAction.targetId);
            targetElement.textContent = currentRevealAction.realValue;
            targetElement.style.color = '#000';
            targetElement.style.webkitTextFillColor = '#000';
            
            // Change button text
            const revealBtn = event.target.closest('.reveal-btn');
            if (revealBtn) {
                revealBtn.textContent = 'Hide';
                revealBtn.onclick = () => {
                    targetElement.textContent = '•••• •••• ' + currentRevealAction.realValue.slice(-4);
                    revealBtn.textContent = 'Reveal';
                    revealBtn.onclick = () => setupRevealButton(revealBtn, currentRevealAction.targetId, currentRevealAction.realValue);
                };
            }
        }
        securityModal.style.display = 'none';
    } else {
        alert('Please enter your password');
    }
});

cancelReveal.addEventListener('click', () => {
    securityModal.style.display = 'none';
    currentRevealAction = null;
});

// Close modal when clicking outside
securityModal.addEventListener('click', (e) => {
    if (e.target === securityModal) {
        securityModal.style.display = 'none';
        currentRevealAction = null;
    }
});

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        color: white;
        font-weight: 500;
        z-index: 1001;
        animation: slideIn 0.3s ease;
    `;
    
    if (type === 'success') {
        notification.style.background = '#28a745';
    } else if (type === 'error') {
        notification.style.background = '#dc3545';
    } else {
        notification.style.background = '#4b86b4';
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Logout functionality
document.querySelector('.logout-btn').addEventListener('click', () => {
    if (confirm('Are you sure you want to logout?')) {
        showNotification('Logged out successfully', 'success');
        // In real app, redirect to login page
        // window.location.href = '/login';
    }
});

// Change profile photo (simulated)
document.querySelector('.change-photo-btn').addEventListener('click', () => {
    // In a real app, this would open a file picker
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                document.getElementById('profileImage').src = e.target.result;
                showNotification('Profile photo updated successfully!', 'success');
            };
            reader.readAsDataURL(file);
        }
    };
    input.click();
});

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    console.log('Banking App Profile Page Loaded');
    
    // Simulate loading user data
    setTimeout(() => {
        showNotification('Welcome back, John!', 'success');
    }, 1000);
});