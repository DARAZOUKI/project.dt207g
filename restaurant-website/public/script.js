
//script.js
document.addEventListener('DOMContentLoaded', () => {
    fetchMenuItems();

     // Reservation form submission
     const reservationForm = document.getElementById('reservation-form');
     reservationForm.addEventListener('submit', (e) => {
         e.preventDefault();
         const name = document.getElementById('res-name').value;
         const phone = document.getElementById('res-phone').value;
         const date = document.getElementById('res-date').value;
         const time = document.getElementById('res-time').value; // Added this line
         const guests = document.getElementById('res-guests').value;
 
         // Simulate a successful submission
         displaySuccessMessage(name);
         clearFormFields();
     });
 
     // Function to display success message
     function displaySuccessMessage(name) {
        const successMessage = document.createElement('div');
        successMessage.classList.add('success-message');
        successMessage.innerHTML = `
            <div class="success-content">
                <h3>Reservation Successful</h3>
                <p>Dear ${name},</p>
                <p>Your reservation at Jafra has been successfully made. You will receive the details about your booking via SMS.</p>
                <p>If you need to cancel or modify your booking, please contact us via the telephone number provided below.</p>
                <p>Thank you for choosing Jafra!</p>
                <div class="contact-info">
                    <p><strong>Contact Us:</strong></p>
                    <ul>
                        <li><strong>Phone:</strong> 078952312</li>
                    </ul>
                </div>
            </div>
        `;
        document.body.appendChild(successMessage);
    
        // Automatically remove the success message after 5 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    }
 
     // Function to clear form fields
     function clearFormFields() {
         document.getElementById('res-name').value = '';
         document.getElementById('res-phone').value = '';
         document.getElementById('res-date').value = '';
         document.getElementById('res-time').value = ''; // Added this line
         document.getElementById('res-guests').value = '';
     }
 });

function redirectToLogin() {
    window.location.href = 'login.html';
}

async function fetchMenuItems() {
    const response = await fetch('http://localhost:10000/api/menu');
    const items = await response.json();
    const menuItemsContainer = document.getElementById('menu-items');
    menuItemsContainer.innerHTML = '';
    items.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.classList.add('menu-item');

        menuItem.innerHTML = `
            <div class="item-details">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
            </div>
            <div class="item-price">
                <p>Price: $${item.price}</p>
            </div>
            <div class="item-image">
                <img src="${item.image}" alt="${item.name}" width="100">
            </div>
        `;
        menuItemsContainer.appendChild(menuItem);
    });
}
