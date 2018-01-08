/* No tocar código */
var partida = {};

/*
  Dimensió: 10x10
*/
var mapa = [];

var objetos = {
  garrote: {ataque:1, defensa:0},
  llave: {}
};

var enemigo = {
  vida:10,
  ataque:0,
  defensa:0,
  xp:0,
  img:"",
  objetos:[]
}

var player = {
  nombre:"",
  vida:10,
  nivel:0,
  xp:0,
  ataque:2,
  defensa:2,
  manoderecha:"garrot",
  manoizquierda:"",
  mochila:[],
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
}

<<<<<<< HEAD
=======
/*  Pinta imagen en el visor */
>>>>>>> 3582e7c1f5f2eb75e19a18c041db78d7a48ddb42
function pintaImagen(src, x, y) {
  // Consigue el canvas
  var canvas = document.getElementById('visor');
  var context = canvas.getContext('2d');
  var base_image = new Image();
<<<<<<< HEAD
=======
  console.log("pinta " + src);
>>>>>>> 3582e7c1f5f2eb75e19a18c041db78d7a48ddb42
  base_image.src = "./media/images/"+src;
  base_image.onload = function () {
    // Pinta imagen en el canvas
    context.drawImage(this, x, y);
<<<<<<< HEAD
  };
=======
  }
>>>>>>> 3582e7c1f5f2eb75e19a18c041db78d7a48ddb42
}

/* Pinta al visor lo que hay en el mapa */
function pintaPosicion(x, y) {
  pintaImagen(mapaToImg(x, y), 0, 0);
}
