
let idioma = "es";
const claveDocente = "docente.YELA.TEC.2025";

function mostrarLogin(rol) {
  const mensajes = {
    es: { docente: "Bienvenido docente", estudiante: "Bienvenido estudiante" },
    en: { docente: "Welcome teacher", estudiante: "Welcome student" }
  };
  document.getElementById("bienvenida").textContent = mensajes[idioma][rol];
  document.getElementById("login").style.display = "flex";
}

function verificarClave() {
  const claveIngresada = document.getElementById("clave").value;
  if (claveIngresada === claveDocente) {
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
    alert(idioma === "es" ? "Reconocimiento de voz no soportado." : "Voice recognition not supported.");
    return;
  }

  const recognition = new webkitSpeechRecognition();
  recognition.lang = idioma === "es" ? "es-ES" : "en-US";
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onstart = () => {
    alert(idioma === "es" ? "🎤 Escuchando..." : "🎤 Listening...");
  };

  recognition.onresult = function (event) {
    const resultado = event.results[0][0].transcript.toLowerCase();
    if ((idioma === "es" && resultado.includes("docente")) || (idioma === "en" && resultado.includes("teacher"))) {
      mostrarLogin("docente");
    } else if ((idioma === "es" && resultado.includes("estudiante")) || (idioma === "en" && resultado.includes("student"))) {
      mostrarLogin("estudiante");
    } else if ((idioma === "es" && resultado.includes("idioma")) || (idioma === "en" && resultado.includes("language"))) {
      cambiarIdioma();
    } else {
      alert((idioma === "es" ? "Escuché: " : "I heard: ") + `"${resultado}"`);
    }
  };

  recognition.onerror = function (event) {
    alert((idioma === "es" ? "Error de reconocimiento: " : "Recognition error: ") + event.error);
  };

  recognition.start();
}
