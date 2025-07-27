
const claveDocente = "docente.YELA.TEC.2025";

document.getElementById("btn-docente").addEventListener("click", () => {
  let claveIngresada = prompt("Ingrese clave para acceso docente:");
  if (claveIngresada === claveDocente) {
    mostrarMenuDocente();
  } else {
    alert("Clave incorrecta. Acceso denegado.");
  }
});

document.getElementById("btn-estudiante").addEventListener("click", () => {
  alert("Bienvenido estudiante. Próximamente tendrás acceso a guías interactivas.");
});

function mostrarMenuDocente() {
  document.body.innerHTML = `
    <h1>Menú Docente - YELA TEC</h1>
    <button onclick="cerrarSesion()">Cerrar sesión</button>
    <div>
      <h3>Opciones disponibles:</h3>
      <ul>
        <li>Ver progreso de estudiantes</li>
        <li>Configurar guías de aves</li>
        <li>Agregar material educativo</li>
      </ul>
    </div>
  `;
}

function cerrarSesion() {
  location.reload();
}
