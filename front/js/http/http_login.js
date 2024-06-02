import "../constants.js";
import "user.js";

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que se envíe el formulario por defecto

    // Obtener datos del formulario
    var formData = new FormData(this);

    // Enviar petición al servidor PHP usando fetch
    fetch(url + 'login', {
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

