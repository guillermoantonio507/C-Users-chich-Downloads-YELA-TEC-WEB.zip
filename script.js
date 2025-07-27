
let idioma = "es";

function cambiarIdioma(lang) {
  idioma = lang;

  if (lang === "es") {
    document.getElementById("titulo").innerText = "👩‍🏫 YELA TEC";
    document.getElementById("subtitulo").innerText = "Selecciona tu rol y tu idioma";
    document.getElementById("btnDocente").innerText = "👩‍🏫 Docente";
    document.getElementById("btnEstudiante").innerText = "👶 Estudiante";
    document.getElementById("entradaTexto").placeholder = "Escribe tu opción...";
  } else {
    document.getElementById("titulo").innerText = "👩‍🏫 YELA TEC";
    document.getElementById("subtitulo").innerText = "Choose your role and language";
    document.getElementById("btnDocente").innerText = "👩‍🏫 Teacher";
    document.getElementById("btnEstudiante").innerText = "👶 Student";
    document.getElementById("entradaTexto").placeholder = "Type your option...";
  }
}

function hablar(rol) {
  const mensaje = {
    es: rol === "docente" ? "Bienvenido docente. Accediendo a tu entorno." : "Hola estudiante. Preparando tu aventura.",
    en: rol === "docente" ? "Welcome teacher. Loading your tools." : "Hello student. Get ready for your journey."
  };

  const finalText = mensaje[idioma];
  document.getElementById("mensajeFinal").innerText = finalText;

  const utter = new SpeechSynthesisUtterance(finalText);
  utter.lang = idioma === "es" ? "es-ES" : "en-US";
  speechSynthesis.speak(utter);
}

function detectarTexto(valor) {
  valor = valor.toLowerCase();
  if (valor.includes("docente") || valor.includes("teacher")) {
    hablar("docente");
  } else if (valor.includes("estudiante") || valor.includes("student")) {
    hablar("estudiante");
  }
}

function reconocerVoz() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const reconocimiento = new SpeechRecognition();
  reconocimiento.lang = idioma === "es" ? "es-ES" : "en-US";
  reconocimiento.start();

  reconocimiento.onresult = function (event) {
    const texto = event.results[0][0].transcript.toLowerCase();
    document.getElementById("entradaTexto").value = texto;
    detectarTexto(texto);
  };
}
