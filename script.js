
let idiomaActual = "es"; // "es" para español, "en" para inglés
let claveDocente = "docente.YELA.TEC.2025";

// Textos en ambos idiomas
const textos = {
  es: {
    bienvenidaDocente: "Bienvenido docente",
    bienvenidaEstudiante: "Bienvenido estudiante",
    clavePlaceholder: "Clave secreta",
    entrar: "Entrar",
    errorClave: "Clave incorrecta. Intente nuevamente.",
    idiomaCambiado: "Idioma cambiado a Español",
    escuchando: "🎤 Escuchando..."
  },
  en: {
    bienvenidaDocente: "Welcome teacher",
    bienvenidaEstudiante: "Welcome student",
    clavePlaceholder: "Secret key",
    entrar: "Enter",
    errorClave: "Wrong key. Try again.",
    idiomaCambiado: "Language changed to English",
    escuchando: "🎤 Listening..."
  }
};

// Cambiar idioma manual
function cambiarIdioma() {
  idiomaActual = idiomaActual === "es" ? "en" : "es";
  alert(textos[idiomaActual].idiomaCambiado);
  actualizarTextos();
}

// Actualizar todos los textos según el idioma
function actualizarTextos() {
  const claveInput = document.getElementById("clave");
  const entrarBtn = document.querySelector("#login button");

  claveInput.placeholder = textos[idiomaActual].clavePlaceholder;
  entrarBtn.textContent = textos[idiomaActual].entrar;
}

// Mostrar login según el rol
function mostrarLogin(tipo) {
  document.getElementById("login").style.display = "block";
  const bienvenida = document.getElementById("bienvenida");
  bienvenida.textContent = tipo === "docente"
    ? textos[idiomaActual].bienvenidaDocente
    : textos[idiomaActual].bienvenidaEstudiante;
  actualizarTextos();
}

// Verificar clave secreta
function verificarClave() {
  const claveIngresada = document.getElementById("clave").value;
  if (claveIngresada === claveDocente) {
    alert("✅ Acceso concedido al modo docente.");
    // Aquí podrías redirigir a un dashboard
  } else {
    alert(textos[idiomaActual].errorClave);
  }
}

// Activar reconocimiento de voz
function activarMicrofono() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("🎙️ Tu navegador no soporta reconocimiento de voz.");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = idiomaActual === "es" ? "es-ES" : "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  alert(textos[idiomaActual].escuchando);

  recognition.start();

  recognition.onresult = function(event) {
    const comando = event.results[0][0].transcript.toLowerCase();
    console.log("🎧 Comando:", comando);

    // Comandos en español e inglés
    if ((idiomaActual === "es" && comando.includes("cambiar idioma")) ||
        (idiomaActual === "en" && comando.includes("change language"))) {
      cambiarIdioma();
    }

    if ((idiomaActual === "es" && comando.includes("docente")) ||
        (idiomaActual === "en" && comando.includes("teacher"))) {
      mostrarLogin("docente");
    }

    if ((idiomaActual === "es" && comando.includes("estudiante")) ||
        (idiomaActual === "en" && comando.includes("student"))) {
      mostrarLogin("estudiante");
    }
  };

  recognition.onerror = function(event) {
    console.error("❌ Error de voz:", event.error);
    alert("Error de reconocimiento: " + event.error);
  };
}
