import "../constants.js";

function usuario() {
    fetch(url + `usuario`)
    .then(response => response.json())
    .then(data => {
        document.getElementById("boton").innerHTML = "<p>Bienvenido "+user+" | Record: "+data.record+"</p>";
        data.avatar = rutaAvatares + data.avatar;
        document.getElementById("boton").innerHTML +="<img src='"+data.avatar+"'><br>";
        document.getElementById("boton").innerHTML +="<p onclick='cerrarSesion()'>Cerrar sesion</p>"
    })
    .catch(error => console.error('Error:', error));
}
