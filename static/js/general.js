// Función para calcular el impuesto predial
function calcularTotal() {
  const valorCatastral = parseFloat(
    document.getElementById("valor_catastral").value
  );
  const tasa = parseFloat(document.getElementById("tasa_predial").value);
  const descuentoTipo = document.querySelector(
    'input[name="tipo_descuento"]:checked'
  ).value;
  let descuento = 0;

  const importePredial = valorCatastral * (tasa / 100);
  document.getElementById("importe").value = importePredial.toFixed(2);

  // Calcular descuento
  if (descuentoTipo === "porcentaje") {
    const descuentoPorcentaje = parseFloat(
      document.getElementById("descuento_porcentaje").value
    );
    descuento = importePredial * (descuentoPorcentaje / 100);
  } else if (descuentoTipo === "monto") {
    descuento = parseFloat(document.getElementById("descuento_monto").value);
  }

  // Total a pagar
  const total = importePredial - descuento;
  document.getElementById("total").value = total.toFixed(2);
}

// Función para mostrar opciones de descuento
function mostrarDescuento() {
  const descuentoTipo = document.querySelector(
    'input[name="tipo_descuento"]:checked'
  ).value;
  if (descuentoTipo === "porcentaje") {
    document.getElementById("descuento_porcentaje_input").style.display =
      "block";
    document.getElementById("descuento_monto_input").style.display = "none";
  } else if (descuentoTipo === "monto") {
    document.getElementById("descuento_porcentaje_input").style.display =
      "none";
    document.getElementById("descuento_monto_input").style.display = "block";
  }
}

// Función para validar campos del formulario de empleados
function validarEmpleado() {
  const nombre = document.getElementById("nombre").value;
  if (nombre === "") {
    alert("El nombre es obligatorio.");
    return false;
  }
  // Agregar más validaciones según sea necesario.
  return true;
}

// Similar funciones de validación y lógica para contribuyentes y predios
