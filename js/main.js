var level = -2;
var gameJSON = "";
var introMusic = new Audio('src/StrangerThings8 Bit.mp3');

/* Inicializar el juego */
function iniciarJuego() {

  introMusic.play();
  $("#alerta-pared").hide();
  introMusic.loop = true;

  var slot = "nueva";           // NOTE: Variarà segons el que vulgui el jugador (partida 1 o 2 guardada) o "nueva" a l'inici

  //uploadStructureJSON(slot);   // NOTE: Només per pujar els mapes al servidor. Comentar-ho quan ja estan pujats!
  //deleteStructureJSON(slot);
  getListOfGames();             // NOTE: Només és comprovació. No influeix en joc.

/*
  downloadStructureJSON (slot, function callback(result) {
    gameJSON = result;
    loadNewLevel(level);
    console.log("Callback fet. gameJSON carregat des del server.");
  });
*/

  // NOTE: TEMPORALMENT, UTILITZEM EL FITXER JSON LOCAL, NO EL DEL SERVIDOR
  gameJSON = structure;
  loadNewLevel(level);

  //console.log("Partida acabada");
  //S'acaba el joc quan s'arriba al nivell 1
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
