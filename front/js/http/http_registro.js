import url from "../constants.js";

function cargar_imagenes(imagenes) {
    fetch(url + 'imagenes')
        .then(response => response.json())
        .then(imagenesBase64 => {

        // Recorrer el array de imágenes en base64
        imagenesBase64.forEach(imagenBase64 => {
            // Crear un elemento img
            imagenes.push(imagenBase64);

        });
    })
        .catch(error => {
        console.error('Error al obtener las imágenes:', error);
    });

    return imagenes;
}

document.getElementById('formRegister').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que se envíe el formulario por defecto

    // Obtener datos del formulario
    var formData = new FormData(this);

    // Enviar petición al servidor PHP usando fetch
    fetch(url + 'registrar', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      // Mostrar mensaje de respuesta del servidor
      if(data == ""){
        var user = new User(formData.get('usuario'), data.imagen, data.record);
        localStorage.usuario = user;
        window.location.href = '../../index.html';
      } else if(data == ""){
        alert("Datos incorrectos");
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });

