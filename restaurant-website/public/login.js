//login.js

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('loginForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      try {
          const response = await fetch('https://project-dt207g.onrender.com/api/auth/login', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ username, password })
          });

          const data = await response.json();

          if (response.ok) {
              localStorage.setItem('token', data.token);
              if (username === 'superuser') {
                  window.location.href = 'admin.html';
              } else {
                  window.location.href = 'index.html';
              }
          } else {
              alert(data.message || 'Login failed');
          }
      } catch (error) {
          console.error('Error:', error);
          alert('An error occurred. Please try again.');
      }
  });
  
});
