(()=>{document.addEventListener("DOMContentLoaded",(function(){document.body.classList.add("show-image")}));var o=localStorage.usuario,e=localStorage.record,n=localStorage.imagen;console.log(o),console.log(e),console.log(n),null!=localStorage.usuario&&(document.getElementById("boton").innerHTML="<p>Bienvenido "+o+" | Record: "+e+"</p>",document.getElementById("boton").innerHTML+="<img src='./img/avatares/"+n+"'><br>",document.getElementById("boton").innerHTML+="<p onclick='cerrarSesion()'>Cerrar sesion</p>")})();