document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('predio-form');
    const predioModal = new bootstrap.Modal(document.getElementById('predioModal'));
    const searchInput = document.getElementById('search');

    // Función para filtrar predios por RFC
    searchInput.addEventListener('input', () => {
        const filter = searchInput.value.toLowerCase();
        const rows = document.querySelectorAll('#predios-table tbody tr');
        
        rows.forEach(row => {
            const rfcCell = row.cells[0].textContent.toLowerCase();
            if (rfcCell.includes(filter)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });

    // Abrir el modal para agregar un predio
    document.getElementById('btn-add').addEventListener('click', () => {
        form.reset();
        predioModal.show();
    });

    // Enviar el formulario para agregar un predio
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const data = {
            rfc: document.getElementById('rfc').value.trim(),
            clave_catastral: document.getElementById('clave_catastral').value.trim(),
            padron: document.getElementById('padron').value.trim(),
            cuenta_catastral: document.getElementById('cuenta_catastral').value.trim(),
            ubicacion_predio: document.getElementById('ubicacion_predio').value.trim(),
            cp_predio: document.getElementById('cp_predio').value.trim(),
            base_gravable: document.getElementById('base_gravable').value.trim(),
            superficie_contruccion: document.getElementById('superficie_contruccion').value.trim(),
            superficie_terreno: document.getElementById('superficie_terreno').value.trim(),
            fecha_celebracion: document.getElementById('fecha_celebracion').value
        };

        fetch('/add_predio', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(() => {
            alert('Predio agregado');
            location.reload();
        })
        .catch(error => console.error('Error:', error));
    });

    // Manejar el clic en los botones de ver
    document.querySelectorAll('.view-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const row = event.target.closest('tr');
            const rfc = row.cells[0].textContent.trim();
            window.location.href = `/ver_predios/${rfc}`;
        });
    });
});
