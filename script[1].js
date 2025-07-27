// script.js - Código principal para YELA TEC WEB
// Funcionalidades: menú docente, reconocimiento voz básico, interacción aves, navegación

// Estado general
let menuDocenteVisible = false;

// Clave para acceso docente
const claveDocente = "docente.YELA.TEC.2025";

// Función para mostrar/ocultar menú docente tras validación de clave
function toggleMenuDocente() {
  const inputClave = prompt("Ingrese la clave de acceso docente:");
  if (inputClave === claveDocente) {
    menuDocenteVisible = !menuDocenteVisible;
    const menu = document.getElementById("menu-docente");
    if (menuDocenteVisible) {
      menu.style.display = "block";
    } else {
      menu.style.display = "none";
    }
  } else {
    alert("Clave incorrecta. Acceso denegado.");
  }
}

// Función para inicializar reconocimiento de voz (solo si está disponible)
function iniciarReconocimientoVoz() {
  if (!('webkitSpeechRecognition' in window)) {
    alert("Su navegador no soporta reconocimiento de voz.");
    return;
  }
  const recognition = new webkitSpeechRecognition();
  recognition.lang = "es-PA"; // español Panamá
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onstart = () => {
    console.log("Reconocimiento de voz iniciado.");
  };
  recognition.onerror = (event) => {
    console.error("Error en reconocimiento de voz:", event.error);
  };
  recognition.onresult = (event) => {
    const texto = event.results[0][0].transcript.toLowerCase();
    console.log("Texto reconocido:", texto);
    procesarComandoVoz(texto);
  };

  recognition.start();
}

// Función para procesar comandos de voz reconocidos
function procesarComandoVoz(texto) {
  // Ejemplo básico: interacción con aves por nombre
  if (texto.includes("reinita amarilla")) {
    mostrarFichaAve("reinita");
  } else if (texto.includes("colibrí garganta de rubí") || texto.includes("colibri")) {
    mostrarFichaAve("colibri");
  } else {
    alert("No se reconoció un comando válido. Intenta mencionar una ave: Reinita Amarilla o Colibrí.");
  }
}

// Función para mostrar ficha educativa de un ave
function mostrarFichaAve(nombreAve) {
  const contenido = {
    reinita: {
      nombre: "Reinita Amarilla",
      descripcion: "Pequeña ave migratoria, de plumaje amarillo brillante, símbolo de curiosidad y cuidado ecológico.",
      habitat: "Bosques y áreas verdes de Panamá.",
      sonido: "sonidos/reinita.mp3"
    },
    colibri: {
      nombre: "Colibrí Garganta de Rubí",
      descripcion: "Ave pequeña y energética, conocida por su vibrante color rojo en la garganta y su rapidez de vuelo.",
      habitat: "Jardines y bosques húmedos de Panamá.",
      sonido: "sonidos/colibri.mp3"
    }
  };

  const ave = contenido[nombreAve];
  if (!ave) {
    alert("Ave no encontrada.");
    return;
  }

  // Mostrar detalles en la sección correspondiente
  const ficha = document.getElementById("ficha-ave");
  ficha.innerHTML = `
    <h2>${ave.nombre}</h2>
    <p>${ave.descripcion}</p>
    <p><strong>Hábitat:</strong> ${ave.habitat}</p>
    <audio controls autoplay>
      <source src="${ave.sonido}" type="audio/mpeg">
      Su navegador no soporta audio.
    </audio>
  `;
  ficha.style.display = "block";
}

// Función para cerrar ficha de ave
function cerrarFicha() {
  const ficha = document.getElementById("ficha-ave");
  ficha.style.display = "none";
  ficha.innerHTML = "";
}

// Eventos para botones (debes tener en HTML botones con estos IDs)
document.getElementById("btn-menu-docente").addEventListener("click", toggleMenuDocente);
document.getElementById("btn-iniciar-voz").addEventListener("click", iniciarReconocimientoVoz);
document.getElementById("btn-cerrar-ficha").addEventListener("click", cerrarFicha);

// Inicialización al cargar la página
window.onload = function() {
  // Ocultar menú docente y ficha al inicio
  document.getElementById("menu-docente").style.display = "none";
  document.getElementById("ficha-ave").style.display = "none";
};
