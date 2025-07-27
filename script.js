
let idiomaActual = 'es';
let claveActual = 'docente.YELA.TEC.2025';

function cambiarIdioma() {
  const selector = document.getElementById("idioma");
  idiomaActual = selector.value;

  if (idiomaActual === "es") {
    document.querySelector("h1").textContent = "Bienvenidos a YELA TEC";
    document.querySelector("button:nth-of-type(1)").textContent = "👩‍🏫 Docente";
    document.querySelector("button:nth-of-type(2)").textContent = "🧒 Estudiante";
    document.getElementById("bienvenida").textContent = "Abajo en el menú puedes elegir tu rol";
  } else {
    document.querySelector("h1").textContent = "Welcome to YELA TEC";
    document.querySelector("button:nth-of-type(1)").textContent = "👩‍🏫 Teacher";
    document.querySelector("button:nth-of-type(2)").textContent = "🧒 Student";
    document.getElementById("bienvenida").textContent = "Below in the menu you can choose your role";
  }
}

// Mostrar login si elige docente
function mostrarLogin() {
  const clave = prompt("Ingresa la clave de acceso para docentes:");
  if (clave === claveActual) {
    alert(idiomaActual === "es" ? "Acceso docente concedido ✅" : "Teacher access granted ✅");
    // Redirigir o mostrar menú especial
  } else {
    alert(idiomaActual === "es" ? "Clave incorrecta 🚫" : "Incorrect key 🚫");
  }
}

// Función principal para escuchar comandos de voz
function iniciarReconocimientoVoz() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Tu navegador no soporta reconocimiento de voz.");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = idiomaActual === 'es' ? 'es-ES' : 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.start();

  recognition.onresult = (event) => {
    const resultado = event.results[0][0].transcript.toLowerCase();

    if (idiomaActual === 'es') {
      if (resultado.includes("docente")) {
        mostrarLogin();
      } else if (resultado.includes("estudiante")) {
        alert("Modo estudiante activado 🧒");
      } else {
        alert("Comando no reconocido.");
      }
    } else {
      if (resultado.includes("teacher")) {
        mostrarLogin();
      } else if (resultado.includes("student")) {
        alert("Student mode activated 🧒");
      } else {
        alert("Command not recognized.");
      }
    }
  };

  recognition.onerror = (event) => {
    console.error("Error de reconocimiento:", event.error);
    alert("Error de reconocimiento de voz. Intenta de nuevo.");
  };
}

// Arranca con el idioma por defecto
window.onload = () => {
  cambiarIdioma();
};
