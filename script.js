
let idioma = "es";
let claveActual = "docente.YELA.TEC.2025";

function mostrarLogin(rol) {
  document.getElementById("login").style.display = "block";
  const mensaje = idioma === "es" ? `Bienvenido ${rol}` : `Welcome ${rol}`;
  document.getElementById("bienvenida").textContent = mensaje;
}

function verificarClave() {
  const clave = document.getElementById("clave").value;
  if (clave === claveActual) {
    alert(idioma === "es" ? "Acceso concedido" : "Access granted");
  } else {
    alert(idioma === "es" ? "Clave incorrecta" : "Wrong key");
  }
}

function cambiarIdioma() {
  idioma = idioma === "es" ? "en" : "es";
  alert(idioma === "es" ? "Idioma cambiado a Español" : "Language changed to English");
}

function activarMicrofono() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = idioma === "es" ? "es-ES" : "en-US";

  recognition.onresult = function(event) {
    const texto = event.results[0][0].transcript.toLowerCase();
    alert(`🎤 ${idioma === "es" ? "Has dicho" : "You said"}: ${texto}`);
  };

  recognition.onerror = function(event) {
    alert("🎤 Error: " + event.error);
  };

  recognition.start();
}
