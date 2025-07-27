
let idioma = "es";
let claveDocente = "docente.YELA.TEC.2025";

function mostrarLogin(rol) {
  const bienvenida = {
    es: rol === 'docente' ? 'Bienvenido docente' : 'Bienvenido estudiante',
    en: rol === 'docente' ? 'Welcome teacher' : 'Welcome student'
  };
  document.getElementById("bienvenida").innerText = bienvenida[idioma];
  document.getElementById("login").style.display = "block";
}

function verificarClave() {
  const clave = document.getElementById("clave").value;
  if (clave === claveDocente) {
    alert(idioma === "es" ? "Acceso docente correcto" : "Teacher access granted");
  } else {
    alert(idioma === "es" ? "Clave incorrecta" : "Incorrect password");
  }
}

function cambiarIdioma() {
  idioma = idioma === "es" ? "en" : "es";
  document.querySelectorAll("[data-es]").forEach(el => {
    el.textContent = el.getAttribute(`data-${idioma}`);
  });
}

function activarMicrofono() {
  if (!('webkitSpeechRecognition' in window)) {
    alert("Reconocimiento de voz no soportado.");
    return;
  }

  const recognition = new webkitSpeechRecognition();
  recognition.lang = idioma === "es" ? "es-ES" : "en-US";
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onresult = function (event) {
    const resultado = event.results[0][0].transcript.toLowerCase();
    if (resultado.includes("docente") || resultado.includes("teacher")) {
      mostrarLogin("docente");
    } else if (resultado.includes("estudiante") || resultado.includes("student")) {
      mostrarLogin("estudiante");
    } else {
      alert(`Escuché: "${resultado}"`);
    }
  };

  recognition.onerror = function (event) {
    alert("Error de reconocimiento: " + event.error);
  };

  recognition.start();
}
