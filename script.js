
let claveActual = "docente.YELA.TEC.2025";

function mostrarLogin() {
  document.getElementById("login").style.display = "block";
}

function verificarClave() {
  const clave = document.getElementById("clave").value;
  if (clave === claveActual) {
    alert("Acceso docente concedido.");
    // Lógica para abrir módulo docente
  } else {
    alert("Clave incorrecta.");
  }
}

function modoEstudiante() {
  alert("Modo estudiante activado.");
  // Aquí puedes redirigir o mostrar el contenido del estudiante
}

function modoTexto() {
  const texto = prompt("Escribe tu pregunta:");
  alert("Texto ingresado: " + texto);
}

function activarMicrofono() {
  if (!('webkitSpeechRecognition' in window)) {
    alert("Tu navegador no soporta reconocimiento de voz.");
    return;
  }
  const recognition = new webkitSpeechRecognition();
  recognition.lang = document.getElementById("idioma").value === "en" ? "en-US" : "es-ES";
  recognition.onresult = function (event) {
    const resultado = event.results[0][0].transcript;
    alert("Has dicho: " + resultado);
  };
  recognition.onerror = function () {
    alert("Error al reconocer la voz.");
  };
  recognition.start();
}

function cambiarIdioma() {
  const idioma = document.getElementById("idioma").value;
  alert("Idioma cambiado a: " + (idioma === "en" ? "English" : "Español"));
}
