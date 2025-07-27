
// Mostrar menú Docente y ocultar Estudiante
function mostrarLogin() {
  document.getElementById('login').style.display = 'flex';
  document.getElementById('estudiante').style.display = 'none';
}

// Mostrar menú Estudiante y ocultar Docente
function modoEstudiante() {
  document.getElementById('estudiante').style.display = 'flex';
  document.getElementById('login').style.display = 'none';
  document.getElementById('mensajeAudio').textContent = '';
}

// Validar clave docente
function verificarClave() {
  const clave = document.getElementById('clave').value;
  if (clave === 'docente.YELA.TEC.2025') {
    alert('Acceso concedido. Bienvenido Docente.');
    // Aquí puedes agregar la funcionalidad para el panel docente
  } else {
    alert('Clave incorrecta. Intenta de nuevo.');
  }
}

// Activar reconocimiento de voz
function activarMicrofono() {
  const mensajeAudio = document.getElementById('mensajeAudio');

  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    mensajeAudio.textContent = '❌ Tu navegador no soporta reconocimiento de voz.';
    return;
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.lang = 'es-ES';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.start();
  mensajeAudio.textContent = '🎧 Escuchando...';

  recognition.onresult = (event) => {
    const texto = event.results[0][0].transcript;
    mensajeAudio.textContent = `🎙️ Detectado: "${texto}"`;
  };

  recognition.onerror = (event) => {
    mensajeAudio.textContent = `❌ Error: ${event.error}`;
  };

  recognition.onend = () => {
    // Puedes activar algo aquí si quieres cuando termina la escucha
  };
}
