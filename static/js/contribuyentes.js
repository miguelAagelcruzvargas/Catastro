document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contribuyente-form');
    const contribuyenteModal = new bootstrap.Modal(document.getElementById('contribuyenteModal'));
    const searchInput = document.getElementById('search');
    let editMode = false;
    let currentContribuyenteId = null;

    // Función para filtrar contribuyentes por nombre o RFC
    searchInput.addEventListener('input', () => {
        const filter = searchInput.value.toLowerCase();
        const rows = document.querySelectorAll('#contribuyentes-table tbody tr');
        
        rows.forEach(row => {
            const rfcCell = row.cells[4].textContent.toLowerCase();
            const nombreCell = row.cells[0].textContent.toLowerCase();
            
            if (rfcCell.includes(filter) || nombreCell.includes(filter)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });

    // Abrir el modal para agregar un contribuyente
    document.getElementById('btn-add').addEventListener('click', () => {
        editMode = false;
        currentContribuyenteId = null;
        form.reset();
        document.getElementById('contribuyenteModalLabel').textContent = 'Agregar Contribuyente';
        contribuyenteModal.show();
    });

    // Enviar el formulario para agregar o editar contribuyente
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const data = {
            nombre: document.getElementById('nombre').value.trim(),
            ape_paterno: document.getElementById('ape_paterno').value.trim(),
            ape_materno: document.getElementById('ape_materno').value.trim(),
            domicilio: document.getElementById('domicilio').value.trim(),
            rfc: document.getElementById('rfc').value.trim(),
            localidad: document.getElementById('localidad').value.trim(),
            cp: document.getElementById('cp').value.trim()
        };

        if (editMode) {
            fetch(`/update_contribuyente/${currentContribuyenteId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(() => {
                alert('Contribuyente actualizado');
                location.reload();
            })
            .catch(error => console.error('Error:', error));
        } else {
            fetch('/add_contribuyente', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(() => {
                alert('Contribuyente agregado');
                location.reload();
            })
            .catch(error => console.error('Error:', error));
        }

        contribuyenteModal.hide();
    });

    // Manejar el clic en los botones de edición
    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            editMode = true;
            const row = event.target.closest('tr');
            currentContribuyenteId = row.getAttribute('data-id');
            document.getElementById('nombre').value = row.cells[0].textContent;
            document.getElementById('ape_paterno').value = row.cells[1].textContent;
            document.getElementById('ape_materno').value = row.cells[2].textContent;
            document.getElementById('domicilio').value = row.cells[3].textContent;
            document.getElementById('rfc').value = row.cells[4].textContent;
            document.getElementById('localidad').value = row.cells[5].textContent;
            document.getElementById('cp').value = row.cells[6].textContent;
            document.getElementById('contribuyenteModalLabel').textContent = 'Editar Contribuyente';
            contribuyenteModal.show();
        });
    });

    // Manejar el clic en los botones de eliminación
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const row = event.target.closest('tr');
            const contribuyenteId = row.getAttribute('data-id');

            if (confirm('¿Estás seguro de que deseas eliminar este contribuyente?')) {
                fetch(`/delete_contribuyente/${contribuyenteId}`, {
                    method: 'DELETE'
                })
                .then(response => response.json())
                .then(() => {
                    alert('Contribuyente eliminado');
                    location.reload();
                })
                .catch(error => console.error('Error:', error));
            }
        });
    });
});
