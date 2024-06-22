document.addEventListener('DOMContentLoaded', () => {
    fetchReservations();

    async function fetchReservations() {
        const token = localStorage.getItem('token');
        if (!token) {
            redirectToLogin();
            return;
        }

        const response = await fetch('https://project-dt207g.onrender.com/api/reservations', {
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
                     const response = await fetch(`https://project-dt207g.onrender.com/api/reservations/${reservationId}`, {
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
    function redirectToLogin() {
        window.location.href = 'login.html';
    }

