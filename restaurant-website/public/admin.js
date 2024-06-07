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
    
        const response = await fetch('http://localhost:10000/api/menu', {
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
    });
});

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
            <button onclick="editMenuItem('${item._id}', '${item.name}', '${item.description}', '${item.price}', '${item.image}')">Edit</button>
            <button onclick="deleteMenuItem('${item._id}')">Delete</button>
        `;
        menuItemsContainer.appendChild(menuItem);
    });
}

async function deleteMenuItem(id) {
    const token = localStorage.getItem('token');
   const response = await fetch(`http://localhost:10000/api/menu/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (response.ok) {
        alert('Menu item deleted successfully');
        fetchMenuItems(); // Refresh the menu items
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

        const response = await fetch(`http://localhost:10000/api/menu/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ name, description, price, image })
        });

        if (response.ok) {
            alert('Menu item updated successfully');
            fetchMenuItems(); // Refresh the menu items
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

    const response = fetch('http://localhost:10000/api/menu', {
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
        const token = localStorage.getItem('token');
        if (!token) {
            redirectToLogin();
            return;
        }

        const response = await fetch('http://localhost:10000/api/reservations', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const reservations = await response.json();
            displayReservations(reservations);
        } else {
            console.error('Failed to fetch reservations');
            alert('Failed to fetch reservations');
        }
    }

    function displayReservations(reservations) {
        const reservationList = document.getElementById('reservation-list');
        reservationList.innerHTML = '';
        reservations.forEach(reservation => {
            const reservationItem = document.createElement('div');
            reservationItem.classList.add('reservation-item');
            const formattedDate = new Date(reservation.date).toLocaleDateString();
            
            reservationItem.innerHTML = `
                <p><strong>Name:</strong> ${reservation.name}</p>
                <p><strong>Phone:</strong> ${reservation.phone}</p>
                <p><strong>Date:</strong> ${formattedDate}</p>
                <p><strong>Time:</strong> ${reservation.time}</p>
                <p><strong>Guests:</strong> ${reservation.guests}</p>
                 <button class="delete-btn" data-id="${reservation._id}">Delete</button>
            `;
            reservationList.appendChild(reservationItem);
        });
     // Add event listener to delete buttons
     const deleteButtons = document.querySelectorAll('.delete-btn');
     deleteButtons.forEach(button => {
         button.addEventListener('click', async () => {
             const reservationId = button.getAttribute('data-id');
             const confirmation = confirm('Are you sure you want to delete this reservation?');
             if (confirmation) {
                 try {
                     const token = localStorage.getItem('token');
                     const response = await fetch(`http://localhost:10000/api/reservations/${reservationId}`, {
                         method: 'DELETE',
                         headers: {
                             'Authorization': `Bearer ${token}`,
                             'Content-Type': 'application/json'
                         }
                     });

                     if (response.ok) {
                         button.parentElement.remove();
                         alert('Reservation deleted successfully');
                     } else {
                         console.error('Failed to delete reservation');
                         alert('Failed to delete reservation');
                     }
                 } catch (error) {
                     console.error('Error:', error);
                     alert('An error occurred while deleting the reservation');
                 }
             }
         });
     });
 }
});