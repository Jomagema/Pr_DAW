//import "./http/http_registro.js";

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
    document.getElementById("imagen").src = "../img/avatares/" + imagenes[indiceImagenActual];
    document.getElementById("ruta_imagen").value = imagenes[indiceImagenActual];

}


// <----------- HTTP ----------->

var url = "http://127.0.0.1:8000/api/";
var imagenes = []

function cargar_imagenes() {
  fetch('http://127.0.0.1:8000/api/imagenes')
    .then(response => {
      if (!response.ok) {
        throw new Error('Hubo un problema al obtener las imágenes.');
      }
      return response.json();
    })
    .then(imagenesBase64 => {
      // Limpiamos el array antes de agregar nuevas imágenes
      imagenes.length = 0;
      for (let i = 0; i < imagenesBase64.length; i++) {
        imagenes.push(imagenesBase64[i].imagen);
      }
      console.log('Imágenes cargadas:', imagenes);
    })
    .catch(error => {
      console.error('Error al obtener las imágenes:', error);
    });
}

document.getElementById('formRegister').addEventListener('submit', function(event) {
  event.preventDefault(); // Evita que se envíe el formulario por defecto

  // Obtener datos del formulario
  var formData = new FormData(this);
  formData.append("imagen", imagenes[indiceImagenActual]);
  console.log(formData.imagen)

  // Enviar petición al servidor PHP usando fetch
  fetch(url + 'registrar', {
    method: 'POST',
    body: formData
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Error en la petición');
    }
    return response.json();
  })
  .then(data => {


      localStorage.setItem("usuario", formData.get("usuario"));
      localStorage.setItem("imagen", formData.get("imagen"));
      localStorage.setItem("record", 0);
      window.location.href = '../../index.html';

  })
  .catch(error => {
    console.error('Error:', error);
  });
});