// Aquí puedes agregar cualquier funcionalidad JavaScript necesaria
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const body = document.body;
    menuToggle.addEventListener('click', () => {
        body.classList.toggle('collapsed');
    });
});
