
var enemigo = {};
var ronda = 0;
var prob1 = 90;
var prob2 = 10;
var prob3 = 0;

var user = localStorage.user;

var rutaRecompensas = "../img/juego/";


var bloqueo = [0, 0, 1, 1, 2, 5];

window.onload = function() {
    rellenarRecompensas();
    rellenarEnemigos();
    datosPersonaje();
    rellenarCartas();
}

function finTurno() {
   ataqueEnemigo();
   repartirCartas();
}

function repartirCartas() {
    let cartas = document.getElementById("cartas");
    let mano = [];
    while(cartas.firstChild){
        cartas.removeChild(cartas.firstChild);
    }

    for (let index = 1; index <= personaje.mano; index++) {
        var carta = document.createElement('img');

        let indice = num(0,personaje.mazo.length-1);
        let tipo = personaje.mazo[indice].tipo;
        let valor = personaje.mazo[indice].valor;
        carta.src = rutaCartas + personaje.mazo[indice].imagen;

        carta.id = index;
        // Asigna una función al evento onclick del botón
        carta.onclick = function() {
            accion(tipo, valor, index);
        };

        //Mete el elemento en el div
        cartas.appendChild(carta);

        mano.push(personaje.mazo[indice]);
        personaje.mazo.splice(indice, 1);
    }

    mano.forEach(c => {
        personaje.mazo.push(c);
    });

}

function accion(tipo, valor, id) {
    let registro = document.getElementById("feed");
    let red = 0;
    valor = parseInt(valor);
    if(tipo == "Daño"){
        red = bloqueo[num(0, bloqueo.length-1)];
        valor = valor - red;
        if (valor < 0){
            valor = 0;
        }
        enemigo.vida -= valor;
        if(enemigo.vida < 0){
            enemigo.vida = 0;
        }
        registro.innerHTML = registro.innerHTML + "<p style='color:palegreen'>"+personaje.nombre+" hace "+parseInt(valor)+" puntos de daño (bloquea " +red+")</p><br>";
    }else if (tipo == "Cura") {
        personaje.vida += valor;
        if (personaje.vida >= personaje.vida_maxima){
            personaje.vida = personaje.vida_maxima;
        }
        registro.innerHTML = registro.innerHTML + "<p style='color:palegreen'>"+personaje.nombre+" se cura "+parseInt(valor)+" puntos de vida</p><br>";
    } else if (tipo == "Escudo"){
        personaje.escudo += parseInt(valor);
        registro.innerHTML = registro.innerHTML + "<p style='color:palegreen'>"+personaje.nombre+" se refuerza "+parseInt(valor)+" puntos de escudo</p><br>";
    }
    actualizarDatos();
    let borrar = document.getElementById(id);
    borrar.parentNode.removeChild(borrar);
    resultado();
}

function num(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function actualizarDatos() {
    document.getElementById("infoJugador").textContent = "Vida: "+personaje.vida+" | Escudo: "+personaje.escudo;
    document.getElementById("infoEnemigo").innerHTML = enemigo.nombre+" | Nivel:"+enemigo.nivel+"<br>"+"Vida: "+enemigo.vida+" | Ataque: "+enemigo.ataque;
}

function actualizarRondas() {
    ronda++;
    document.getElementById("rondas").textContent = "Ronda "+ronda;
    if(ronda == 3){
        prob1 = 80;
        prob2 = 15;
        prob3 = 5;
    } else if (ronda == 6){
        prob1 = 70;
        prob2 = 20;
        prob3 = 10;
    } else if (ronda == 9){
        prob1 = 50;
        prob2 = 30;
        prob3 = 20;
    }
}

function resultado() {
    if(enemigo.vida <= 0){
        generarRecompensa();
    } else if(personaje.vida <= 0){
        actualizarRecord();
        alert("Record Rondas: " +ronda);
        window.location.href = "../index.html";
    }
}

function ataqueEnemigo() {
    let registro = document.getElementById("feed")
    let red = 0;

    for (let index = 0; index < enemigo.nivel; index++) {
        let daño = enemigo.ataque;
        red = bloqueo[num(0, bloqueo.length-1)];
        daño = daño - red;
        if (daño < 0){
            daño = 0;
        }
        registro.innerHTML = registro.innerHTML + "<p style='color:darksalmon'>"+enemigo.nombre+" hace "+parseInt(daño)+" puntos de daño (bloquea " +red+")</p><br>";
    if(personaje.escudo == 0){
        personaje.vida -= daño;
    } else if (personaje.escudo > 0){
        personaje.escudo -= daño;
        if(personaje.escudo < 0){
            personaje.vida += personaje.escudo;
            personaje.escudo = 0;
        }
    }

    if(personaje.vida < 0){
        personaje.vida = 0;
    }

    }
    resultado();
    actualizarDatos();
}

function generarRecompensa() {
    let tab = document.getElementById("feed");
    document.getElementById("rondas").textContent = "Elige tu recompensa";
    tab.innerHTML = "";
    let cartas = document.getElementById("cartas");
    while(cartas.firstChild){
        cartas.removeChild(cartas.firstChild);
    }
    let table = document.createElement("table");
    let tr = document.createElement("tr");
    let td;
    let indice;
    let usadas = [];
    let img;
    let p;

    for (let index = 0; index < 3; index++) {
        td = document.createElement("td");
        indice = num(0, recompensas.length-1);
        usadas.push(recompensas[indice]);
        img = document.createElement("img");
        img.src= rutaRecompensas+recompensas[indice].imagen;
        img.onclick = function() {
            añadirRecompensa(recompensas[indice].tipo, recompensas[indice].valor,recompensas[indice].imagen);
        }

        p = document.createElement("p");
        p.textContent = recompensas[indice].descripcion;
        td.appendChild(img);
        td.appendChild(p);

        tr.appendChild(td);
    }

    table.appendChild(tr);

    tab.appendChild(table);
}

function añadirRecompensa(tipo, valor, imagen) {
    if(tipo == "Escudo" || tipo == "Ataque" || tipo == "Cura"){
        let carta = {
            valor: valor,
            tipo: tipo,
            imagen: imagen
        }
        personaje.mazo.push(carta);
        console.log(carta);
        console.log(personaje);
    } else if(tipo == "Mazo"){
        personaje.mano = parseInt(personaje.mano) + 1;
    } else if(tipo == "Vida"){
        personaje.vida_maxima = parseInt(personaje.vida_maxima) + parseInt(valor);
        if (personaje.vida != personaje.vida_maxima) {
            personaje.vida = parseInt(personaje.vida) + parseInt(valor);
        }
    }
    actualizarDatos();
    actualizarRondas();
    limpiarFeed()
    generarEnemigo(prob1,prob2,prob3);
    repartirCartas();
}

function comenzar() {
    repartirCartas();
    let borrar = document.getElementById("comenzar");
    borrar.parentNode.removeChild(borrar);
    actualizarRondas();
    if(user == "admin"){
        document.getElementById("admin").innerHTML += "<button onclick='repartirCartas()'>Cartas</button>";
        document.getElementById("admin").innerHTML += "<button onclick='generarRecompensa()'>Recompensas</button>";
        document.getElementById("admin").innerHTML += "<button onclick='generarEnemigo(50,30,20)'>Enemigo</button>";
        document.getElementById("admin").innerHTML += "<button onclick='daño()'>Daño</button>";

    }

    actualizarDatos();
}

function limpiarFeed() {
    let feed = document.getElementById("feed");
    feed.innerHTML= "";
}

function generarEnemigo(num1, num2, num3) {
    let n = num(0, 100);
    if (n >= 0 && n < num1) {
        enemigo = enemigos[0][num(0, enemigos[0].length-1)];
    } else if(n >= num1 && n < num1 + num2){
        enemigo = enemigos[1][num(0, enemigos[1].length-1)];
    } else if(n >= num1 + num2 && n <= 100){
        enemigo = enemigos[2][num(0, enemigos[2].length-1)];
    }
    console.log(n);
    console.log(enemigo);
    document.getElementById("enemigo").src = rutaEnemigos +enemigo.imagen;
    actualizarDatos();
}

function daño() {
    personaje.vida -= 1;
    actualizarDatos();
    resultado();
}


// <----------- HTTP ----------->

var url = "http://127.0.0.1:8000/api/";
var rutaEnemigos = "../img/enemigos/";
var rutaPersonajes = "../img/juego/";
var rutaCartas = "../img/juego/";

var enemigos = [[],[],[]]
var recompensas = [];

function rellenarEnemigos() {
    fetch(url + 'enemigos')
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al obtener los datos');
        }
        return response.json();
    })
    .then(data => {
        // Reinicializamos el array enemigos
        enemigos = [[],[],[]];
        
        data.forEach(e => {
            if (e.nivel == 1) {
                enemigos[0].push(e);
            } else if (e.nivel == 2) {
                enemigos[1].push(e);
            } else if (e.nivel == 3) {
                enemigos[2].push(e);
            }
        });

        enemigo = {};
        // Ahora, elige un enemigo aleatorio del nivel 1
        enemigo = enemigos[0][num(0, enemigos[0].length - 1)];
        console.log(enemigo)

        // Actualiza la imagen del enemigo
        document.getElementById("enemigo").src = rutaEnemigos + enemigo.imagen;

    })
    .catch(error => {
        console.error('Hubo un problema con la solicitud fetch:', error);
    });
}


function rellenarRecompensas() {
    fetch(url + 'recompensas')
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al obtener los datos');
        }
        return response.json();
    })
    .then(data => {

        recompensas = data;

    })
    .catch(error => {
        console.error('Hubo un problema con la solicitud fetch:', error);
    });

    return recompensas;
}

var personaje = {};

function datosPersonaje() {
    fetch(url + 'personajes')
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al obtener los datos');
        }
        return response.json();
    })
    .then(data => {

        // Asignamos los datos directamente a personaje
        personaje = data[0];
        
        // Luego puedes agregar las propiedades adicionales como lo hiciste antes
        personaje.mano = 3;
        personaje.escudo = 0;
        personaje.vida = personaje.vida_maxima;

        document.getElementById("jugador").src = rutaPersonajes + personaje.imagen;

        // Aquí puedes trabajar con el objeto personaje después de que se hayan cargado los datos
        console.log(personaje);
        // También puedes llamar a otras funciones que dependan del objeto personaje aquí
        // actualizarDatos();
    })
    .catch(error => {
        console.error('Hubo un problema con la solicitud fetch:', error);
    });
}
function rellenarCartas() {
    fetch(url + 'cartas')
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al obtener los datos');
        }
        return response.json();
    })
    .then(data => {
        personaje.mazo = [];
        data.forEach(carta => {
            for (let index = 0; index < carta.cantidad; index++) {
                let c = {
                    valor: carta.valor,
                    tipo: carta.tipo,
                    imagen: carta.imagen
                }
                personaje.mazo.push(c);
            }
        });
    })
    .catch(error => {
        console.error('Hubo un problema con la solicitud fetch:', error);
    });

}

function actualizarRecord() {
    const data = new FormData();
    data.append('usuario', user.nombre);
    data.append('nuevoRecord', ronda);

    const opciones = {
        method: 'POST',
        body: data
    };

    fetch(url + 'act_record', opciones)
        .then(response => response.text())
        .then(resultado => console.log(resultado))
        .catch(error => console.error('Error:', error));

}
