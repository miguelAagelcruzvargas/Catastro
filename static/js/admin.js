//funcion que valida que los campos no esten vacios
//(solo los campos obligatorios)
function validarFormulario() {
  const camposRequeridos = [
    "cuenta_contable",
    "descripcion",
    "periodo",
    "importe",
    "fecha_pago",
  ];
  let formularioValido = true;

  // Limpiar validaciones previas
  camposRequeridos.forEach((campo) => {
    document.getElementById(campo).classList.remove("invalid");
  });

  // Validar campos
  camposRequeridos.forEach((campo) => {
    const valor = document.getElementById(campo).value;
    if (!valor) {
      document.getElementById(campo).classList.add("invalid");
      formularioValido = false;
    }
  });

  if (!formularioValido) {
    // Mostrar SweetAlert2 en lugar de alert
    Swal.fire({
      icon: "error",
      title: "Campos incompletos",
      text: "Por favor, completa todos los campos obligatorios.",
      confirmButtonText: "Entendido",
    });
  } else {
    mostrarResumen();
  }

  return false; // Evitar el envío del formulario para mostrar el resumen
}

function mostrarResumen() {
  // Obtener los valores del formulario
  const cuenta = document.getElementById("cuenta_contable").value;
  const descripcion = document.getElementById("descripcion").value;
  const periodo = document.getElementById("periodo").value;

  const importe =
    parseFloat(
      document.getElementById("importe").value.replace(/[^\d.-]/g, "")
    ) || 0;

  const subtotal =
    parseFloat(
      document.getElementById("subtotal").value.replace(/[^0-9.-]+/g, "")
    ) || 0;
  const descuento =
    parseFloat(
      document.getElementById("descuento").value.replace(/[^0-9.-]+/g, "")
    ) || 0;
  const total =
    parseFloat(
      document.getElementById("total").value.replace(/[^0-9.-]+/g, "")
    ) || 0;
  const fecha = document.getElementById("fecha_pago").value;
  const observaciones = document.getElementById("observaciones").value;

  // Añadir el símbolo de $ a los campos relevantes
  document.getElementById("resumenCuenta").textContent = cuenta;
  document.getElementById("resumenDescripcion").textContent = descripcion;
  document.getElementById("resumenPeriodo").textContent = periodo;
  document.getElementById("resumenImporte").textContent = `$${importe.toFixed(
    2
  )}`;
  document.getElementById("resumenSubtotal").textContent = `$${subtotal.toFixed(
    2
  )}`;
  document.getElementById(
    "resumenDescuento"
  ).textContent = `$${descuento.toFixed(2)}`;
  document.getElementById("resumenTotal").textContent = `$${total.toFixed(2)}`;
  document.getElementById("resumenFecha").textContent = fecha;
  document.getElementById("resumenObservaciones").textContent = observaciones;

  // Mostrar el resumen y ocultar el formulario
  document.getElementById("resumenPago").style.display = "block";
  document.getElementById("predialForm").style.display = "none";
}

function confirmarPago() {
  // Confirmar el pago con un mensaje de confirmación de SweetAlert2
  Swal.fire({
    title: "¿Estás seguro?",
    text: "Una vez confirmado, no podrás modificar el pago.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, confirmar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      document.getElementById("predialForm").submit(); // Enviar el formulario después de confirmar
    }
  });
}

function editarPago() {
  // Ocultar el resumen y mostrar el formulario de nuevo
  document.getElementById("resumenPago").style.display = "none";
  document.getElementById("predialForm").style.display = "block";
}

function actualizarContador() {
  const texto = document.getElementById("observaciones").value;
  const contador = document.getElementById("contadorCaracteres");
  const maxCaracteres = 250;
  const longitudTexto = texto.length;

  contador.textContent = `${longitudTexto}/${maxCaracteres}`;

  // Cambiar el color a rojo cuando se alcance el límite
  if (longitudTexto === maxCaracteres) {
    contador.classList.add("limite");
  } else {
    contador.classList.remove("limite");
  }
}
