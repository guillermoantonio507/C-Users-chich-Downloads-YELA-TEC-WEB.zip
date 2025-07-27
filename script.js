
function cambiarIdioma(idioma) {
  const textos = {
    es: {
      docente: "👩‍🏫 Docente",
      estudiante: "👦 Estudiante",
      texto: "⌨ Texto",
      microfono: "🎤 Micrófono",
    },
    en: {
      docente: "👩‍🏫 Teacher",
      estudiante: "👦 Student",
      texto: "⌨ Text",
      microfono: "🎤 Microphone",
    }
  };

  const menu = document.querySelectorAll(".menu-opciones button");
  const keys = ["docente", "estudiante", "texto", "microfono"];

  menu.forEach((btn, i) => {
    btn.innerText = textos[idioma][keys[i]];
  });
}

function modoDocente() {
  document.getElementById("resultado").innerText = "Modo Docente activado";
}

function modoEstudiante() {
  document.getElementById("resultado").innerText = "Modo Estudiante activado";
}

function entradaTexto() {
  const entrada = prompt("Escribe tu mensaje:");
  document.getElementById("resultado").innerText = `Texto ingresado: ${entrada}`;
}

function activarMicrofono() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "es-ES";
  recognition.start();

  recognition.onresult = function (event) {
    const texto = event.results[0][0].transcript;
    document.getElementById("resultado").innerText = `Reconocido: ${texto}`;
  };
}
