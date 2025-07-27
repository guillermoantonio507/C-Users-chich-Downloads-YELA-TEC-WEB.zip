
let claveDocente = "docente.YELA.TEC.2025";
let idiomaActual = "es"; // "es" para español, "en" para inglés

function mostrarLogin(tipo) {
  document.getElementById("login").style.display = "block";
  const mensajes = {
    es: { docente: "Bienvenido Docente", estudiante: "Bienvenido Estudiante" },
    en: { docente: "Welcome Teacher", estudiante: "Welcome Student" }
  };
  document.getElementById("bienvenida").innerText = mensajes[idiomaActual][tipo];
}

function verificarClave() {
  let claveIngresada = document.getElementById("clave").value;
  if (claveIngresada === claveDocente) {
    alert(idiomaActual === "es" ? "Acceso concedido" : "Access granted");
  } else {
    alert(idiomaActual === "es" ? "Clave incorrecta" : "Wrong password");
  }
}

function cambiarIdioma() {
  idioma
