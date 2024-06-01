import "http/http_registro.js";

var imagenes = []; // Rutas de las imágenes
imagenes = cargar_imagenes(imagenes);
var indiceImagenActual = 0; // Índice de la imagen actual

const passwordInput = document.getElementById('contrasena');
const confirmPasswordInput = document.getElementById('confcontrasena');

passwordInput.addEventListener('change', () => {
    if (passwordInput.value !== confirmPasswordInput.value) {
      confirmPasswordInput.setCustomValidity('Las contraseñas no coinciden');
    } else {
      confirmPasswordInput.setCustomValidity('');
    }
  });

  confirmPasswordInput.addEventListener('change', () => {
    if (passwordInput.value !== confirmPasswordInput.value) {
      confirmPasswordInput.setCustomValidity('Las contraseñas no coinciden');
    } else {
      confirmPasswordInput.setCustomValidity('');
    }
  });

function cambiarImagen(cambio) {
    indiceImagenActual += cambio;

    // Verificar límites para el índice
    if (indiceImagenActual < 0) {
        indiceImagenActual = imagenes.length - 1;
    } else if (indiceImagenActual >= imagenes.length) {
        indiceImagenActual = 0;
    }

    // Cambiar la imagen
    document.getElementById("imagen").src = imagenes[indiceImagenActual];
    document.getElementById("ruta_imagen").value = imagenes[indiceImagenActual];

}
