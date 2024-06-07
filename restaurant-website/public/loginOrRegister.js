// loginOrRegister.js

document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('registerUsername').value; // Update the ID to avoid conflict
  const password = document.getElementById('registerPassword').value; // Update the ID to avoid conflict

  try {
      const response = await fetch('http://localhost:10000/api/auth/register', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
      });

      if (response.ok) {
          alert('Registration successful');
      } else {
          const data = await response.json();
          alert(data.message || 'Registration failed');
      }
  } catch (error) {
      console.error('Error during registration:', error);
      alert('An unexpected error occurred during registration');
  }
});


document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('loginUsername').value; // Update the ID to avoid conflict
  const password = document.getElementById('loginPassword').value; // Update the ID to avoid conflict
  try {
      const response = await fetch('http://localhost:10000/api/auth/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
      });

      const data = await response.json();
      console.log('Token:', data.token); // Log the token for debugging

      if (response.ok) {
          localStorage.setItem('token', data.token);
          window.location.href = 'admin.html';
      } else {
          alert(data.message || 'Login failed');
      }
  } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
  }
});
