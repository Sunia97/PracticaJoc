/* No tocar código */
var partida = {};

/*
  Dimensió: 10x10
*/
var mapa = [];

var objetos = {
  garrote: {ataque:1, defensa:0},
  llave: {ataque:1, defensa:0},
  hacha: {ataque:2, defensa:1}
};

var enemigo = {
  vida:2,
  ataque:1,
  defensa:0,
  xp:0,
  img:"demogorgon.png",
  objetos:["garrote", "llave"]
};

var player = {
  nombre:"jugador",
  vida:10,
  nivel:1,
  xp:0,
  ataque:0,
  defensa:0,
  manoderecha:"llave",
  manoizquierda:"garrote",
  mochila:["llave", "hacha"],
  estadoPartida: {
    x:3,
    y:1,
    nivel:-2,
    direccion:0, /* 0 Norte, 1 Sud, 2 Este, 3 Oeste*/
  }
};

/* Se llama al cargar todos los elementos de la página */
window.onload = function () {
  iniciarJuego();
};

/*  Pinta imagen en el visor */
function pintaImagen(src, x, y) {
  // Consigue el canvas
  var canvas = document.getElementById('visor');
  var context = canvas.getContext('2d');
  var base_image = new Image();
  base_image.src = "./media/images/"+src;
  base_image.onload = function () {
    // Pinta imagen en el canvas
    context.drawImage(this, x, y);
  };
}

/* Pinta al visor lo que hay en el mapa */
function pintaPosicion(x, y) {
  pintaImagen(mapaToImg(x, y), 0, 0);
}
