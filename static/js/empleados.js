document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('employee-form');
    const employeeModal = new bootstrap.Modal(document.getElementById('employeeModal'));
    const searchInput = document.getElementById('search');
    let editMode = false;
    let currentEmployeeId = null;

    // Función para filtrar empleados por nombre o RFC
    searchInput.addEventListener('input', () => {
        const filter = searchInput.value.toLowerCase();
        const rows = document.querySelectorAll('#empleados-table tbody tr');
        
        rows.forEach(row => {
            const rfcCell = row.cells[0].textContent.toLowerCase();
            const nombreCell = row.cells[1].textContent.toLowerCase();
            
            if (rfcCell.includes(filter) || nombreCell.includes(filter)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });

    // Abrir el modal para agregar un empleado
    document.getElementById('btn-add').addEventListener('click', () => {
        editMode = false;
        currentEmployeeId = null;
        form.reset();
        document.getElementById('employeeModalLabel').textContent = 'Agregar Empleado';
        employeeModal.show();
    });

    // Enviar el formulario para agregar o editar empleado
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const rfc = document.getElementById('rfc').value.trim();
        const nombre = document.getElementById('nombre').value.trim();
        const ape_paterno = document.getElementById('ape_paterno').value.trim();
        const ape_materno = document.getElementById('ape_materno').value.trim();
        const caja = document.getElementById('caja').value.trim();

        // Validar que todos los campos estén llenos
        if (!rfc || !nombre || !ape_paterno || !ape_materno || !caja) {
            alert('Todos los campos son obligatorios.');
            return;
        }

        const data = {
            rfc,
            nombre,
            ape_paterno,
            ape_materno,
            caja
        };

        if (editMode) {
            fetch(`/update_empleado/${currentEmployeeId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(() => {
                alert('Empleado actualizado');
                location.reload();
            })
            .catch(error => console.error('Error:', error));
        } else {
            fetch('/add_empleado', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(() => {
                alert('Empleado agregado');
                location.reload();
            })
            .catch(error => console.error('Error:', error));
        }

        employeeModal.hide();
    });

    // Manejar el clic en los botones de edición
    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            editMode = true;
            const row = event.target.closest('tr');
            currentEmployeeId = row.getAttribute('data-id');
            document.getElementById('rfc').value = row.cells[0].textContent;
            document.getElementById('nombre').value = row.cells[1].textContent;
            document.getElementById('ape_paterno').value = row.cells[2].textContent;
            document.getElementById('ape_materno').value = row.cells[3].textContent;
            document.getElementById('caja').value = row.cells[4].textContent;
            document.getElementById('employeeModalLabel').textContent = 'Editar Empleado';
            employeeModal.show();
        });
    });

    // Manejar el clic en los botones de eliminación
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const row = event.target.closest('tr');
            const employeeId = row.getAttribute('data-id');

            if (confirm('¿Estás seguro de que deseas eliminar este empleado?')) {
                fetch(`/delete_empleado/${employeeId}`, {
                    method: 'DELETE'
                })
                .then(response => response.json())
                .then(() => {
                    alert('Empleado eliminado');
                    location.reload();
                })
                .catch(error => console.error('Error:', error));
            }
        });
    });
});
