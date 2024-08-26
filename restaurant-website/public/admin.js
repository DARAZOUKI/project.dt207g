document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/login.html';
    }else{
        fetchMenuItems();
    }
    
    
    document.getElementById('menuForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const name = document.getElementById('name').value;
        const description = document.getElementById('description').value;
        const price = document.getElementById('price').value;
        const image = document.getElementById('image').value;
    
        const response = await fetch('https://project-dt207g.onrender.com/api/menu', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ name, description, price, image })
        });
    
        if (response.ok) {
            alert('Menu item added successfully');
            fetchMenuItems();
        } else {
            alert('Failed to add menu item');
        }
    });
});

async function fetchMenuItems() {
    const response = await fetch('https://project-dt207g.onrender.com/api/menu');
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
            <button onclick="editMenuItem('${item._id}', '${item.name}', '${item.description}', '${item.price}', '${item.image}')">Edit</button>
            <button onclick="deleteMenuItem('${item._id}')">Delete</button>
        `;
        menuItemsContainer.appendChild(menuItem);
    });
}

async function deleteMenuItem(id) {
    const token = localStorage.getItem('token');
   const response = await fetch(`https://project-dt207g.onrender.com/api/menu/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (response.ok) {
        alert('Menu item deleted successfully');
        fetchMenuItems(); 
    } else {
        alert('Failed to delete menu item');
    }
}

async function editMenuItem(id, name, description, price, image) {
    document.getElementById('name').value = name;
    document.getElementById('description').value = description;
    document.getElementById('price').value = price;
    document.getElementById('image').value = image;

    document.getElementById('menuForm').onsubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const name = document.getElementById('name').value;
        const description = document.getElementById('description').value;
        const price = document.getElementById('price').value;
        const image = document.getElementById('image').value;

        const response = await fetch(`https://project-dt207g.onrender.com/api/menu/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ name, description, price, image })
        });

        if (response.ok) {
            alert('Menu item updated successfully');
            fetchMenuItems();
            document.getElementById('menuForm').onsubmit = addMenuItem;
        } else {
            alert('Failed to update menu item');
        }
    };
}

function addMenuItem(e) {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const image = document.getElementById('image').value;

    const response = fetch('https://project-dt207g.onrender.com/api/menu', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name, description, price, image })
    });

    if (response.ok) {
        alert('Menu item added successfully');
        fetchMenuItems(); // Refresh the menu items
    } else {
        alert('Failed to add menu item');
    }
}
document.addEventListener('DOMContentLoaded', () => {
    fetchReservations();

    async function fetchReservations() {
        try {
            const response = await fetch('https://project-dt207g.onrender.com/api/reservations', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Ensure the token is stored and retrieved correctly
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const reservations = await response.json();
            const reservationListContainer = document.getElementById('reservation-list');
            reservationListContainer.innerHTML = ''; 

            if (reservations.length > 0) {
                reservations.forEach(reservation => {
                    const reservationItem = document.createElement('div');
                    reservationItem.classList.add('reservation-item');

                    reservationItem.innerHTML = `
                        <div class="reservation-details">
                            <h3>Reservation for ${reservation.name}</h3>
                            <p><strong>Date:</strong> ${reservation.date}</p>
                            <p><strong>Time:</strong> ${reservation.time}</p>
                            <p><strong>Guests:</strong> ${reservation.guests}</p>
                            <p><strong>Phone:</strong> ${reservation.phone}</p>
                            <button class="delete-reservation-btn" data-id="${reservation._id}">Delete</button>
                        </div>
                    `;
                    reservationListContainer.appendChild(reservationItem);
                });

                // Add event listeners to delete buttons
                document.querySelectorAll('.delete-reservation-btn').forEach(button => {
                    button.addEventListener('click', async (e) => {
                        const reservationId = e.target.getAttribute('data-id');
                        await deleteReservation(reservationId);
                        fetchReservations(); // Refresh the list after deletion
                    });
                });
            } else {
                reservationListContainer.innerHTML = '<p>No reservations found.</p>';
            }
        } catch (error) {
            console.error('Error fetching reservations:', error);
            const reservationListContainer = document.getElementById('reservation-list');
            reservationListContainer.innerHTML = '<p>Error loading reservations.</p>';
        }
    }

    async function deleteReservation(id) {
        try {
            const response = await fetch(`https://project-dt207g.onrender.com/api/reservations/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}` 
                }
            });
            if (!response.ok) {
                throw new Error(`Failed to delete reservation. HTTP status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error deleting reservation:', error);
        }
    }
});

