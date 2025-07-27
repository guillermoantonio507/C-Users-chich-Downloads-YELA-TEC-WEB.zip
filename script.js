
// script.js

// Menú Docente y Estudiante toggles
const btnDocente = document.getElementById('btn-docente');
const btnEstudiante = document.getElementById('btn-estudiante');
const menuDocente = document.getElementById('menu-docente');
const menuEstudiante = document.getElementById('menu-estudiante');

btnDocente.addEventListener('click', () => {
  const expanded = btnDocente.getAttribute('aria-expanded') === 'true';
  btnDocente.setAttribute('aria-expanded', String(!expanded));
  menuDocente.classList.toggle('active');
  // Cierra menú estudiante
  menuEstudiante.classList.remove('active');
  btnEstudiante.setAttribute('aria-expanded', 'false');
});

btnEstudiante.addEventListener('click', () => {
  const expanded = btnEstudiante.getAttribute('aria
