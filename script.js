
function setLanguage(lang) {
  const elements = document.querySelectorAll(".text");
  elements.forEach((el) => {
    const text = el.getAttribute(`data-${lang}`);
    if (text) el.textContent = text;
  });
}

function modoDocente() {
  alert("Modo docente activado.");
}

function modoEstudiante() {
  alert("Modo estudiante activado.");
}

function modoTexto() {
  const input = prompt("Escribe tu instrucción:");
  if (input) {
    alert("Texto recibido: " + input);
  }
}

function modoMicrofono() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = document.documentElement.lang;
  recognition.start();

  recognition.onresult = function (event) {
    const result = event.results[0][0].transcript;
    alert("Reconocido: " + result);
  };

  recognition.onerror = function (event) {
    alert("Error: " + event.error);
  };
}
