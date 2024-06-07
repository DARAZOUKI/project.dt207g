// script.js
document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('open-menu');
    let closeBtn = document.getElementById("close-menu");
    const navMenu = document.getElementById('nav-menu');

    menuButton.addEventListener('click', () => {
        navMenu.classList.toggle('visible');
    });

    function redirectToLogin() {
        window.location.href = 'loginOrRegister.html';
    }
});
