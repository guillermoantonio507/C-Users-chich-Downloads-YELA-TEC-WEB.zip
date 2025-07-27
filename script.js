
// Variables globales
let idiomaActual = 'es'; // Español por defecto
let micActivo = false;
let reconocimiento;

// Mostrar login para docente o estudiante
function mostrarLogin(rol) {
  const login = document.getElementById('login');
  const bienvenida = document.getElementById('bienvenida');
  login.style.display = 'block';
  bienvenida.textContent = rol === 'docente'
    ? 'Acceso Docente - Ingresa tu clave'
    : 'Bienvenido Estudiante - Disfruta YELA TEC';
}

// Verificar clave para docente
function verificarClave() {
  const claveInput = document.getElementById('clave').value.trim();
  const claveCorrecta = 'docente2025'; // Cambia la clave aquí si quieres

  if (claveInput === claveCorrecta) {
    alert('Clave correcta. Bienvenido, docente.');
    document.getElementById('login').style.display = 'none';
    // Aquí puedes abrir menú docente o funciones especiales
  } else {
    alert('Clave incorrecta. Intenta de nuevo.');
  }
}

// Cambiar idioma (simulado)
function cambiarIdioma() {
  if (idiomaActual === 'es') {
    idiomaActual = 'en';
    alert('Language changed to English (Simulated)');
    // Aquí puedes cambiar textos de la página si quieres
  } else {
    idiomaActual = 'es';
    alert('Idioma cambiado a Español (Simulado)');
  }
}

// Activar o desactivar micrófono
function activarMicrofono() {
  const btn = document.getElementById('mic-btn');
  
  if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
    alert('Tu navegador no soporta reconocimiento de voz.');
    return;
  }

  if (micActivo) {
    // Detener reconocimiento
    reconocimiento.stop();
    micActivo = false;
    btn.classList.remove('active');
  } else {
    // Iniciar reconocimiento
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    reconocimiento = new SpeechRecognition();
    reconocimiento.lang = idiomaActual === 'es' ? 'es-PA' : 'en-US';
    reconocimiento.interimResults = false;
    reconocimiento.maxAlternatives = 1;

    reconocimiento.onresult = (event) => {
      const texto = event.results[0][0].transcript.toLowerCase();
      alert(`Reconocido: ${texto}`);
      // Aquí puedes agregar lógica para procesar comandos de voz
    };

    reconocimiento.onerror = (event) => {
      alert('Error en reconocimiento de voz: ' + event.error);
    };

    reconocimiento.onend = () => {
      micActivo = false;
      btn.classList.remove('active');
    };

    reconocimiento.start();
    micActivo = true;
    btn.classList.add('active');
  }
}
