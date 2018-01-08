var gameJSON = "";
var introMusic = new Audio('other/StrangerThings8 Bit.mp3');
var random_obj = "";
var randomNum = 0;

/**
* Inicializar el juego
**/
function iniciarJuego() {

  introMusic.play();

  $("#alerta-info").hide();

  $("#save-game-panel").hide();
  $("#load-game-panel").hide();
  $("#delete-game-panel").hide();

  $("#game-saved-panel").hide();
  $("#game-loaded-panel").hide();
  $("#game-deleted-panel").hide();
  introMusic.loop = true;

  loadAssets();

  // NOTE: Descarreguem estructura de partida nova
  downloadStructureJSON ("nueva", function callback(result) {
    gameJSON = result;
    loadNewLevel(-2, true);//Per defecte, paràmetres: Nivell -2 i isNewGame = true
  });
}

/**
* Convierte lo que hay en el mapa en un archivo de imagen
**/
function mapaToImg(x, y) {
  //Apareix un objecte
  if (mapa[x][y] == "O") {
    random_obj = getRandomObject ();
    while (random_obj == "llave") {
      random_obj = getRandomObject ();
    }
    return ("path_" + random_obj + ".png");
  }
  //Apareix la paret
  if (mapa[x][y] == "#") {
    return "dungeon_wall.png";
  }
  //Hi ha el jugador o un espai buit
  if (mapa[x][y] == "." || mapa[x][y] == "P") {
    return "dungeon_step.png";
  }
  //Apareix la porta
  if (mapa[x][y] == "D") {
    return "dungeon_door.png";
  }
  //Apareix un enemic
  if (mapa[x][y] == "E") {
    //Afegeix la vida i una arma aleatòria a l'enemic
    addWeaponEnemy();
    return enemigo.img;
  }
  //Apareix la clau
  if (mapa[x][y] == "K") {
    return "path_llave.png";
  }
}

/**
* Genera un objecte aleatori
**/
function getRandomObject () {
  var result;
    var count = 0;
    for (var prop in objetos)
        if (Math.random() < 1/++count) result = prop;
    return result;
}

/**
* Activa el so
**/
function soundEnable () {
  if (introMusic.paused) {
    introMusic.play();
    $("#sound").css("color", "white");
  }else {
    introMusic.pause();
    $("#sound").css("color", "black");
  }
}

/**
* Salta el video del principi
**/
function introSkip () {
  $("#intro").remove();
}

/**
*Carrega els objectes amb les seves imatges i les propietats inicials per no modificar el juego.js
**/
function loadAssets () {
  objetos.hacha = {"ataque" : 3, "defensa" : 1, "path" : "hacha.png" };
  objetos.escudo = {"ataque" : 0, "defensa" : 4, "path" : "escudo.png" };
  objetos.garrote = {"ataque" : 1, "defensa" : 1, "path" : "garrote.png" };
  objetos.tirachinas = {"ataque" : 1, "defensa" : 0, "path" : "tirachinas.png" };
  objetos.espada = {"ataque" : 2, "defensa" : 3, "path" : "espada.png" };
  objetos.pistola = {"ataque" : 4, "defensa" : 2, "path" : "pistola.png" };
  objetos.cuchillo = {"ataque" : 3, "defensa" : 2, "path" : "cuchillo.png" };
  objetos.llave = {"path" : "llave.png" };

  enemigo.img = "demogorgon.png";
}
