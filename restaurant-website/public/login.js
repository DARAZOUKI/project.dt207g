document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Login failed:', errorData);
            alert(errorData.message || 'Login failed');
            return;
        }

        const data = await response.json();
        localStorage.setItem('token', data.token);
        window.location.href = '/admin.html';
    } catch (error) {
        console.error('An error occurred during login:', error);
        alert('An unexpected error occurred. Please try again later.');
    }
});
