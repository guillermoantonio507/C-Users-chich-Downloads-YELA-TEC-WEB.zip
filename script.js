
let idiomaActual = "es";
const claveCorrecta = "docente.YELA.TEC.2025";

// Elementos DOM
const btnEs = document.getElementById("btn-es");
const btnEn = document.getElementById("btn-en");
const btnDocente = document.getElementById("btn-docente");
const btnEstudiante = document.getElementById("btn-estudiante");
const btnTexto = document.getElementById("btn-texto");
const btnMicrofono = document.getElementById("btn-microfono");

const loginBox = document.getElementById("login");
const textoBox = document.getElementById("texto-input");
const respuestaVoz = document.getElementById("respuesta-voz");

const loginTitulo = document.getElementById("login-titulo");
const inputClave = document.getElementById("clave");
const btnIngresar = document.getElementById("btn-ingresar");
const loginError = document.getElementById("login-error");

const textoTitulo = document.getElementById("texto-titulo");
const inputTexto = document.getElementById("input-texto");
const btnEnviarTexto = document.getElementById("btn-enviar-texto");

const textoRespuesta = document.getElementById("texto-respuesta");
const textoVoz = document.getElementById("texto-voz");

// Traducciones
const traducciones = {
  es: {
    docente: "👨‍🏫 Docente",
    estudiante: "🧒 Estudiante",
    texto: "⌨️ Texto",
    microfono: "🎤 Micrófono",
    accesoDocente: "Acceso Docente",
    clavePlaceholder: "Clave secreta",
    entrar: "Entrar",
    claveIncorrecta: "Clave incorrecta",
    bienvenidaDocente: "Bienvenido, docente.",
    bienvenidaEstudiante: "Bienvenido, estudiante.",
    entradaTexto: "Entrada de texto",
    enviar: "Enviar",
    escribeAqui: "Escribe aquí...",
    esperandoVoz: "🎧 Esperando entrada de voz...",
    errorVoz: "❌ Error en el reconocimiento de voz",
    idiomaNoReconocido: "No se reconoció el idioma. Diga 'español' o 'inglés'.",
    bienvenido: "Bienvenido a YELA TEC",
  },
  en: {
    docente: "👨‍🏫 Teacher",
    estudiante: "🧒 Student",
    texto: "⌨️ Text",
    microfono: "🎤 Microphone",
    accesoDocente: "Teacher Login",
    clavePlaceholder: "Enter password",
    entrar: "Enter",
    claveIncorrecta: "Incorrect password",
    bienvenidaDocente: "Welcome, teacher.",
    bienvenidaEstudiante: "Welcome, student.",
    entradaTexto: "Text input",
    enviar: "Send",
    escribeAqui: "Write here...",
    esperandoVoz: "🎧 Waiting for voice input...",
    errorVoz: "❌ Voice recognition error",
    idiomaNoReconocido: "Language not recognized. Say 'Spanish' or 'English'.",
    bienvenido: "Welcome to YELA TEC",
  }
};

// Inicialización idioma
function actualizarIdioma() {
  btnDocente.textContent = traducciones[idiomaActual].docente;
  btnEstudiante.textContent = traducciones[idiomaActual].estudiante;
  btnTexto.textContent = traducciones[idiomaActual].texto;
  btnMicrofono.textContent = traducciones[idiomaActual].microfono;

  loginTitulo.textContent = traducciones[idiomaActual].accesoDocente;
  inputClave.placeholder = traducciones[idiomaActual].clavePlaceholder;
  btnIngresar.textContent = traducciones[idiomaActual].entrar;
  loginError.textContent = "";

  textoTitulo.textContent = traducciones[idiomaActual].entradaTexto;
  inputTexto.placeholder = traducciones[idiomaActual].escribeAqui;
  btnEnviarTexto.textContent = traducciones[idiomaActual].enviar;

  textoRespuesta.textContent = "";
  textoVoz.textContent = "";

  // Cambiar texto principal (logo)
  document.querySelector(".logo").textContent = "YELA TEC";
}

// Cambio idioma por botones
btnEs.addEventListener("click", () => {
  idiomaActual = "es";
  btnEs.classList.add("active");
  btnEn.classList.remove("active");
  actualizarIdioma();
});
btnEn.addEventListener("click", () => {
  idiomaActual = "en";
  btnEn.classList.add("active");
  btnEs.classList.remove("active");
  actualizarIdioma();
});

// Mostrar login docente
btnDocente.addEventListener("click", () => {
  loginBox.style.display = "block";
  textoBox.style.display = "none";
  respuestaVoz.style.display = "none";
  loginError.textContent = "";
  inputClave.value = "";
});

// Mostrar modo estudiante (alerta simple por ahora)
btnEstudiante.addEventListener("click", () => {
  alert(traducciones[idiomaActual].bienvenidaEstudiante);
});

// Mostrar entrada de texto
btnTexto.addEventListener("click", () => {
  textoBox.style.display = "block";
  loginBox.style.display = "none";
  respuestaVoz.style.display = "none";
  textoRespuesta.textContent = "";
  inputTexto.value = "";
});

// Login docente: verificar clave
btnIngresar.addEventListener("click", () => {
  if (inputClave.value === claveCorrecta) {
    alert(traducciones[idiomaActual].bienvenidaDocente);
    loginBox.style.display = "none";
  } else {
    loginError.textContent = traducciones[idiomaActual].claveIncorrecta;
  }
});

// Enviar texto (simulación respuesta IA)
btnEnviarTexto.addEventListener("click", () => {
  const texto = inputTexto.value.trim();
  if (!texto) {
    textoRespuesta.textContent = "";
    return;
  }
  textoRespuesta.textContent = `${idiomaActual === "es" ? "Recibido:" : "Received:"} ${texto}`;
});

// Reconocimiento de voz para cambio idioma (y texto)
let reconocimiento;

function activarMicrofono() {
  if (!('webkitSpeechRecognition' in window)) {
    alert(idiomaActual === "es"
      ? "Reconocimiento de voz no soportado."
      : "Voice recognition not supported.");
    return;
  }

  if (reconocimiento) {
    reconocimiento.abort();
  }

  reconocimiento = new webkitSpeechRecognition();
  reconocimiento.lang = idiomaActual === "es" ? "es-ES" : "en-US";
  reconocimiento.interimResults = false;
  reconocimiento.maxAlternatives = 1;

  reconocimiento.onstart = () => {
    respuestaVoz.style.display = "block";
    textoVoz.textContent = traducciones[idiomaActual].esperandoVoz;
  };

  reconocimiento.onresult = (event) => {
    const resultado = event.results[0][0].transcript.toLowerCase();
    textoVoz.textContent = `🎤 ${resultado}`;

    // Cambiar idioma con palabra clave
    if (resultado.includes("español") || resultado.includes("spanish")) {
      idiomaActual = "es";
      btnEs.classList.add("active");
      btnEn.classList.remove("active");
      actualizarIdioma();
    } else if (resultado.includes("inglés") || resultado.includes("english")) {
      idiomaActual = "en";
      btnEn.classList.add("active");
      btnEs.classList.remove("active");
      actualizarIdioma();
    } else {
      alert(traducciones[idiomaActual].idiomaNoReconocido);
    }
  };

  reconocimiento.onerror = (event) => {
    textoVoz.textContent = traducciones[idiomaActual].errorVoz;
    console.error("Error reconocimiento voz:", event.error);
  };

  reconocimiento.onend = () => {
    // Se puede reiniciar o finalizar sesión
  };

  reconocimiento.start();
}

btnMicrofono.addEventListener("click", activarMicrofono);

// Inicialización idioma en carga
actualizarIdioma();
