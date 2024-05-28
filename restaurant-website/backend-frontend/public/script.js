document.addEventListener('DOMContentLoaded', () => {
    fetchMenuItems();

    const reservationForm = document.getElementById('reservation-form');
    reservationForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const name = document.getElementById('res-name').value;
        const phone = document.getElementById('res-phone').value;
        const date = document.getElementById('res-date').value;
        const guests = document.getElementById('res-guests').value;

        const response = await fetch('http://localhost:8000/api/reservations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, phone, date, guests }),
        });

        if (response.ok) {
            alert('Reservation made successfully');
            reservationForm.reset();
        } else {
            alert('Failed to make reservation');
        }
    });
});
function redirectToLogin() {
    window.location.href = '/login.html';
}

async function fetchMenuItems() {
    const response = await fetch('http://localhost:8000/api/menu');
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
