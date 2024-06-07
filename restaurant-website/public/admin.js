document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/loginOrRegister.html';
    }
    
    fetchMenuItems();
    
    document.getElementById('menuForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const name = document.getElementById('name').value;
        const description = document.getElementById('description').value;
        const price = document.getElementById('price').value;
        const image = document.getElementById('image').value;
    
        const response = await fetch('/api/menu', {
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
    const response = await fetch(`/api/menu/${id}`, {
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
    // Display the menu item details in the form for editing
    document.getElementById('name').value = name;
    document.getElementById('description').value = description;
    document.getElementById('price').value = price;
    document.getElementById('image').value = image;

    // Update the form submission to handle editing
    document.getElementById('menuForm').onsubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const name = document.getElementById('name').value;
        const description = document.getElementById('description').value;
        const price = document.getElementById('price').value;
        const image = document.getElementById('image').value;

        const response = await fetch(`/api/menu/${id}`, {
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
            // Reset the form submission to handle adding new items
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

    const response = fetch('/api/menu', {
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
