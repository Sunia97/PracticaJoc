var level = -2;
var gameJSON;
var introMusic = new Audio('src/StrangerThings8 Bit.mp3');

/*
FUNCIONS
 */

/* Inicializar el juego */
function iniciarJuego() {

  introMusic.play();
  introMusic.loop = true;

  var slot = "nueva";           // NOTE: Variarà segons el que vulgui el jugador (partida 1 o 2 guardada) o "nueva" a l'inici

  //uploadStructureJSON(slot);   // NOTE: Només per pujar els mapes al servidor. Comentar-ho quan ja estan pujats!
  //deleteStructureJSON(slot);
  //getListOfGames();             // NOTE: Només és comprovació. No influeix en joc.

  // TODO: ENCARA NO FUNCIONA LA DESCARREGA DEL FITXER DEL SERVIDOR
  //var gameJSON = downloadStructureJSON(slot);//game es el json object amb tots els nivells

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
    return "demogorgon.png";
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
