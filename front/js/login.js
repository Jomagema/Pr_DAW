var url = "http://127.0.0.1:8000/api/";

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que se envíe el formulario por defecto

    // Obtener datos del formulario
    var usuario = document.getElementById("usuario").value;
    var contrasena = document.getElementById("contrasena").value;

    var formData = new FormData();
    formData.append("usuario", usuario);
    formData.append("contrasena", contrasena);

    // Enviar petición al servidor PHP usando fetch
    fetch(url + 'login', {
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
      // Mostrar mensaje de respuesta del servidor
      if(data.length > 0){
        localStorage.usuario = data[0].usuario;
        localStorage.imagen = data[0].avatar;
        localStorage.record = data[0].record;
        window.location.href = '../../index.html';
      } else {
        alert("Datos incorrectos");
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
});