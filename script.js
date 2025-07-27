
let claveActual = "docente.YELA.TEC.2025";

function mostrarLogin() {
  document.getElementById("login").style.display = "block";
  document.getElementById("bienvenida").style.display = "none";
}

function verificarClave() {
  let claveIngresada = document.getElementById("clave").value;
  if (claveIngresada === claveActual) {
    document.getElementById("bienvenida").style.display = "block";
    document.getElementById("login").style.display = "none";
  } else {
    alert("Clave incorrecta. Intenta de nuevo.");
  }
}
