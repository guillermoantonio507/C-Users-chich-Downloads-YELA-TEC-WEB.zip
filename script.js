
function mostrarLogin() {
  document.getElementById('login').style.display = 'flex';
  document.getElementById('estudiante').style.display = 'none';
}

function modoEstudiante() {
  document.getElementById('estudiante').style.display = 'flex';
  document.getElementById('login').style.display = 'none';
  document.getElementById('mensajeAudio').textContent = '';
}

function verificarClave() {
  const clave = document.getElementById('clave').value;
  if (clave === 'docente.YELA.TEC.2025') {
    alert('Acceso concedido. Bienvenido Docente.');
    // Aquí agrega panel o funcionalidad docente
  } else {
    alert('Clave incorrecta. Intenta de nuevo.');
  }
}

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
}
