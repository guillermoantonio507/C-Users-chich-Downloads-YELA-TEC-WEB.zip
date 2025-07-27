
let claveActual = "docente.YELA.TEC.2025";

function mostrarLogin(rol) {
  document.getElementById("login").style.display = "block";
  document.getElementById("bienvenida").style.display = "none";
}

function verificarClave() {
  const claveIngresada = document.getElementById("clave").value;
  const mensaje = document.getElementById("errorClave");

  if (claveIngresada === claveActual) {
    mensaje.textContent = "✅ Acceso correcto.";
    mensaje.style.color = "green";
    setTimeout(() => {
      window.location.href = "https://yela-tec-web2025.vercel.app/docente";
    }, 1000);
  } else {
    mensaje.textContent = "❌ Clave incorrecta.";
    mensaje.style.color = "red";
  }
}

function cambiarIdioma() {
  const idioma = document.getElementById("idioma").value;
  if (idioma === "en") {
    document.getElementById("titulo").textContent = "Welcome to YELA TEC";
    document.getElementById("subtitulo").textContent = "Choose your role below";
    document.querySelector(".menu button:nth-child(1)").textContent = "🎓 Teacher";
    document.querySelector(".menu button:nth-child(2)").textContent = "🧒 Student";
    document.querySelector("#login button").textContent = "Enter";
    document.getElementById("clave").placeholder = "Enter password";
  } else {
    document.getElementById("titulo").textContent = "Bienvenidos a YELA TEC";
    document.getElementById("subtitulo").textContent = "Abajo en el menú elige tu rol";
    document.querySelector(".menu button:nth-child(1)").textContent = "🎓 Docente";
    document.querySelector(".menu button:nth-child(2)").textContent = "🧒 Estudiante";
    document.querySelector("#login button").textContent = "Entrar";
    document.getElementById("clave").placeholder = "Introduce la clave";
  }
}

function reconocerVoz() {
  if (!('webkitSpeechRecognition' in window)) {
    alert("Tu navegador no soporta reconocimiento de voz.");
    return;
  }

  const reconocimiento = new webkitSpeechRecognition();
  reconocimiento.lang = document.getElementById("idioma").value === "en" ? "en-US" : "es-ES";

  reconocimiento.onresult = function (event) {
    const texto = event.results[0][0].transcript.toLowerCase();
    if (texto.includes("docente") || texto.includes("teacher")) {
      mostrarLogin("docente");
    } else if (texto.includes("estudiante") || texto.includes("student")) {
      mostrarLogin("estudiante");
    } else {
      alert("No se reconoció el rol. Por favor di 'docente' o 'estudiante'.");
    }
  };

  reconocimiento.onerror = function (event) {
    alert("Error en el reconocimiento de voz: " + event.error);
  };

  reconocimiento.start();
}
