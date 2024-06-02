import "../constants.js";
import "../juego.js";

function rellenarEnemigos(enemigos) {
    fetch(url + 'enemigos')
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al obtener los datos');
        }
        return response.json();
    })
    .then(data => {
        data.forEach(enemigo => {
            if (enemigo.nivel == 1) {
                enemigos[0].push(enemigo);
            } else if (enemigo.nivel == 2) {
                enemigos[1].push(enemigo);
            } else if (enemigo.nivel == 3) {
                enemigos[2].push(enemigo);
            }

        });;

        enemigos = enemigos[0][num(0, enemigos1.length-1)];

        document.getElementById("enemigo").src = rutaEnemigos + enemigo.imagen;
        actualizarDatos();

    })
    .catch(error => {
        console.error('Hubo un problema con la solicitud fetch:', error);
    });

    return enemigos;
}

function rellenarRecompensas(recompensas) {
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

function datosPersonaje(personaje) {
    fetch(url + 'personajes')
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al obtener los datos');
        }
        return response.json();
    })
    .then(data => {

        personaje = data;
        personaje.mano = 3;
        personaje.escudo = 0;
        personaje.vida = personaje.vida_maxima;

        document.getElementById("jugador").src = rutaPersonajes + personaje.imagen;
        //actualizarDatos();

    })
    .catch(error => {
        console.error('Hubo un problema con la solicitud fetch:', error);
    });

    return personaje;
}

function rellenarCartas(personaje) {
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
