//usuarios autorizados
var usuariosAutorizados = {
    "admin": "admin",
    "brymax": "admin",
};

function iniciarSesion() {
    var usuario = document.getElementById('usuario').value;
    var password = document.getElementById('password').value;

    // Verificar user y pass
    if (usuariosAutorizados.hasOwnProperty(usuario) && usuariosAutorizados[usuario] === password) {
        // si es correcto mostrar
        document.getElementById('inicioSesionDiv').style.display = 'none';
        document.getElementById('panelControl').style.display = 'block';
        mostrarDatosFormularios();
    } else {
        // si no coincide mostrar error
        alert('Usuario o contraseña incorrectos. Por favor, inténtelo de nuevo.');
    }
}

// Obtener referencia al elemento tbody de la tabla
var tablaFormularios = document.getElementById('tablaFormularios');

// Recuperar datos del almacenamiento local
var datosGuardados = localStorage.getItem('datosMantencion');

// Verificar si hay datos guardados
if (datosGuardados) {
    // Convertir los datos del almacenamiento local a un arreglo de formularios
    var formularios = JSON.parse(datosGuardados);

    // Recorrer los formularios y agregar filas a la tabla
    formularios.forEach(function(formulario) {
        var fila = tablaFormularios.insertRow();
        fila.insertCell(0).textContent = formulario.nombre;
        fila.insertCell(1).textContent = formulario.email;
        fila.insertCell(2).textContent = formulario.telefono;
        fila.insertCell(3).textContent = formulario.tipoMantencion;
        fila.insertCell(4).textContent = formulario.direccion;
        fila.insertCell(5).textContent = formulario.fecha;
    });
} else {
    // Si no hay datos guardados, mostrar un mensaje en la tabla
    var fila = tablaFormularios.insertRow();
    var celda = fila.insertCell();
    celda.colSpan = 6;
    celda.textContent = 'No hay datos disponibles';
}




function confirmarLimpiar() {
    var confirmacion = confirm('¿Estás seguro de que deseas limpiar todos los datos de los formularios?');
    if (confirmacion) {
        limpiarDatos();
    }
}

// Función para limpiar los datos de los formularios
function limpiarDatos() {
    // Limpiar el almacenamiento local
    localStorage.removeItem('datosMantencion');
    // Limpiar la tabla
    var tablaFormularios = document.getElementById('tablaFormularios');
    tablaFormularios.innerHTML = '';
}