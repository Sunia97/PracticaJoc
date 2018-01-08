var gameJSON = "";
var introMusic = new Audio('src/StrangerThings8 Bit.mp3');
var random_obj = "";

/* Inicializar el juego */
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

  //deleteStructureJSON("2");
  //uploadStructureJSON("2");
  //getListOfGames();
  loadAssets();

  // NOTE: Descarreguem estructura de partida nova
  downloadStructureJSON ("nueva", function callback(result) {
    gameJSON = result;
    loadNewLevel(-2, true);//Per defecte, paràmetres: Nivell -2 i isNewGame = true
    //console.log("Callback fet. gameJSON carregat des del server.");
  });
}

/* Convierte lo que hay en el mapa en un archivo de imagen */
function mapaToImg(x, y) {
  if (mapa[x][y] == "#") {
    return "dungeon_wall.png";
  }
  if (mapa[x][y] == "." || mapa[x][y] == "P") {
    return "dungeon_step.png";
  }
  if (mapa[x][y] == "D") {
    return "dungeon_door.png";
  }
  if (mapa[x][y] == "E") {
    //Afegeix la vida i una arma aleatòria a l'enemic
    addWeaponEnemy();
    return enemigo.img;
  }
  if (mapa[x][y] == "K") {
    return "path_llave.png";
  }
  //Apareix un objecte
  if (mapa[x][y] == "O") {
    random_obj = getRandomObject ();
    while (random_obj == "llave") {
      random_obj = getRandomObject ();
    }
    return ("path_" + random_obj + ".png");
  }
}

function getRandomObject () {
    var result;
    var count = 0;
    for (var prop in objetos)
        if (Math.random() < 1/++count) result = prop;
    return result;
}

function soundEnable () {
  //getListOfGames();

  console.log("player te els valor actualitzats:");
  console.log(player);

  if (introMusic.paused) {
    introMusic.play();
    $("#sound").css("color", "white");
  }else {
    introMusic.pause();
    $("#sound").css("color", "black");
  }
}

function introSkip () {
  $("#intro").remove();
}

//Carrega els objectes amb les seves imatges i les propietats inicials.
//Per no modificar el juego.js
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
  //resetProperties ();
}
 
