
// ===== CONFIGURACIÓN =====
let claveDocente = "docente.YELA.TEC.2025";

// ===== FUNCIÓN DE IDIOMA =====
function cambiarIdioma() {
  const idioma = document.getElementById("idioma").value;

  const textos = {
    es: {
      titulo: "Bienvenidos a YELA TEC",
      subtitulo: "Abajo en el menú",
      estudiante: "👧 Estudiante",
      docente: "👨‍🏫 Docente"
    },
    en: {
      titulo: "Welcome to YELA TEC",
      subtitulo: "Choose your role below",
      estudiante: "👧 Student",
      docente: "👨‍🏫 Teacher"
    }
  };

  const t = textos[idioma];
  document.querySelector("h1").textContent = t.titulo;
  document.getElementById("subtitulo").textContent = t.subtitulo;
  document.getElementById("btnEstudiante").textContent = t.estudiante;
  document.getElementById("btnDocente").textContent = t.docente;
}

// ===== ACCESO DOCENTE CON CLAVE =====
function accesoDocente() {
  const intento = prompt("Ingrese la clave de acceso de docente:");
  if (intento === claveDocente) {
    alert("✅ Bienvenido, Docente. Acceso autorizado.");
    // Aquí puedes redirigir o mostrar contenido exclusivo
  } else {
    alert("❌ Clave incorrecta. Acceso denegado.");
  }
}

// ===== RECONOCIMIENTO DE VOZ =====
let reconocimiento;
if ('webkitSpeechRecognition' in window) {
  reconocimiento = new webkitSpeechRecognition();
  reconocimiento.lang = "es-ES";
  reconocimiento.continuous = false;
  reconocimiento.interimResults = false;

  reconocimiento.onresult = function(event) {
    const texto = event.results[0][0].transcript;
    document.getElementById("textoEscuchado").textContent = "🎤 Dijiste: " + texto;
  };

  reconocimiento.onerror = function(event) {
    document.getElementById("textoEscuchado").textContent = "❌ Error en reconocimiento de voz: " + event.error;
  };
} else {
  alert("⚠️ Lo sentimos, tu navegador no soporta reconocimiento de voz.");
}

function iniciarReconocimiento() {
  if (reconocimiento) {
    reconocimiento.start();
    document.getElementById("textoEscuchado").textContent = "🎧 Escuchando...";
  }
}
