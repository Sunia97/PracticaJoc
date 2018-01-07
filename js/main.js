var level = -2;
var gameJSON = "";
var introMusic = new Audio('src/StrangerThings8 Bit.mp3');

/* Inicializar el juego */
function iniciarJuego() {

  introMusic.play();
  $("#alerta-pared").hide();
  $("#save-game-panel").hide();
  $("#load-game-panel").hide();
  $("#game-saved-panel").hide();
    $("#game-loaded-panel").hide();
  introMusic.loop = true;

  //uploadStructureJSON("2");   // NOTE: Només per pujar els mapes al servidor per part dels desenvolupadors.
                                //Comentar-ho quan ja estan pujats el primer cop!

  // NOTE: Descarreguem estructura de partida nova
  downloadStructureJSON ("nueva", function callback(result) {
    gameJSON = result;
    loadNewLevel(level);
    console.log("Callback fet. gameJSON carregat des del server.");
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
    return enemigo.img;
  }
}

function soundEnable () {
  getListOfGames();

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
