
const btnDocente = document.getElementById('btn-docente');
const btnEstudiante = document.getElementById('btn-estudiante');
const panelDocente = document.getElementById('login-docente');
const panelEstudiante = document.getElementById('area-estudiante');
const btnLogin = document.getElementById('btn-login');
const btnMic = document.getElementById('btn-mic');
const textoReconocido = document.getElementById('texto-reconocido');

btnDocente.addEventListener('click', () => {
  panelDocente.classList.remove('oculto');
  panelEstudiante.classList.add('oculto');
  textoReconocido.textContent = '';
});

btnEstudiante.addEventListener('click', () => {
  panelEstudiante.classList.remove('oculto');
  panelDocente.classList.add('oculto');
  textoReconocido.textContent = '';
});

btnLogin.addEventListener('click', () => {
  const clave = document.getElementById('clave').value.trim();
  if (clave === 'docente.YELA.TEC.2025') {
    alert('✔️ Acceso concedido. Bienvenido Docente.');
    // Aquí puedes mostrar paneles extra o funcionalidad docente
  } else {
    alert('❌ Clave incorrecta, intenta de nuevo.');
  }
});

btnMic.addEventListener('click', () => {
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    textoReconocido.textContent = '❌ Tu navegador no soporta reconocimiento de voz.';
    return;
  }
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.lang = 'es-ES';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.start();
  textoReconocido.textContent = '🎧 Escuchando...';

  recognition.onresult = (event) => {
    const texto = event.results[0][0].transcript;
    textoReconocido.textContent = `🎙️ Detectado: "${texto}"`;
  };

  recognition.onerror = (event) => {
    textoReconocido.textContent = `❌ Error: ${event.error}`;
  };
});
