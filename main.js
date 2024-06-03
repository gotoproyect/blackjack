import './style.css'
import _ from 'underscore';
// Variables globales
let deck                  = [];
let puntosJugador         = 0;
let puntosComputadora     = 0;
const tipos               = ['C', 'D', 'H', 'S'];
const especiales          = ['A', 'J', 'K', 'Q'];
const btnPedir            = document.querySelector('#btnPedir');
const btnDetener          = document.querySelector('#btnDetener');
const btnNuevoJuego       = document.querySelector('#btnNuevoJuego');
const ptsJugador          = document.querySelector('#ptsJugador');
const ptsComputadora      = document.querySelector('#ptsComputadora');
const mensaje             = document.querySelector('#titulo');
const gana                = document.querySelector('#ganador');
const audio1 = document.createElement("audio");
audio1.preload = "auto";
audio1.src = "assets/audio/mouse-click-153941.mp3";
const audio2 = document.createElement("audio");
audio2.preload = "auto";
audio2.src = "assets/audio/hotel-bell-ding-1-174457.mp3";
const audio3 = document.createElement("audio");
audio3.preload = "auto";
audio3.src = "assets/audio/cartoon-slide-whistle-up-2-176650.mp3";



// DIV donde se encuentran las imágenes de las cartas del jugador
//const divCartasJugador    = document.querySelector('#jugador-cartas');
//const divCartasComputadora= document.querySelector('#computadora-cartas');

// Funciones
const crearDeck = () => {
    deck = [];
    for (let i = 2; i <= 10; i++) {
        for (let tipo of tipos) {
            deck.push(i + tipo);
        }
    }

    for (let tipo of tipos) {
        for (let esp of especiales) {
            deck.push(esp + tipo);
        }
    }

    deck = _.shuffle(deck);
};

const pedirCarta = () => {
    if (deck.length === 0) {
        throw 'No hay más cartas en el mazo';
    }
    return deck.pop();
};

const valorCarta = (carta) => {

    const valor = parseInt(carta); // Obtengo el valor de la carta quitando el último caracter (el tipo)
    let puntos = 0;
    if (isNaN(valor)) { // Si no es un número (es una carta especial), asigno el valor correspondiente
        puntos = (valor === 'A') ? 11 : 10; // Asigno 11 para Ases, 10 para J, Q y K
  
    }
    else {
        puntos = parseInt(valor, 10);
        
    }
    return puntos;
};

const turnoComputadora = (puntosMinimos) => {
    do {
        const carta = pedirCarta();
        puntosComputadora += valorCarta(carta);
        ptsComputadora.innerText = puntosComputadora;

        const imgCarta = document.createElement('img');
        imgCarta.classList.add('carta');
        imgCarta.src = `./assets/cartas/${carta}.png`;
        divCartasComputadora.append(imgCarta);  
        imgCarta.setAttribute('id',carta);
        girar(imgCarta.id);
        //imgCarta.classList.add('animated');
        if (puntosMinimos > 21) {
            break;
        }
    } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);
    
    if(puntosComputadora>puntosMinimos&&puntosComputadora<=21){
        //se comparan los puntos de la computadora con los del usuario
        //si los puntos de la computadora son mayores que los del usuario y a su vez los puntos 
        //de la computadora, son menores o igual a 21 entonces la computadora gana
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        btnDetener.style.opacity= 0.5;
        btnPedir.style.opacity=0.5;
        Mensaje(gana.id);
        //mensaje llama a una funcion que se le envia como dato el id de dicho elemento
        //tras recibir el ID enviado se acivara una animacion sobre dicho elemento
        ganador.innerHTML = 'Perdiste';
    }
    else if (puntosMinimos<puntosComputadora&& puntosMinimos<=21){
        //se comparan los puntos del usuario, si son menores a los de la computadora, 
        //y a su  vez estos son menores e iguales a 21, entonces el usuario gana  
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            btnDetener.style.opacity= 0.5;
            btnPedir.style.opacity=0.5;
            Mensaje(gana.id);
            ganador.innerHTML = 'Ganaste';
        } 
    else if(puntosMinimos===puntosComputadora){
        //se comparan los numeros del usuario y la pc si estos son iguales
        //empatan

            btnPedir.disabled = true;
            btnDetener.disabled = true;
            btnDetener.style.opacity= 0.5;
            btnPedir.style.opacity=0.5;
            Mensaje(gana.id);
            ganador.innerHTML = 'Empate';
    }

    
};


//animacion de la carta, copia en carpeta c2;

const girar = (elemento)=>{
    //recibe un elemento en este caso, el id de la imagen
    const element = document.getElementById(elemento);
    //la variable almacenara el elemento seleccionado bajo dicho id
    element.classList.add('animate');
    //el element que almaceno el elemento con su id, se le agrega la clase animate
    //hace referencia a un elemento de style/css que se llama bajo la clase .animate que 
    //a su vez llama a la animacion girarcarta
}

///ANIMACION DE LOS BOTONES:
const Mensaje= (x)=>{
    gana.style.opacity=1;
    //gana llama a el elemento #ganador que es el div que contiene el mensaje
    //de ganaste o perdiste, su opaciti pasa a 1 para que sea visible
    const elementi = document.getElementById(x);
    elementi.classList.add('ganador');
    ///por alguna razon la animacion deja de funcionar tras ejecutarse 1vez
    elementi.classList.remove('ganador');
    //asi que adios animacion 
    void elementi.offsetWidth;
    //Forzar reflow para que el navegador funque con los cambios
    elementi.classList.add('ganador');
    //aplicamos nuevamente la animacion

}

// Eventos
btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    puntosJugador += valorCarta(carta);
    ptsJugador.innerText = puntosJugador;
    const imgCarta = document.createElement('img');
    imgCarta.classList.add('carta');
    imgCarta.src = `./assets/cartas/${carta}.png`;
    divCartasJugador.append(imgCarta);
    //Le enviamos como nombre de ID, el valor de la carta
    imgCarta.setAttribute('id',carta);
    //se llama a la funcion girar() y se le envia el id de la imagen
    girar(imgCarta.id);
    //imgCarta.classList.add('animated');//Residuo
    titulo.innerHTML='EN JUEGO';
        audio1.play();
   

    


    if (puntosJugador > 21) {
        console.warn('Perdiste');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        btnDetener.style.opacity= 0.5;
        btnPedir.style.opacity=0.5;
        turnoComputadora(puntosJugador);
        Mensaje(gana.id);
        ganador.innerHTML = 'Perdiste';
        
    } 
    else if (puntosJugador === 21) {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        btnDetener.style.opacity= 0.5;
        btnPedir.style.opacity=0.5;
        turnoComputadora(puntosJugador);
        Mensaje(gana.id);
        ganador.innerHTML = 'Ganaste';
    }
});

btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    btnDetener.style.opacity= 0.5;
    //Se baja su opacidad para que el usuario lo persiva como desactivado
    btnPedir.style.opacity=0.5;
    turnoComputadora(puntosJugador);
    audio3.play();
});

btnNuevoJuego.addEventListener('click', () => {
    deck = [];
    puntosJugador = 0;
    puntosComputadora = 0;
    ptsJugador.innerText = 0;
    ptsComputadora.innerText = 0;
    divCartasJugador.innerHTML = '';
    divCartasComputadora.innerHTML = '';
    //se reinicia los datos
    titulo.innerText = 'BlackJack';
    //habilitamos los botones
    btnPedir.disabled = false;
    btnDetener.disabled = false;
    //Pasamos la opacidad a 1 para que el usuario persiva el boton como activado 
    btnDetener.style.opacity= 1;
    btnPedir.style.opacity=1;
    gana.style.opacity=0;
    audio2.play();

  
    crearDeck();
   
});



// Inicializar el juego por primera vez
crearDeck();



