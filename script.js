
function seleccionarIdioma(idioma) {
  if (idioma === 'es') {
    document.getElementById('bienvenida').innerText = 'Bienvenido a YELA TEC';
    document.getElementById('botonDocente').innerText = '👨‍🏫 Docente';
    document.getElementById('botonEstudiante').innerText = '👧 Estudiante';
  } else if (idioma === 'en') {
    document.getElementById('bienvenida').innerText = 'Welcome to YELA TEC';
    document.getElementById('botonDocente').innerText = '👨‍🏫 Teacher';
    document.getElementById('botonEstudiante').innerText = '👧 Student';
  }
}

function activarMicrofono() {
  if (!('webkitSpeechRecognition' in window)) {
    alert("Reconocimiento de voz no soportado en este navegador.");
    return;
  }

  const recognition = new webkitSpeechRecognition();
  recognition.lang = 'es-ES';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = (event) => {
    const resultado = event.results[0][0].transcript.toLowerCase();
    if (resultado.includes("inglés") || resultado.includes("english")) {
      seleccionarIdioma('en');
    } else if (resultado.includes("español") || resultado.includes("spanish")) {
      seleccionarIdioma('es');
    } else {
      alert("No se reconoció el idioma. Diga 'español' o 'inglés'.");
    }
  };

  recognition.onerror = (event) => {
    console.error("Error en el reconocimiento de voz:", event.error);
  };

  recognition.start();
}
