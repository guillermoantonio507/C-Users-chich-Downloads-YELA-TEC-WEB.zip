// Clave del menú oculto para docentes
const claveCorrecta = "docente.YELA.TEC.2025";

// Mostrar pantalla de login
function mostrarLogin() {
  document.getElementById("login").style.display = "block";
  document.getElementById("bienvenida").style.display = "none";
}

// Verificar clave del docente
function verificarClave() {
  const claveIngresada = document.getElementById("clave").value;
  if (claveIngresada === claveCorrecta) {
    alert("✅ Acceso autorizado. Bienvenido Docente.");
    document.getElementById("login").style.display = "none";
    document.getElementById("contenidoDocente").style.display = "block";
  } else {
    alert("❌ Clave incorrecta. Intente de nuevo.");
  }
}

// Inicializar reconocimiento de voz
let reconocimiento;
try {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  reconocimiento = new SpeechRecognition();
  reconocimiento.lang = "es-ES";
  reconocimiento.continuous = false;

  reconocimiento.onresult = (event) => {
    const resultado = event.results[0][0].transcript;
    document.getElementById("resultadoVoz").textContent = "🎤 Tú dijiste: " + resultado;
  };

  reconocimiento.onerror = (event) => {
    console.error("⚠️ Error en el reconocimiento de voz:", event.error);
    document.getElementById("resultadoVoz").textContent = "❌ Error al escuchar. Intenta de nuevo.";
  };
} catch (e) {
  console.warn("❗ Reconocimiento de voz no soportado en este navegador.");
}

// Activar el micrófono
function activarMicrofono() {
  if (reconocimiento) {
    reconocimiento.start();
    document.getElementById("resultadoVoz").textContent = "🎧 Escuchando...";
  } else {
    alert("Este navegador no soporta reconocimiento de voz.");
  }
}
