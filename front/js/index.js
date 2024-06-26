import "./http/http_index.js";
import "user.js";

// JavaScript para agregar la clase 'show-image' después de que la página ha cargado
document.addEventListener('DOMContentLoaded', function () {
    document.body.classList.add('show-image');
});

// Funciones para manejar el evento de hacer clic en el panel y mostrar la descripción en una ventana modal
function showDescription(title, description, imagePath) {
    var modal = document.getElementById('description-modal');
    var modalTitle = document.getElementById('modal-title');
    var modalImage = document.getElementById('modal-image');
    var modalDescription = document.getElementById('modal-description');
    var closeButton = document.querySelector('.close');

    modalTitle.textContent = title;
    modalImage.src = imagePath;
    modalDescription.textContent = description;
    modal.style.display = 'block';

    // Agregamos un event listener al botón de cerrar
    closeButton.addEventListener('click', function() {
        closeDescriptionModal();
    });

    // Agregamos un event listener para cerrar la ventana modal al hacer clic fuera de ella
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeDescriptionModal();
        }
    });
}

// Función para cerrar la ventana modal
function closeDescriptionModal() {
    var modal = document.getElementById('description-modal');
    modal.style.display = 'none';
}

console.log(localStorage.usuario);

if (localStorage.usuario != null) {
    var user = localStorage.usuario;
    document.getElementById("boton").innerHTML = "<p>Bienvenido "+user.nombre+" | Record: "+user.record+"</p>";
    document.getElementById("boton").innerHTML +="<img src='"+rutaAvatares+data.avatar+"'><br>";
    document.getElementById("boton").innerHTML +="<p onclick='cerrarSesion()'>Cerrar sesion</p>"
}

function generarBotones() {
    let botones = document.getElementById("boton")
    botones.innerHTML = "<a href='login.html'><button>Iniciar Sesión</button></a><a href='registro.html'><button>Registrarse</button></a>"
}


function cerrarSesion(nombre) {
    localStorage.clear()
}
