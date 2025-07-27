
document.addEventListener("DOMContentLoaded", function () {
  const btnDocente = document.getElementById("btnDocente");
  const btnEstudiante = document.getElementById("btnEstudiante");
  const contenedorTexto = document.getElementById("contenedorTexto");
  const contenedorBotones = document.getElementById("contenedorBotones");
  const microfono = document.getElementById("microfono");
  const inputTexto = document.getElementById("inputTexto");

  // Función para redirigir
  function redireccionar(url) {
    window.location.href = url;
  }

  // Opción docente con contraseña
  btnDocente.addEventListener("click", function () {
    const clave = prompt("Ingresa la clave de acceso para docentes:");
    if (clave === "docente.YELA.TEC.2025") {
      redireccionar("https://yela-tec-docentes.vercel.app/");
    } else {
      alert("Clave incorrecta.");
    }
  });

  // Opción estudiante
  btnEstudiante.addEventListener("click", function () {
    redireccionar("https://yela-tec-estudiantes.vercel.app/");
  });

  // Entrada por texto
  inputTexto.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      procesarEntrada(inputTexto.value.toLowerCase());
    }
  });

  // Entrada por voz
  microfono.addEventListener("click", function () {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Lo sentimos, tu navegador no soporta reconocimiento de voz.");
      return;
    }

    const recognition = new webkitSpeechRecognition();
    recognition.lang = "es-ES";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.start();

    recognition.onresult = function (event) {
      const resultado = event.results[0][0].transcript.toLowerCase();
      procesarEntrada(resultado);
    };

    recognition.onerror = function (event) {
      alert("Error al reconocer la voz: " + event.error);
    };
  });

  // Procesar entrada (voz o texto)
  function procesarEntrada(entrada) {
    if (entrada.includes("docente")) {
      btnDocente.click();
    } else if (entrada.includes("estudiante")) {
      btnEstudiante.click();
    } else {
      alert("No se reconoció la opción. Por favor, di o escribe 'docente' o 'estudiante'.");
    }
  }
});
